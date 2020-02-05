<template>
  <div v-if="primary" class="root primary">{{ title }}</div>
  <div v-else-if="secondary" class="root secondary">{{ title }}</div>
  <div v-else class="root">{{ title }}</div>
</template>

<style scope>
.root {
  flex: 1;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  background: white;
  color: #eaba06;
}
.primary {
  color: white;
  background: #eaba06;
}
.secondary {
  color: white;
  background: #164194;
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
    },
    title: {
      type: String,
      default: 'A journey of building large-scale reusable web components',
    },
  },
}
</script>
