<template>
    <div class="theme-container">
        <header v-if="!$page.frontmatter.homepage">
            <router-link to="/">&larr; JavaScript Bangkok 1.0.0</router-link>
        </header>
        <main>
            <Content />
        </main>
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
  background: url(./frame.svg) bottom left;
    background-size: cover;
    padding-bottom: 12%;
  }
  main {
    display: block;
    padding: 16px;
    max-width: 960px;
    margin: 0 auto;
  } header a {
    color: white;
    text-decoration: none;
    display: inline-block;
    padding: 16px;
  }
</style>