<template>
  <div>
    <div v-if="primary" class="root primary">{{ title }}</div>
    <div v-if="secondary" class="root secondary">{{ title }}</div>
  </div>
</template>

<style scope>
.root {
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
    secondary: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'A journey of building large-scale reusable web components',
    },
  },
}
</script>
