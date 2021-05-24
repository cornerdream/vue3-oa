<!--明细 rengaoli 2021/5/18 -->
<template>
  <div class="detailed">
    <div class="content-head">
      <h4>明细</h4>
      <el-table :data="tableData" border style="width: 100%; margin-left: 36px">
        <el-table-column prop="date" label="名称">
          <el-select v-model="formInline.region" placeholder="OA">
            <el-option label="OA" value="shanghai"></el-option>
            <el-option label="OA" value="beijing"></el-option>
          </el-select>
        </el-table-column>
        <el-table-column prop="name" label="性别">
          <el-select v-model="formInline.region" placeholder="OA">
            <el-option label="OA" value="shanghai"></el-option>
            <el-option label="OA" value="beijing"></el-option>
          </el-select>
        </el-table-column>
        <el-table-column prop="address" label="周龄">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-table-column>
        <el-table-column prop="address" label="体重">
          <el-input v-model="input" placeholder="请输入内容"></el-input
        ></el-table-column>
        <el-table-column prop="address" label="数量"
          ><el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-table-column>
        <el-table-column prop="address" label="单位">
          <el-select v-model="formInline.region" placeholder="OA">
            <el-option label="OA" value="shanghai"></el-option>
            <el-option label="OA" value="beijing"></el-option>
          </el-select>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template v-slot="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">
              <i class="el-icon-folder-opened"></i
            ></el-button>
            <el-button type="text" size="small">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              ><i class="el-icon-delete"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script  >
export default {
  name: "information",
  components: {},
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普",
        },
      ],
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
.detailed {
  margin: 20px;
}
</style>