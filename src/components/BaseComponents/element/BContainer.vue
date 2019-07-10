<template>
<div>
  <el-card>
 <div slot="header" class="clearfix">
   <i class="iconfont" :class="icon"></i>

   <span>{{title}}</span>

   <el-button v-show="isHiddenPre" @click="prev" icon="el-icon-back" style="float: right; padding: 3px 0" type="text" >
     {{prePageText || '返回上一页'}}
   </el-button>
 </div>

    <slot></slot>

  </el-card>



</div>

</template>


<script>
import BaseView from '../../BaseView'
  export default {
    name: 'BContainer',
    extends:BaseView,
   props:{
     icon:{
       type:String,
       default:''
     },
     title:{
       type:String,
       default:''
     },
     prePageText:{
       type:String,
       default:'返回上一页'
     },
     isHiddenPre:{
       type:Boolean,
       default:false
     },
     isShowDropDownButton:{
       type:Boolean,
       default:false
     }

   },
    methods:{
      prev(){
       this.lastPage()
      },


    },


  }

</script>


<style>

</style>
