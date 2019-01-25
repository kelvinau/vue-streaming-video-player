<template>
  <div>
    Timeline
    <div ref="timeline-container"></div>
  </div>
</template>

<script>
import Timeline from 'vis/lib/timeline/Timeline';
import 'vis/dist/vis.css';

export default {
  name: 'Timeline',
  props: {
  },
  mounted() {
    const container = this.$refs['timeline-container'];
    const data = [
      // {id: 1, content: 'item 1', start: '2013-04-20'},
      // {id: 2, content: 'item 2', start: '2013-04-14'},
      // {id: 3, content: 'item 3', start: '2013-04-18'},
      {id: 4, content: 'item 4', start: '2013-04-16 01:10', end: '2013-04-19'},
      // {id: 5, content: 'item 5', start: '2013-04-25'},
      // {id: 6, content: 'item 6', start: '2013-04-27'}
    ];
    const options = {};
    const timeline = new Timeline(container, data, options);
  },
};
</script>

<style scoped>
</style>
