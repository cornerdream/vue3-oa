<!-- -->
<template>
  <div class="createOrEdits">
    <el-dialog v-model="is_deleted" title="编辑菜单" width="600px">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="small"
        label-width="140px"
        style="text-align: initial">
        <el-form-item label="部门：" prop="department" v-if="state != 'sent'">
          <el-input
            style="width: 210px"
            class="input"
            clearable
            placeholder="请选择部门"
            @click.native="handleClick"
            v-model="selectDepartment">
            <template #suffix>
              <i class="el-input__icon el-icon-arrow-down"></i>
            </template>
          </el-input>
          <div class="mycascader">
            <el-cascader-panel
              ref="cascader"
              :props="defaultProps"
              @click.native="handleBlur"
              @change="handleChange"
              :options="treelist"
            ></el-cascader-panel>
          </div>
        </el-form-item>
        <el-form-item label="项目：" prop="project" v-if="state != 'sent'">
          <el-select v-model="form.project" filterable placeholder="请选择项目">
            <el-option
              v-for="(item, index) in projectlist"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商：" prop="supplier">
          <el-select v-model="form.supplier" filterable placeholder="请选择供应商">
            <el-option
              v-for="(item, index) in supplist"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称：" prop="sku" v-if="state != 'sent'">
          <el-select v-model="form.sku" filterable placeholder="请选择产品名称">
            <el-option
              v-for="(item, index) in infolist"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价：" prop="price">
          <el-input
            oninput="value=value.replace(/[^0-9.]/g,'')"
            v-model="form.price"
            placeholder="请输入单价"
            style="width: 210px"/>
        </el-form-item>
        <el-form-item label="运费：" prop="freight">
          <el-input
            oninput="value=value.replace(/[^0-9.]/g,'')"
            v-model="form.freight"
            placeholder="请输入运费"
            style="width: 210px"/>
        </el-form-item>
        <el-form-item label="预计到货日期：" prop="estimated_arrival_date">
          <el-date-picker
            type="date"
            placeholder="请选择到货日期"
            v-model="form.estimated_arrival_date"
            value-format="yyyy-MM-dd">
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

<script>
import { supplierList, projectList, departmentList, save, infoList } from '../../../../../api/buyer'
import { dateToMs, msToDate } from '../../../../../utils/index'
import $ from 'jquery'
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
    },
    select: {
      type: String,
      required: true
    },
  },
  watch: {
    select(newv) {
      this.selectDepartment = newv
      console.log(newv, 'wacth')
    }
  },
  data() {
    const validateMoney = (rule, value, callback) => {
      if (!value) {
        callback(new Error('金额不能为空'))
      } else if (value.split('.').length > 2) {
        callback(new Error('输入正确格式的金额')) //防止输入多个小数点
      } else {
        value = Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2) //四舍五入
        value = Number(value).toFixed(2) //不足补位
        this.form.price = value
        callback()
      }
    }
    const freightMoney = (rule, value, callback) => {
      if (!value) {
        callback(new Error('金额不能为空'))
      } else if (value.split('.').length > 2) {
        callback(new Error('输入正确格式的金额')) //防止输入多个小数点
      } else {
        value = Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2) //四舍五入
        value = Number(value).toFixed(2) //不足补位
        this.form.freight = value
        callback()
      }
    }
    return {
       expireTimeOption:{
          disabledDate(time) {
          let vm = this
          let endTime = new Date().setFullYear(new Date().getFullYear() + 1)
          console.log(time,'tiem')
          return time.getTime() < Date.now() || time.getTime() > endTime
        },
      },
      selectDepartment: '',
      defaultProps: {
        checkStrictly: true,
        children: 'children',
        label: 'name',
        value: 'id'
      },
      loading: false,
      is_deleted: false,
      form: {},
      supplist: [],
      projectlist: [],
      treelist: [],
      infolist: [],
      rules: {
        department: [{ required: true, message: '请选择部门', trigger: 'change' }],
        project: [{ required: true, message: '请选择项目', trigger: 'change' }],
        supplier: [{ required: true, message: '请选择供应商', trigger: 'change' }],
        sku: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur', validator: validateMoney }
        ],
        freight: [
          { required: true, message: '请输入运费', trigger: 'blur', validator: freightMoney }
        ],
        estimated_arrival_date: [
          { type: 'date', required: true, message: '请选择到货日期', trigger: 'change' }
        ]
      }
    }
  },
  created() {},
  mounted() {
    this.suppliermag()
    this.projectmag()
    this.departmentmag()
    this.infomag()
  },
  methods: {
    handleBlur() {
      // $('.mycascader').hide();
    },
    handleClick() {
      $('.mycascader').show()
    },
    suppliermag() { // 供应商
      supplierList().then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.data.results)
          this.supplist = res.data.data.results
        }
      })
    },
    projectmag() {//项目
      projectList().then((res) => {
        if (res.data.code == 200) {
          this.projectlist = res.data.data.results
        }
      })
    },
    departmentmag() { //部门
      departmentList().then((res) => {
        if (res.data.code == 200) {
          this.treelist = res.data.data.results
        }
      })
    },
    infomag() { //产品名称
      infoList().then((res) => {
        if (res.data.code == 200) {
          this.infolist = res.data.data.results
        }
      })
    },
    cancel() {//取消
      this.resetForm()
    },
    async onSubmit() {
      await this.$refs.form.validate()
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
            id: this.form.id,
            price: this.form.price,
            freight: this.form.freight,
            estimated_arrival_date: this.form.estimated_arrival_date? msToDate(dateToMs(this.form.estimated_arrival_date)).withoutTime: '',
            sku: this.form.sku ? this.form.sku.id || this.form.sku : this.form.sku
          }
        ],
        department: this.form.department?this.form.department.id ||this.form.department: this.form.department,
        project:this.form.project? this.form.project.id ||this.form.project:this.form.project,
        supplier: this.form.supplier? this.form.supplier.id || this.form.supplier: this.form.supplier
      }
      save(this.id, form)
        .then((res) => {
          this.resetForm();
          this.$message({
            showClose: true,
            type: 'success',
            message: '修改成功!',
            duration: 2500
          })
          this.loading = false
          this.form = res.data.data
          this.$emit('func', this.form)
        })
        .catch((err) => {
          this.loading = false
        })
    },
    resetForm() {
      this.is_deleted = false;
      this.form = {
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
    },
    handleChange(item) {
      let labels = this.$refs.cascader.getCheckedNodes()[0].pathLabels
      if (Array.isArray(item)) {
        this.selectDepartment = labels[labels.length - 1]
        this.form.department = item[item.length - 1]
      } else {
        this.form.department = item
      }
      $('.mycascader').hide()
    }
  }
}
</script>
<style scoped>
.mycascader {
  position: absolute;
  left: 0;
  top: 40px;
  z-index: 999;
  background: #fff;
  display: none;
}
</style>
