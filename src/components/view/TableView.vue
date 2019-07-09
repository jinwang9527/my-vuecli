<template>
  <el-card>
    <b-tabs @change="getCurrentTab" :tabs="tabs"></b-tabs>

    <b-searchers :searchCondition="searchCondition" @search="search"></b-searchers>

    <b-butions :buttons="buttons"></b-butions>

    <b-table :data="content" :table="table"></b-table>


  </el-card>
</template>

<script>
  import BaseVue from '../BaseView'
  import BTabs from '../BaseComponents/element/BTabs'
  import BSearchers from '../BaseComponents/element/BSearchers'
  import BButions from '../BaseComponents/element/BButtons'
  import BTable from '../BaseComponents/element/BTable'

  export default {
    name: 'tableView',
    extends: BaseVue,
    components: {BTabs, BSearchers, BButions, BTable},
    props: {
      tabs: {
        type: Array,
        default: function () {
          return []
        }
      },
      searchCondition: {
        type: Object,
        default: function () {
          return {}
        }
      },
      resources: {
        type: Object,
        default: {
          api: null,
          refresh: 0,
          parameters: {}
        },
      },
      buttons: {
        type: Array,
        default: function () {
          return []
        }
      },
      table: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {
        currentTab: {
          prop: null,
          value: null
        },
        searchObj: {}
      }
    },
    methods: {
      getCurrentTab(tab) {
        this.currentTab.prop = tab;
        this.OnCurrentChange(1)
      },
      OnCurrentChange(val) {
        this.page.pageIndex = val;
        this.invokeApi()
      },

      invokeApi() {
        if (this.resources.api && this.resources.parameters) {
          return new Promise((resolve, reject) => {
            this.resources.api(this.getParameters()).then(response => {
              this.setData(response);
              return resolve(response)
            }).catch(error => {
              return reject(error)
            })
          })
        }
      },
      getParameters() {
        const parameters = {};

        parameters.pageSize = this.page.pageSize;
        parameters.pageIndex = this.page.pageIndex;

        if (this.resources && this.resources.parameters) {
          for (let item in this.resources.parameters) {
            parameters[item] = this.resources.parameters[item]
          }
        }
        if (this.currentTab.prop) parameters[this.currentTab.prop] = this.currentTab.value;

        if (this.searchObj) {
          for (let item in this.searchObj) {
            parameters[item] = this.searchObj[item]
          }
        }
        return parameters
      },

      search(searchObj) {
        this.searchObj = searchObj === null || searchObj === undefined ? {} : searchObj;
        this.OnCurrentChange(1)
      }

    }
  }
</script>


<style>

</style>
