<template>
  <div class="from-ations">
    <div class="jichu">
      <h4>商品规格</h4>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="规格" prop="color">
                <el-select v-model="ruleForm.value" clearable placeholder="颜色">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="规格" prop="colors">
                <el-select v-model="ruleForm.value1" multiple placeholder="红色">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="规格" prop="rgb">
                <el-select v-model="ruleForm.rgb" clearable placeholder="内存">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="规格" prop="rgbs">
                <el-select v-model="ruleForm.rgbs" multiple placeholder="32g">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-button type="primary" size="small" @click="fnadd">添加规格</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'from-ations',
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      ruleForm: {
        value: '',
        value1: '',
        rgb: '',
        rgbs: ''
      }
    }
  },
  methods: {
    fnadd() {}
  }
}
</script>

<style scoped>
.from-ations {
  height: 100%;
}
.el-tabs__content {
  background: #fff;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.jichu {
  margin: 20px;
}
</style>
