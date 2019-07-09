<template>
  <table-view
    :tabs="tableView.tabs"
    :resources="tableView.resources"
    :searchCondition = "tableView.searchCondition"
    :buttons="tableView.buttons"
    :table="tableView.table"
  />
</template>

<script>
  import TableView from '../../components/view/TableView'
  import BaseView from '../../components/BaseView'
  import {getUserInfo} from '../../api/login/login'
  export default {
    name: 'first',
    extends: BaseView,
    components: {TableView},
    data(){
      return{
        tableView: {
          tabs: [
            {name: '用户管理', prop: 'myPosts', value: "myPosts", isDefault: true},
            {name: '配置管理', prop: 'myPosts', value: "myPosts", },
            {name: '角色管理', prop: 'myPosts', value: "myPosts"},
          ],
          searchCondition:{
            labelWidth: '70px',
            content: [
              {prop: 'name', label: '角色管理'},
              {prop: 'name', label: '配置管理'},
              {prop: 'name', label: '配置管'},
              {prop: 'name', label: '用户管理',type:'time' },
            ],

          },
          buttons:[
            {name:'用户管理'},
            {name:'配置管理'},
            {name:'角色管理'},
          ],
          table:{
            content:[
              {prop: 'postsTitle', label: '帖子标题'},
              {prop: 'nickName', label: '创建人'},
              {prop: 'createTime', label: '创建时间', type: 'time'},
            ],
            operations:[
              {name:'点击',click:this.onclick},
              {name:'点击',click:this.onclick}
            ]
          },
          resources: {
            api: getUserInfo,
            refresh: 0,
            parameters: {
              a: 'b'
            }
          }
        }
      }
    },
    methods:{
      onclick({index,row}){
        alert("dianji"+index+''+JSON.stringify(row))
      }
    }


  }
</script>

<style>

</style>
