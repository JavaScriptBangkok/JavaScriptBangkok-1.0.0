<template>
  <div class="group-name">
    <h1>{{ groupName }}</h1>
    <slot name="content"></slot>
  </div>
</template>

<style scoped>
.group-name {
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
}

h1 {
  color: #164194;
  font-style: normal;
  font-weight: 800;
  font-size: 48px;
  line-height: 120%;
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