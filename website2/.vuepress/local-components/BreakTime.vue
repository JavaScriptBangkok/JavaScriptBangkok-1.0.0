<template>
  <div v-if="primary" class="root primary">
    <div>{{ title }}</div>
  </div>
  <div v-else class="root secondary">{{ title }}</div>
</template>

<style scope>
.root {
  flex: 1;
  padding: 16px;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-weight: bold;
}
.primary {
  background-color: #eaba06;
}
.secondary {
  background-color: #164194;
}
</style>

<script>
export default {
  name: 'BreakTime',
  props: {
    primary: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: 'A journey of building large-scale reusable web components',
    },
  },
}
</script>
