<!--基础信息 rengaoli 2021/5/18 -->
<template>
  <div class="information">
    <div class="content-head">
      <h4>基础信息</h4>
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="部门">
              <el-select v-model="formInline.region" placeholder="信息部">
                <el-option label="信息部" value="shanghai"></el-option>
                <el-option label="信息部" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目">
              <el-select v-model="formInline.region" placeholder="OA">
                <el-option label="OA" value="shanghai"></el-option>
                <el-option label="OA" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="日期">
              <el-date-picker v-model="value1" type="date" placeholder="日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="仓库">
              <el-select v-model="formInline.region" placeholder="动物实验库">
                <el-option label="动物实验库" value="shanghai"></el-option>
                <el-option label="动物实验库" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script  >
export default {
  name: "information",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formInline: {
        user: "",
        region: "",
      },
    };
  },
  methods: {},
};
</script>

<style scoped>
.information {
  margin: 20px;
}
</style>