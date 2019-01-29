<template>
  <div class="container-fluid">
    <div class="d-flex flex-wrap justify-content-between">
      <Player v-for="v in shownVideos" :key="v.id" :video="v"/>
    </div>
    <Timeline/>
  </div>
</template>

<script>
import Player from '@/components/player/player.vue';
import Timeline from '@/components/timeline/timeline.vue';

export default {
  name: 'Main',
  components: {
    Player,
    Timeline,
  },
  props: {
  },
  computed: {
    shownVideos() {
      return this.$store.getters['timeline/shownVideos'];
    }
  },
};
</script>

<style scoped>
</style>
