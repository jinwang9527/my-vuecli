<template>
  <div>
    <div class="imageBox">
      <el-upload
        :headers="getHeader()"
        :before-upload="beforeUpload"
        :action="getAction()"
        :multiple=false
        name="image"
        :show-file-list=false
        :on-preview="onPreview"
        :on-remove="onRemove"
        :on-success="onSuccess"
        :on-error="onError"
        list-type="picture-card"
        class="avatar-uploader"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
    <el-dialog :visible.sync="showDialog">
      <img width="100%" :src="imageUrl" :alt="imageUrl">
    </el-dialog>
  </div>
</template>


<script>
  import BaseVue from '../../BaseView'
  import {getToken} from '../../../utils/auth'

  export default {
    name: 'BImageUpload',
    extends: BaseVue,
    data() {
      return {
        showDialog: false,
        imageUrl: '',
      }
    },
    props: {
      name: {
        type: String,
        default: ''
      },
      defaultImage: {
        type: String,
        default: ''
      }
    },
    methods: {
      beforeUpload() {
        this.startLoading()
      },
      getHeader() {
        return {token: getToken()}
      },
      getAction() {
        return process.env.BASE_API + '/system/uploadFile/image'
      },
      onPreview(file) {
        this.imageUrl = file;
        this.showDialog = true
      },
      onRemove(file, flieList) {
        console.log(file);
        console.log(flieList)
      },
      onSuccess(response, file, fileList) {
        this.imageUrl = process.env.IMAGE_URL + response.data;
        this.$emit('change', {
          name: this.name,
          path: response.data
        });
        this.endLoading()
      },
      onError(err, file, fileList) {
        console.log(err);
        this.endLoading()
      }
    },
    watch: {
      defaultImage(val) {
        if (val) {
          this.imageUrl = []
          this.imageUrl.push({
            name: '',
            url: process.env.IMAGE_URL + val
          })
        }
      }
    }

  }
</script>


<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #747474;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .imageBox {
    width: 150px;
    height: 150px;
    overflow: hidden;
  }
</style>
