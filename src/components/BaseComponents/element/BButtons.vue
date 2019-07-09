<template>
<div class="BTopClick">
  <el-button
   v-for="(item , index) in buttons"
   @click="click(item)"
   :key="index"
   size="mini"
   :type="item.type"
   :plain="item.plain ? false:item.plain"
   :round="item.round ? false:item.round"
   v-if="item.show === undefined ? true : item.show"
   :disabled="item.disabled ? false:item.disabled"
   :icon="item.icon"
  >
    {{item.name}}
  </el-button>
</div>

</template>

<script>
export default {
  name:'BButtons',
  props:{
    buttons:{
      type:Array,
      default:function () {
        return []
      }
    }
  },
  methods:{
    click(item){
      if (item.click !== undefined && item.click !== null) item.click()
    }
  }
}
</script>


<style>
  .BTopClick{
    margin: 5px 0;
  }
</style>
