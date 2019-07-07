<template>
  <div>
    <el-container>
      <el-aside >
        <left-medium></left-medium>
      </el-aside>
      <el-container>
        <el-header>
          <top-medium></top-medium>
        </el-header>
        <el-main>
          <down-medium></down-medium>
        </el-main>
      </el-container>
    </el-container>


  </div>
</template>

<script>
  import downMedium from './downMedium'
  import leftMedium from './leftMedium'
  import topMedium from './topMedium'

  export default {
    name: 'medium',
    components: {downMedium, topMedium, leftMedium},
  }

</script>


<style>


</style>
