<template>
  <div class="root">
    <div class="avatar" v-if="speaker.image">
      <img :src="speaker.image" />
    </div>
    <div>
      <h3 class="title">{{ speaker.title | title }}</h3>
      <div class="description" v-if="speaker">
        {{ speaker.name }}
        <br />
        {{ speaker.from}}
      </div>
    </div>
  </div>
</template>

<style scoped>
.root {
  flex: 1;
  display: flex;
  padding: 13px 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  align-items: center;
  background-color: #fff;
}
.avatar {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
  margin-right: 16px;
}
.avatar > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.title {
  color: #eaba06;
  margin-top: 0;
  margin-bottom: 0;
}
.description {
  color: #767676;
  font-weight: 500;
  margin-top: 6px;
  line-height: 1.5;
}
</style>

<script>
export default {
  name: 'Session',
  props: {
    speaker: {
      type: Object,
    },
    title: {
      type: String,
    },
  },
}
</script>
