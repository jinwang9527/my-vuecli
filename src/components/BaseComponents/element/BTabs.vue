<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" v-if="tabs">
    <el-tab-pane v-for="(item , index) in  tabs" :label="item.name" :name="item.name" :key="index"></el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    name: 'BTabs',
    props: {
      tabs: {
        type: Array,
        default:function () {
          return []
        }
      }
    },
    data() {
      return {
        activeName: null
      };
    },
    created() {
      this.setDefault()
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab)
        for (let item of this.tabs) {
          if (item.name === tab.name) {
            this.$emit("change", tab)
          }
        }
      },
      setDefault() {
        for (let item of this.tabs) {
          if (item.isDefault) {
            this.activeName = item.name;
            this.$emit('change', item)
          }
        }
      }
    }
  };
</script>


<style></style>
