<template>
<div>
  <h2>{{title}}</h2>
  <ul>
    <li v-for="(item,index) in users" :key="index">
      {{item}}
    </li>
  </ul>
<button type="button" @click="returnGo">返回</button>
</div>
</template>

<script>
  export default {
    name:'Users',
    data() {
      return {
        users: [
          {name: '张三', age: '20'},
          {name: '张三', age: '20'},
          {name: '张三', age: '20'},
          {name: '张三', age: '20'},
          {name: '张三', age: '20'},
          {name: '张三', age: '20'},
        ],
        title: '传递的一个值'
      }

    },
    methods: {
      updateTitle(val) {
        console.log(val);
        this.title = val
      },
      returnGo(){
        this.$router.go(-1)
      }
    }
  }
</script>


<style>

</style>
