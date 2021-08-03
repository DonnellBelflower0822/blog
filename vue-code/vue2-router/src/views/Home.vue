<template>
  <div class="home">
    <h1>Home</h1>
    <button @click="go">跳转about</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {},
  methods: {
    go() {
      this.$router.replace({ path: '/about/12', query: { a: 1 } })
    },
  },
}
</script>

<style scoped>
</style>
