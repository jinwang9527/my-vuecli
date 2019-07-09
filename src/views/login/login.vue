<template>
<div>
  <button @click="goTo">登录</button>
</div>
</template>

<script>

  export default {
    name:'login',
    methods:{
      goTo(){
        this.$router.push({path:'/view/first'})
      }
    }

  }
</script>

<style>

</style>
