<template>
  <div class="group-name">
    <h1>#{{ groupName }}</h1>
    <!-- Slot -->
    <slot name="content"></slot>
  </div>
</template>

<style scoped>
h3 {
  color: #164194;
}
</style>

<script>
export default {
  name: "SpeakerGroup",
  props: {
    groupName: String
  }
};
</script>