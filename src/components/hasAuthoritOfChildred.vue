<template>
  <div>
    我是HasNotAuthority的子路由
    <button type="button" @click="goTouser">返回我是HasNotAuthority的子路由</button>
  </div>
</template>

<script>
  export default {
    methods:{
      goTouser(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style></style>
