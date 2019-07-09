<template>
  <div>
    <el-table
      :data="data"
      :border="table.border !== false"
      :max-height="table.maxHeight ? 500:table.maxHeight "
      @select="select"
      @select-all="selectAll"
      @selection-change="selectChange"
    >
      <el-table-column
        v-if="table.multipleSelect"
        align="center"
        type="selection"
        width="55"
      />

      <el-table-column
        v-for="(item,index) in table.content"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :min-width="item.minWidth"
        :formatter="item.formatter"
        :header-align="item.headerAlign === null ?  item.headerAlign:'center'"
        :show-overflow-tooltip="item.showOverflowTooltip === false">
        <template slot-scope="scope">
          <span v-if="item.type=== 'boolean'">{{formatterBoolean(scope.row[item.prop])}}</span>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>

      <el-table-column
        v-if="table.operations && table.operations.length > 0"
        label="操作"
        align="center"
        width="120">
        <template slot-scope="scope">
          <el-button v-if="table.operations && table.operations.length === 1"
                     :disabled="isDisabled(table.operations[0].disabled,0,table.operations[0],false)"
                     size="mini"
                     @click="onClick(table.operations[0].click,0,table.operations[0])"
                     v-show="isMethod(table.operations[0].show,0,table.operations[0],true)">{{table.operations[0].name}}
          </el-button>
          <el-dropdown v-else  trigger="hover">
            <el-button plain size="mini">更多操作 <i class="el-icon-arrow-down"></i></el-button>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(item,index) in table.operations" :key="index"
                @click.native="onClick(item.click,scope.$index,scope.row)"
                :disabled="isDisabled(item.disabled,scope.$index,scope.row,false)"
                v-show="isMethod(item.show, scope.$index, scope.row, true)">{{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>

          </el-dropdown>
        </template>

      </el-table-column>


    </el-table>
  </div>
</template>


<script>
  import {FUNCTION} from '../../../utils/constats'

  export default {
    name: 'BTable',
    props: {
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      table: {
        type: Object,
        default: {
          multipleSelect: false,
          select: null,
          selectAll: null,
          selectChange: null,
          content: [],
          maxHeight: 500,
          border: false,
          operations: []
        }
      }
    },
    methods: {
      select(selection, row) {
        if (typeof this.table.select === FUNCTION) this.table.select(row)
      },
      selectAll(selection) {
        if (typeof this.table.selectAll === FUNCTION) this.table.selectAll(selection)
      },
      selectChange(selection) {
        if (typeof this.table.selectChange === FUNCTION) this.table.selectChange(selection)
      },
      formatterBoolean(value) {
        return value ? '是' : '否'
      },
      isMethod(method, index, row, defaultValue) {
        if (typeof method === FUNCTION) return method({index, row});
        return method === undefined ? defaultValue : method
      },
      isDisabled(method, index, row, defaultValue) {
        if (typeof method === FUNCTION) return method({index, row});
        return method === undefined ? defaultValue : method
      },
      onClick(method, index, row) {
        if (method === null || typeof method !== FUNCTION || method === undefined) return null;
        return method({index, row})
      },

    }
  }
</script>


<style></style>
