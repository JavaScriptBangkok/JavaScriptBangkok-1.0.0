<template>
  <div></div>
</template>

<script>
export default {
  name: "SpeakerGroup",
  props: {
    groupName: String,
    speakers: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
</style>