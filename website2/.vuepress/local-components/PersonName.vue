<template>
  <span>
    <template v-if="people[name]">
      <a :href="people[name]">{{name}}</a>
    </template>
    <template v-else-if="typeof people[name] === 'string'">{{name}}</template>
    <template v-else>
      <span style="color: red">{{name}}</span>
    </template>
  </span>
</template>

<script>
export default {
  name: "PersonName",
  props: ["people", "name"]
};
</script>

<style scoped>
a:not(:hover) {
  color: inherit;
  text-decoration: none;
}
</style>