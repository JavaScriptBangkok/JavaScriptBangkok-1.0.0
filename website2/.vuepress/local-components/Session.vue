<template>
  <div class="root">
    <div class="avatar">
      <img :src="image" />
    </div>
    <div class="details">
      <h3 class="title">
        {{ title }}
      </h3>
      <div class="description">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.root {
  display: flex;
  padding: 22px 16px;
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
}
.avatar > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.details {
  padding-left: 16px;
}
.title {
  color: #eaba06;
  margin-top: 0;
  margin-bottom: 8px;
}
.description {
  color: #767676;
  font-weight: 500;
}
</style>

<script>
export default {
  name: 'ScheduleItem',
  props: {
    image: {
      type: String,
      default: 'https://picsum.photos/120/120',
    },
    title: {
      type: String,
      default: 'A journey of building large-scale reusable web components',
    },
    description: {
      type: String,
      default: 'Varayut Lerdkanlayanawat from 🇩🇪 Germany',
    },
  },
}
</script>
