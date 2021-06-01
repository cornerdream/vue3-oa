<!-- -->
<template>
  <div class="createOrEdits">
    <el-dialog v-model="is_deleted" title="编辑菜单" width="600px">
      <el-form
        ref="form"
        :model="form"
        size="small"
        label-width="100px"
        style="text-align: initial"
      >
        <el-form-item label="部门" prop="department" v-if="state != 'sent'">
          <el-select v-model="form.department.name" filterable placeholder="请选择部门">
            <el-option
              v-for="(item, index) in treelist.children"
              :key="index"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目" prop="project" v-if="state != 'sent'">
          <el-select v-model="form.project.name" filterable placeholder="请选择项目">
            <el-option
              v-for="(item, index) in projectlist"
              :key="index"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商" prop="supplier">
          <el-select v-model="form.supplier" filterable placeholder="请选择供应商">
            <el-option
              v-for="(item, index) in supplist"
              :key="index"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称" prop="sku" v-if="state != 'sent'">
          <el-input v-model="form.line.sku" placeholder="产品名称" style="width: 460px" />
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input v-model.number="form.line.price" placeholder="单价" style="width: 460px" />
        </el-form-item>
        <el-form-item label="运费" prop="freight">
          <el-input v-model.number="form.line.freight" placeholder="运费" style="width: 460px" />
        </el-form-item>

        <el-form-item label="预计到货日期">
          <el-date-picker
            v-model="form.line.estimated_arrival_date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer class="dialog-footer">
        <el-button type="text" @click="cancel">取消</el-button>
        <el-button :loading="loading" type="primary" @click="onSubmit">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { supplierList, projectList, departmentList, save } from '../../../../../api/buyer'
export default {
  name: 'createOrEdit',
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    state: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      is_deleted: false,
      form: {},
      supplist: [],
      projectlist: [],
      treelist: []
    }
  },
  created() {
  },
  mounted() {
    supplierList().then((res) => {
      if (res.data.code == 200) {
        console.log()
        this.supplist = res.data.data.results
      }
    })
    this.suppliermag()
    this.projectmag()
    this.departmentmag()
  },
  methods: {
    suppliermag() {
      // 供应商
      supplierList().then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.data.results)
          this.supplist = res.data.data.results
          console.log(this.supplist, 'supplist')
        }
      })
    },
    projectmag() {
      projectList().then((res) => {
        if (res.data.code == 200) {
          this.projectlist = res.data.data.results
          console.log(this.projectlist, 'projectlist')
        }
      })
    },
    departmentmag() {
      departmentList().then((res) => {
        if (res.data.code == 200) {
          this.treelist = res.data.data[0]
          console.log(this.treelist, 'treelisttreelisttreelist')
        }
      })
    },

    cancel() {
      //取消
      this.resetForm()
    },
    async onSubmit() {
      await (this.$refs.form as any).validate()
      this.loading = true
      if (this.isAdd) {
      } else {
        this.onEdit()
      }
    },
    onEdit() {
      let form = {
        line: [
          {
            id: this.form.line.id,
            price: this.form.line.price,
            freight: this.form.line.freight,
            estimated_arrival_date: this.form.line.estimated_arrival_date,
            sku: this.form.line.sku.id
          }
        ],
        department: this.form.department.id,
        project: this.form.project.id,
        supplier: this.form.supplier.id
      }
      save(this.id, form)
        .then((res) => {
          this.resetForm()
          ;(this as any).$message({
            showClose: true,
            type: 'success',
            message: '修改成功!',
            duration: 2500
          })
          this.loading = false
          this.form = res.data.data
          this.$emit('func', this.form)
          console.log(res, '回复客户就开始')
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    resetForm() {
      this.is_deleted = false
      ;(this as any).form = {
        line: {
          id: '',
          price: '',
          freight: '',
          estimated_arrival_date: '',
          sku: ''
        },
        department: '',
        project: '',
        supplier: ''
      }
    }
  }
}
</script>
<style scoped></style>
