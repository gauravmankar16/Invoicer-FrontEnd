<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

export default {  
  name: 'App'
}
</script>

<style lang="scss">
 @import 'src/assets/scss/app.scss';
</style>
