<template>
  <div class="m-2">
    <b-card :header="`Camera ${video.id}`"
      header-tag="header">
      <iframe :src="video.link"></iframe>
    </b-card>
  </div>
</template>

<script>

export default {
  name: 'Player',
  props: ['video'],
}
</script>

<style scoped>
.container {

}
</style>
