<template>
 <!-- <b-form :form="form">

  </b-form>-->

 <el-card>
    <el-form :model="model" ref="model" >
      <el-form-item prop="ip" label="请输入ip" :rules="[
     { required: true, message: '请输入活动名称', trigger: 'blur' },
      ]" >
           <el-input v-model="model.ip"></el-input>
      </el-form-item>
    </el-form>
 </el-card>

</template>

<script>
  import BForm from '../../components/view/BForm'
  export default {
    name:'second',
    components:{
      BForm
    },
    data(){
      return{
        model:{},
        /*form:{
          api: '',
          isClick: true,
          title: '添加成员申请单',
          labelWidth: '140px',
          model: {},
          formItems: [
            { name: 'name', label: '姓名', type:'number' },
            { name: 'names', label: '姓名', type:'password',showPassword :false   },
            { name: 'names', label: '姓名', type:'date', },
            { name: 'switch', label: '姓名', type:'switch' },
            { name: 'image', label: '姓名', type:'image' },
          ],

        }*/
      }

    },

  }
</script>

<style>

</style>
