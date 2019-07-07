<template>
  <div>
    <h2>{{this.count}}</h2>
    <input type="button" @click="add" value="增加"/>
    <button type="button" @click="goto">去找users</button>

    <button type="button" @click="login">登陆</button>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex/types'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    computed: {
      // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
        'count',
      ])
    },
    methods: {
      login() {
        this.$store.dispatch("Login", {account: 'A10002', password: '123456'}).then(() => {
          this.$router.push({path: '/Users'})
        })
      },

      add() {
        this.$store.commit('count')
      },
      goto() {
        this.$router.push("/Users")
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
