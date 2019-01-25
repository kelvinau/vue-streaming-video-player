<template>
  <div>
    Main Component
    <Timeline/>
  </div>
</template>

<script>
import Timeline from '@/components/timeline/timeline.vue';

export default {
  name: 'Main',
  components: {
    Timeline,
  },
  props: {
  },
};
</script>

<style scoped>
</style>
