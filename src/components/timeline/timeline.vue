<template>
  <div>
    <Vis-Timeline
      ref="timeline"
      :items="shownParts"
      :groups="shownVideos"
      :options="options"
      @click="onClicked"
      @contextmenu="onRightClicked"
      class="mb-2"
    />
    <div class="row">
      <div class="col-9"></div>

      <b-dropdown class="col-2" :text="`Auto Refresh: ${refreshTimePeriod ? `${refreshTimePeriod} seconds` : 'None'}`" variant="primary" size="sm">

        <b-dropdown-item
          v-for="(item, i) in refreshTimePeriods"
          :key="i"
          @click="setAutoRefersh(item)"
        >
          {{`${item ? `${item} seconds` : 'None'}`}}
        </b-dropdown-item>

      </b-dropdown>

      <b-dropdown class="col-1" text="Video(s)" variant="primary" size="sm">
        <div v-for="v in allVideos" :key="v.id">
          <input type="checkbox" :checked="v.shown" @change="toggleShown(v.id)">
          Video {{v.id}}
        </div>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import {Timeline, DataSet} from 'vue2vis'
import {Part} from '../../factories/Video';
import 'vue2vis/dist/vue2vis.css';

export default {
  name: 'Timeline',
  components: {
    VisTimeline: Timeline,
  },
  props: {
  },
  data() {
    return {
      options: {
        // min: this.$store.getters['timeline/firstStart'],
        showCurrentTime: false,
        selectable: false,
      },
      refreshTimePeriods: [
        false,
        30,
        60,
        90,
      ],
      timerId: null,
      highlightRange: [],
    };
  },
  computed: {
    allVideos() {
      return this.$store.state.timeline.videos;
    },
    shownVideos() {
      return this.$store.getters['timeline/shownVideos'];
    },
    shownParts() {
      return this.$store.getters['timeline/shownParts'];
    },
    refreshTimePeriod() {
      return this.$store.state.timeline.refreshTimePeriod;
    },
  },
  methods: {
    toggleShown(id) {
      this.$store.commit('timeline/toggleShown', id);
    },
    setAutoRefersh(value) {
      this.$store.commit('timeline/setRefreshTimePeriod', value);
      this.refetch();
    },
    refetch() {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      if (this.refreshTimePeriod) {
        this.timerId = setTimeout(() => {

          // some async function to retrieve the new data
          this.$store.dispatch('timeline/retrieveAllVideos', true).then(() => {
            this.refetch();
          });

        }, this.refreshTimePeriod * 1000);
      }
    },
    onClicked(e) {
      /* console.log(e); */
      // highlight
      if (e.item) {
        switch(this.highlightRange.length) {
          case 0:
          case 2:
            this.clearHighlightPart();
            this.highlightRange.push(e);
            break;
          case 1:
            const firstItem = this.highlightRange[0];
            if (e.group !== firstItem.group || e.time <= firstItem.time) {
              this.clearHighlightPart();
            }
            else {
              // a lot of unncessary items
              // better to take only the necessary ones
              this.highlightRange.push(e);

              const part = new Part({
                id: 'background-1',
                groupId: e.group,
                start: firstItem.time,
                end: e.time,
                type: 'background',
                className: 'highlighted-range',
              });
              this.$store.commit('timeline/setHighlightPart', part);
            }
            break;
        }
      }
      // unhighlight
      else {
        this.clearHighlightPart();
      }
    },
    onRightClicked(props) {
      console.log(props);
      if (!props.item && props.group && props.time) {
        if (this.highlightRange.length === 2 &&
            this.highlightRange[0].time <= props.time &&
            this.highlightRange[1].time >= props.time) {
          alert('Right Clicked within highlighted range');
        }
      }
      props.event.preventDefault();
    },
    clearHighlightPart() {
      this.highlightRange = [];
      this.$store.commit('timeline/setHighlightPart', null);
    }
  },
  created() {
    this.$store.dispatch('timeline/retrieveAllVideos');

    /* this.setAutoRefersh(10); */

    this.refetch();
  },
};
</script>

<style>
.vis-item.vis-background.highlighted-range {
  background-color: rgba(255, 247, 133, 0.6);
  z-index: 2;
}
</style>
