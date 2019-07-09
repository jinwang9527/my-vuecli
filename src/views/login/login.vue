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
        this.$store.dispatch('Login',{account:"A10002",password:"123456"}).then(response=>{
          this.$router.push({path:'/view/first'})
        })


      }
    }

  }
</script>

<style>

</style>
