<template>
  <div>
    <h1>没有权限页面</h1>
    <button type="button" @click="goToHavsRoles">去有权限页面</button>
  </div>
</template>

<script>
  export default {
    name:'notAuthority',
    methods:{
      goToHavsRoles(){
        this.$router.push({path:'/HasNotAuthority'})
      }
    }
  }
</script>

<style></style>
