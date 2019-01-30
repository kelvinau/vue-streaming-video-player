<template>
  <div>
    <Vis-Timeline
      ref="timeline"
      :items="shownParts"
      :groups="shownVideos"
      :options="options"
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
      },
      refreshTimePeriods: [
        false,
        30,
        60,
        90,
      ],
      timerId: null,
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
    }
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
  },
  created() {
    this.$store.dispatch('timeline/retrieveAllVideos');

    /* this.setAutoRefersh(10); */

    this.refetch();
  },
};
</script>

<style scoped>
</style>
