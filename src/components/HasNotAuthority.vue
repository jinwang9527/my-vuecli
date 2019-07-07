<template>
  <div>
    有权限页面
    <button type="button" @click="goTouser">user</button>
  </div>
</template>

<script>
  export default {
    methods:{
      goTouser(){
        this.$router.push({path:'/a/hasAuthoritOfChildred'})
      }
    }
  }
</script>

<style></style>
