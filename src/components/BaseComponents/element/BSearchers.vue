<template>
  <div v-if="searchCondition &&  searchCondition.content && searchCondition.content.length >0">
    <el-form v-model="searchObj" label-position="right"
             :label-width="searchCondition.labelWidth === null ? '50px':searchCondition.labelWidth"
             :rules="searchCondition.rules">

      <el-row :gutter="20">
        <!--第一个输入框-->
        <el-col v-if="searchCondition.content[0]" :span="3.5">
          <el-form-item :prop="searchCondition.content[0].prop" :label-width="searchCondition.content.labelWidth"
                        :label="searchCondition.content[0].label">
            <el-input
              size="mini"
              clearable
              class="searchInput"
              v-model="searchObj[searchCondition.content[0].prop]"
              :placeholder="searchCondition.content[0].placeholder  ? searchCondition.content[0].placeholder : '请输入'+searchCondition.content[0].label"
              :prefix-icon="searchCondition.content[0].prefixIcon"
              :suffix-icon="searchCondition.content[0].suffixIcon"
            ></el-input>
          </el-form-item>
        </el-col>
        <!--第二个输入框-->
        <el-col v-if="searchCondition.content[1]" :span="3.5">
          <el-form-item :prop="searchCondition.content[1].prop" :label-width="searchCondition.content[1].labelWidth"
                        :label="searchCondition.content[1].label">
            <el-input
              size="mini"
              clearable
              class="searchInput"
              v-model="searchObj[searchCondition.content[1].prop]"
              :placeholder="searchCondition.content[1].placeholder ? searchCondition.content[1].placeholder :'请输入'+searchCondition.content[1].label"
              :prefix-icon="searchCondition.content[1].prefixIcon"
              :suffix-icon="searchCondition.content[1].suffixIcon"
            >
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="3.5">
          <el-form-item label-width="0">
            <el-button size="mini" @click="search(searchObj)">查 询</el-button>
            <el-button size="mini" v-if="searchCondition && searchCondition.content.length > 2" @click="isVisible">
              更多查询
            </el-button>
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>

    <el-dialog width="400" v-if="searchCondition && searchCondition.content.length > 2" :visible="visible" title="更多查询"
               :before-close="closeSearchDialog">
      <el-form v-model="searchDialogObj"
               :rules="searchDialogObj.rules"
               :label-width="searchCondition.content.labelWidth === null ? '50px':searchCondition.labelWidth"
               label-position="right">

        <el-form-item v-for="(item,index) in this.searchDialogObject.content " :key="index" style="width: 60%"
                      :label-width="item.labelWidth" :prop="item.prop" :label="item.label">
          <el-input v-if="!item.type || item.type === 'text' " :label-width="item.labelWidth" :prop="item.prop"
                    :label="item.label" size="mini" v-model="searchDialogObj[item.prop]"></el-input>

          <div v-else-if="item.type === 'time'">
            <el-date-picker
              v-model="searchDialogObj[item.prop]"
              clearable
              type="daterange"
              size="mini"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="3.5">
              <el-button size="mini" type="primary" @click="search(searchDialogObj)">查 询</el-button>
            </el-col>
            <el-col :span="3.5">
              <el-button size="mini" @click="closeSearchDialog">取 消 </el-button>
            </el-col>

          </el-row>

        </el-form-item>

      </el-form>
    </el-dialog>


  </div>
</template>


<script>

  export default {
    name: 'BSearchers',
    props: {
      searchCondition: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {
        searchDialogObject: {},
        searchDialogObj: {},
        searchObj: {},
        visible: false
      }
    },
    methods: {

      isVisible() {
        this.searchDialogObject.content = [];
        for (let i = 0; i <= this.searchCondition.content.length; i++) {
          if (i > 1 && this.searchCondition.content[i]) {
            this.searchDialogObject.content.push(this.searchCondition.content[i])
          }
        }
        this.visible = true
      },
      closeSearchDialog() {
        this.visible = false
      },
      search(searchObj) {
        let realConditions = searchObj;
        for (let condition of this.searchCondition.content) {
          if (realConditions[condition.prop] === '') realConditions[condition.prop] = null
          if (condition.type === 'time') {
            realConditions[this.addStringPrefix('start', condition.prop)] = realConditions[condition.prop][0];
            realConditions[this.addStringPrefix('end', condition.prop)] = realConditions[condition.prop][1];
            realConditions[condition.prop] = null;
          }
        }
        this.$emit('search', realConditions)
      },

      addStringPrefix(prefix, prop) {
        return prefix + prop.substring(0, 1).toUpperCase() + prop.substring(1);
      }
    }

  }
</script>


<style>
  .searchInput {
    width: 100%;
  }

  .el-date-editor .el-range-separator {
    padding: 0 !important;
  }
</style>
