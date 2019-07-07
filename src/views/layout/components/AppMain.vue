<template>
  <section class="app-main"
           v-loading="AppMain.loading"
           :element-loading-text="AppMain.text"
           :element-loading-spinner="AppMain.spinner"
           :element-loading-background="AppMain.background">
    <transition name="fade-transform" mode="out-in">
      <router-view/>
    </transition>
  </section>
</template>

<script>

  import { mapGetters } from 'vuex'

  export default {
    name: 'AppMain',
    computed: {
      ...mapGetters([
        'AppMain'
      ])
    }

  }



</script>

<style scoped>
  .app-main {
    /*50 = navbar  */
    min-height: calc(100vh - 50px);
    position: relative;
    overflow: hidden;
    padding: 20px;
    background-color: #e9edf0;
  }
</style>
