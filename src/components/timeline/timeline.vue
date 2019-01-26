<template>
  <div>
    <Vis-Timeline ref="timeline" :items="parts" :groups="videos" :options="options"/>
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
      groups: new DataSet([
        {
          id: 0,
          content: 'Group 1'
        },
        {
          id: 1,
          content: 'Group 2'
        },
      ]),
      items: new DataSet([
        {
          group: 0,
          start: '2018-01-25 15:05',
          content: 'Item 1'
        },
        {
          group: 1,
          start: '2018-01-25 16:05',
          content: 'Item 2'
        },
      ]),
      options: {
        showCurrentTime: false,
      }
    }
  },
  computed: {
    videos() {
      return this.$store.state.timeline.videos;
    },
    parts() {
      return this.$store.state.timeline.parts;
    },
  },
  methods: {
  },
  created() {
    this.$store.dispatch('timeline/retrieveAllVideos');
    setTimeout(() => {
      console.log(this);
      this.items.add({
        group: 1,
        start: new Date(),
        content: 'Item 3',
      })
    }, 1000)
  },
}
</script>

<style scoped>
</style>
