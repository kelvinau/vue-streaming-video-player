<template>
  <div>
    <div class="row">
      <div class="col-11"></div>
      <b-dropdown class="col-1" id="ddown1" text="Camera(s)" variant="primary" size="sm">
        <div v-for="v in allVideos" :key="v.id">
          <input type="checkbox" :checked="v.shown" @change="toggleShown(v.id)">
          Camera {{v.id}}
        </div>
      </b-dropdown>
    </div>
    <Vis-Timeline ref="timeline" :items="shownParts" :groups="shownVideos" :options="options"/>
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
  },
  methods: {
    toggleShown(id) {
      return this.$store.commit('timeline/toggleShown', id);
    }
  },
  created() {
    this.$store.dispatch('timeline/retrieveAllVideos');
    /* setTimeout(() => { */
      /* console.log(this); */
      /* // test pushing new item */
      /* this.$store.commit('timeline/addParts', { */
        /* group: 1, */
        /* start: '2019-01-13', */
        /* content: 'New Item', */
      /* }); */
    /* }, 3000); */
  },
};
</script>

<style scoped>
</style>
