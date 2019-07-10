<template>
  <b-form :form="form">

  </b-form>
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
        form:{
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

        }
      }

    },

  }
</script>

<style>

</style>
