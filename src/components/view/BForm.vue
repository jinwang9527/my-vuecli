<template>

  <div>
    <b-container
      :icon="form.icon"
      :title="form.title"
      :prePageText="form.prePageText"
      :isShowDropDownButton="form.isShowDropDownButton"
      :isHiddenPre="form.isHiddenPre"
    >

      <el-form :ref="model" :label-position="form.labelPosition ? right:form.labelPosition" :model="model"
               :label-width="form.labelWidth || '100px'">

        <el-row :gutter="20">
          <el-col v-for="(item,index ) in form.formItems" :key="index" :sm="item.sm || 12">
            <el-form-item :rules="item.rules" :label="item.label+'：'" :prop="item.name">
              <!-- 直接进行显示 -->
              <span v-if="item.type=== 'normal'">{{ model[item.name] }}</span>

              <!-- 数值输入框 -->
              <el-input-number class="inputClass" v-model="model[item.name]" v-else-if="item.type=== 'number'"
                               :mix="item.min ?  item.min:0"
                               :max="item.max ? item.max : 999" :label="item.label"
                               :disabled=isDisabled(item)></el-input-number>

              <!-- 密码输入框 -->
              <el-input v-else-if="item.type=== 'password'" :minlength="item.min ? item.min:0"
                        :maxlength="item.max ? item.max:32" :label="item.label" :placeholder="'请输入'+item.label"
                        v-model="model[item.name]" class="inputClass" :disabled="isDisabled(item)">
                <div slot="suffix">
                  <el-button v-show="item['showPassword']" type="text" class="iconfont icon-17yanjing2"
                             style="margin-right: 10px;"
                             @click="item['showPassword'] = !item['showPassword']"></el-button>
                  <el-button v-show="!item['showPassword']" type="text" class="iconfont icon-biyanjing"
                             style="margin-right: 10px;"
                             @click="item['showPassword'] = !item['showPassword']"></el-button>
                </div>
              </el-input>

              <!-- 时间选择器 -->
              <el-date-picker v-model="model[item.name]" type="date" :placeholder="'请选择'+item.prop"
                              :disabled="isDisabled(item)" v-else-if="item.type === 'date'" clearable/>

              <!-- 开关 -->
              <el-switch v-else-if="item.type === 'switch'" v-model="model[item.name]" class="inputClass"
                         :active-text="item.activeText ? item.activeText:'是'"
                         :inactive-text="item.inactiveText ? item.inactiveText:'否'"
                         :active-value="item.activeValue ? item.activeValue:0"
                         :inactive-value="item.inactiveValue ? item.inactiveValue:1"
                         :disabled="isDisabled(item)"
              ></el-switch>

              <!-- 图片上传 -->
              <div v-else-if="item.type === 'image'">
                <b-image-upload @change="uploadSuccess" :name="item.name" :disabled="isDisabled(item)"></b-image-upload>
              </div>
              <!-- 显示图片 -->
              <div v-else-if="item.type === 'normalImage'">
                <img :src="getImage(model[item.name])" width="150px" height="150px" :alt="getImage(model[item.name])"
                     @click="showImage(model[item.name])"/>
              </div>
              <!-- 显示多张 -->
              <div v-else-if="item.type === 'normalImages'">
                <img v-for="(image,index) in model[item.name]"
                     v-if="image"
                     :key="index"
                     width="150px"
                     height="150px"
                     :alt="getImage(model[item.name])"
                     :src="getImage(model[item.name])"
                     @click="showImage(model[item.name])"
                />
              </div>

              <!-- 下拉选框 -->
              <el-select v-else-if="item.type === 'select'" clearable :disabled="isDisabled(item)"
                         :placeholder="item.placeholder ? item.placeholder:'请选择'+item.label" v-model="model[item.name]">
                <el-option v-if="item.options" v-for="(opt,index) in item.options" :value="opt.value" :label="opt.label"
                           :key="index"></el-option>
              </el-select>

              <!-- 多行文本输入框 -->
              <el-input v-model="model[item.name]" v-else-if="item.type === 'textarea'" clearable
                        :disabled="isDisabled(item)"
                        type="textarea"
                        :placeholder="item.placeholder ? item.placeholder:'请输入'+item.label"
                        :minlength="item.minlength? item.minlength:0" :maxlength="item.maxlength ? item.maxlength:32"/>

              <!-- Input输入框 -->
              <el-input v-else v-model="model[item.name]" clearable :disabled="isDisabled(item)"
                        :placeholder="item.placeholder ? item.placeholder:'请输入'+item.prop"
                        :minlength="item.minlength? item.minlength:0"
                        :maxlength="item.maxlength ? item.maxlength:32"></el-input>

            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :sm="12">
            <el-form-item>
              <el-button v-for="(item,index) in form.operations" v-if="isShow(item.show)" :key="index"
                         @click="OnClick(item)" :type="item.type ? item.type : null">
                {{ item.name }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 图片放大 -->
      <el-dialog :visible="selectedImg !== null" :before-close="closeImageShow">
        <img v-if="selectedImg" width="100%" height="100%" :src="getImage(selectedImg)" :alt="getImage(selectedImg)">
      </el-dialog>
    </b-container>
  </div>

</template>


<script>

  import BContainer from '../BaseComponents/element/BContainer'
  import BaseView from '../BaseView'
  import BImageUpload from '../BaseComponents/element/BImageUpload'

  export default {
    name: 'BForm',
    extends: BaseView,
    components: {
      BContainer,
      BImageUpload
    },
    props: {
      form: {
        type: Object,
        default: {
          icon: null,
          title: null,
          prePageText: null,
          isShowDropDownButton: null,
          isHiddenPre: true,
          formItems: []
        }
      },

    },
    data() {
      return {
        model: {},
        selectedImg: null,

      }
    },
    methods: {

      OnClick(item) {
        if (!item.click) return;
        if (typeof item.click === "function") return this.OnClickOrigin(item);
        if (item.click === 'Submit') return this.Submit();
        if (item.click === 'OnSave') return this.OnSave();
        if (item.click === 'Reset') return this.Reset();

      },

      initFormatter(){

      },

      Reset(){
        this.$refs.model.resetFields()
        this.model = JSON.parse(JSON.stringify(this.form.model))

      },


      OnSave() {
        this.$refs.model.validate(valid => {
          if (valid) {
            this.invokeApi(this.form.api, this.preProcessing(this.model)).then(response => {
              this.successMessageBox('保存成功!')
            })
          }
        })
      },

      Submit() {
        this.$refs.model.validate(valid => {
          if (valid) {
            this.invokeApi(this.form.api, this.OnClickOrigin(this.model)).then(response => {
              this.messageBox({
                message: '是否返回上一页！',
                type: 'success',
                title: '成功'
              }).then(() => {
                this.lastPage()
              })
            })
          }
        })
      },

      OnClickOrigin(item) {
        this.$refs.model.validate(valid => {
          if (valid) return item.OnClick(this.preProcessing(this.model))
        })
      },
      preProcessing(model) {
        if (!model) return
        let models = JSON.parse(JSON.stringify(model))
        return models
      },


      isShow(show) {
        if (show && typeof show === 'function') return show(this.form.model)
        return show
      },

      showImage(val) {
        this.selectedImg = val
      },

      closeImageShow() {
        this.selectedImg = null
      },

      getImage(path) {
        return process.env.IMAGE_URL + path
      },
      isDisabled(item) {
        if (typeof item.disabled === "function") return item.disabled(item);
        return item.disabled
      },
      uploadSuccess({name, path}) {
        this.model[name] = path
      }
    }

  }

</script>


<style scoped>
  .inputClass {
    width: 100%;
  }
</style>
