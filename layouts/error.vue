<template>
  <div class="container">
    <div v-if="error.statusCode === 404" class="page">
      <nuxt-link to="/">
        <img src="http://api.bw31d.com/upload/image/20190801/xPOb7tvst292qDu9sDaohoiEAOyuRu7OaDXyAdXd.png" alt="">
      </nuxt-link>
    </div>
    <div v-else class="page">
      <nuxt-link to="/">
        <img src="http://api.bw31d.com/upload/image/20190801/hZqTyTRHcTMnTNeS6YKqssWFWYzk8056Fsh9DAui.png" alt="">
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'blog'
  }
</script>

<style scoped>
  .page img{width: 80%;padding-top: 60px; display: block; margin:0 auto}
</style>
