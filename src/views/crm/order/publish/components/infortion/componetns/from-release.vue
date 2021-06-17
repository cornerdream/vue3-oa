<template>
  <div class="from-ations">
    <div class="jichu">
      <h4>规格明细</h4>
      <!-- <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
        border
        style="width: 40%; margin-top: 20px; margin-left: 50px"
      >
        <el-table-column prop="id" label="颜色"> </el-table-column>
        <el-table-column prop="name" label="内存"> </el-table-column>
        <el-table-column prop="amount1" label="单价"> </el-table-column>
      </el-table> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'from-ations',
  data() {
    return {
      tableData: [
        {
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        },
        {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        },
        {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        },
        {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        },
        {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }
      ]
    }
  },

  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
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
