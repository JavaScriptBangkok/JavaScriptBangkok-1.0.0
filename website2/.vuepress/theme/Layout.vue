<template>
  <div>
    <template v-if="!$page.frontmatter.homepage">
      <header>
        <router-link to="/">&larr; JavaScript Bangkok 1.0.0</router-link>
      </header>
      <main>
        <Content/>
      </main>
    </template>
    <template v-else>
      <Content/>
    </template>
  </div>
</template>

<style>
body {
  font-family: K2D, sans-serif;
  background: #f5f1e9;
  color: #333;
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
header {
  display: block;
  background: url(./frame.svg)bottomleft;
  background-size: cover;
  padding-bottom: 12%;
}
main {
  display: block;
  padding: 16px;
  max-width: 1280px;
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
