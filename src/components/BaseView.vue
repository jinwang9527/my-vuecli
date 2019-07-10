<script>
  import {errorMessage, successMessage, messageBox} from '../utils/message'
  import {Obj} from '../utils/constats'
  import {batchSelectDictionary} from '../api/login/login'

  export default {
    name: 'BaseView',
    data() {
      return {
        content: [],
        enums: {},
        page: {
          pageSize: Obj.pageSize,
          pageIndex: Obj.pageIndex,
          order: Obj.order,
          total: 0
        },
      }
    },
    methods: {

      getEnums(tableName) {
        if (tableName) {
          return batchSelectDictionary({tableName}).then(response => {
            if (!response.data) return this.enums = {}
            for (let table of response.data) {
              this.enums[table] = {}
              for (let item of response.data[table]) {
                if (this.enums[table][item.fileName] === null || this.enums[table][item.fileName] === undefined)
                  this.enums[table][item.fileName] = []
                this.enums[table][item.fileName].push({value: item.dictionaryValue, text: item.dictionaryText})
              }
            }
            return this.enums
          })
        }
      },
      startLoading() {
        this.$store.commit('APP_MAIN_LOADING', true)
      },
      endLoading() {
        this.$store.commit('APP_MAIN_LOADING', false)
      },
      setPageSize(val) {
        this.page.pageSize = val
      },
      setPageIndex(val) {
        this.page.pageIndex = val
      },
      setOrder(val) {
        this.page.Order = val
      },

      /**
       * 接口返回值
       * @param response
       * @returns {number}
       */
      setData(response) {
        this.content = response.data;
        this.page.total = 0;
        if (response.data === null) {
          this.content = [];
          this.content = this.tableData;
          return this.page.total = 0;
        }
        if (response.paginator !== null) this.page.total = response.paginator.totalCount
      },

      /**
       * 没有分页的返回值
       * @param response
       */
      setDataNotPaginator(response) {
        this.content = response.data;
      },

      /**
       * 路由跳转
       * @param path
       * @param param
       */
      goto(path, param) {
        if (param !== null && param !== undefined) {
          for (item in param) {
            param[item] = JSON.stringify(param[item])
          }
        }
        this.$router.push({path: path, query: {param}})
      },

      /**
       * 回去路由参数
       * @param key
       * @returns {*}
       */
      getQuery(key) {
        const value = this.$route.query[key]
        if (value === null) return null
        return value
      },

      /**
       * 返回上一页
       */
      lastPage() {
        this.$router.go(-1)
      },

      /**
       * 调用接口
       * @param api
       * @param params
       * @returns {Promise<any>}
       */
      invokeApi(api, params) {
        return new Promise((resolve, reject) => {
          api(params).then(response => {
            return resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },

      /**
       * 提示框
       * @param title
       * @param confirmButtonText
       * @param cancelButtonText
       * @returns {*}
       */
      messageBox({title = '提示', confirmButtonText = '确认', cancelButtonText = '取消', message = 'message'}) {
        return messageBox({
          title: title,
          confirmButtonText: confirmButtonText,
          cancelButtonText: cancelButtonText,
          message:message
        })
      },

      /**
       * 错误提示
       * @param message
       * @returns {*}
       */
      errorMessageBox(message) {
        return errorMessage(message)
      },

      /**
       * 成功提示框
       * @param message
       * @returns {*}
       */
      successMessageBox(message) {
        return successMessage(message)
      }

    }

  }


</script>

<style>

</style>
