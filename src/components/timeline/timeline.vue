<template>
  <div>
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
  },
  created() {
    this.$store.dispatch('timeline/retrieveAllVideos');
    setTimeout(() => {
      console.log(this);
      // test pushing new item
      this.$store.commit('timeline/addParts', {
        group: 1,
        start: '2019-01-13',
        content: 'New Item',
      });
    }, 3000);
  },
};
</script>

<style scoped>
</style>
