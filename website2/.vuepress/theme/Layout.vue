<template>
  <div>
    <template v-if="!$page.frontmatter.homepage">
      <header>
        <router-link to="/">&larr; JavaScript Bangkok 1.0.0</router-link>
      </header>
      <main>
        <Content />
      </main>
    </template>
    <template v-else>
      <Content />
    </template>
  </div>
</template>

<script>
import 'normalize.css'
export default {}
</script>

<style>
body {
  font-family: K2D, sans-serif;
  background: #f5f1e9;
  color: #333;
  margin: 0;
  padding: 0;
}
a {
  color: #2254b6;
}
.header-anchor {
  font-size: 0.85em;
  float: left;
  margin-left: -1.25em;
  padding-right: 0.23em;
  margin-top: 0.125em;
  opacity: 0;
  text-decoration: none;
  color: #de726f;
}
h1:hover .header-anchor,
h2:hover .header-anchor,
h3:hover .header-anchor,
h4:hover .header-anchor,
h5:hover .header-anchor,
h6:hover .header-anchor {
  opacity: 1;
}
</style>

<style scoped>
header {
  display: block;
  background: url(./frame.svg) bottom left;
  background-size: cover;
  padding-bottom: 12%;
}
main {
  display: block;
  padding: 16px;
  max-width: 960px;
  margin: 0 auto;
  box-sizing: border-box;
}
header a {
  color: white;
  text-decoration: none;
  display: inline-block;
  padding: 16px;
}
</style>
