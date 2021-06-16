<!-- -->
<template>
  <div class="createOrEdits">
    <el-dialog v-model="is_deleted" title="编辑菜单" width="600px">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="small"
        label-width="110px"
        style="text-align: initial">
         <el-form-item label="申请人：" prop="applicant" v-if="state != 'assigned'">
          <el-select v-model="form.applicant" filterable placeholder="请选择申请人">
            <el-option
              v-for="(item, index) in userlist"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型：" prop="picking_type" v-if="state != 'assigned'">
          <el-select v-model="form.picking_type" filterable placeholder="请选择类型">
            <el-option
              v-for="(item, index) in typelist"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称：" prop="sku" v-if="state != 'assigned'">
          <el-select v-model="form.sku" filterable placeholder="请选择产品名称">
            <el-option
              v-for="(item, index) in infolist"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="需求数量：" prop="product_qty" >
          <el-input
            oninput="value=value.replace(/[^0-9.]/g,'')"
            v-model="form.product_qty"
            placeholder="请选择需求数量"
            style="width:210px"/>
        </el-form-item>
         <el-form-item label="仓库：" prop="warahouse" v-if="state != 'assigned'">
          <el-select v-model="form.warahouse" filterable placeholder="请选择仓库">
            <el-option
              v-for="(item, index) in wareList"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer class="dialog-footer">
        <el-button type="text" @click="cancel">取消</el-button>
        <el-button :loading="loading" type="primary" @click="onSubmit">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script >
import {wareList,userlist,typelist,save} from '../../../../../api/picking'
import {infoList } from '../../../../../api/buyer'
import { dateToMs, msToDate } from '../../../../../utils/index'
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
    const validateMoney = (rule, value, callback) => {
      if (!value) {
        callback(new Error('金额不能为空'))
      } else if (value.split('.').length > 2) {
        callback(new Error('输入正确格式的金额')) //防止输入多个小数点
      } else {
        value = Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2) //四舍五入
        value = Number(value).toFixed(2) //不足补位
        this.form.product_qty = value
        callback()
      }
    }
    return {
      loading: false,
      is_deleted: false,
      form: {},
      wareList: [],
      userlist: [],
      typelist: [],
      rules: {
        applicant: [{ required: true, message: '请选择申请人', trigger: 'change' }],
        picking_type: [{ required: true, message: '请选择类型', trigger: 'change' }],
        sku: [{ required: true, message: '请选择产品名称', trigger: 'blur' }],
        product_qty: [{ required: true, message: '请输入需求数量', trigger: 'blur', validator: validateMoney }],
        warahouse: [{ required: true, message: '请选择仓库', trigger: 'blur',}],
      }
    }
  },
  created() {
    
  },
  mounted() {
    this.wareLists()
    this.userlists()
    this.typelists()
    this.infomag()
  },
  methods: {
    wareLists() {// 仓库
      wareList().then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.data.results)
          this.wareList = res.data.data.results
        }
      })
    },
    userlists() {//申请人
      userlist().then((res) => {
        if (res.data.code == 200) {
          this.userlist = res.data.data.results
        }
      })
    },
    typelists() {//类型
      typelist().then((res) => {
        if (res.data.code == 200) {
          this.typelist = res.data.data.results
        }
        console.log( this.typelist,' this.typelist')
      })
    },
    infomag() { //产品名称
      infoList().then((res) => {
        if (res.data.code == 200) {
          this.infolist = res.data.data.results
        }
      })
    },
    cancel() { //取消
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
         applicant: this.form.applicant?this.form.applicant.id||this.form.applicant:this.form.applicant.id,
         picking_type: this.form.picking_type ? this.form.picking_type.id || this.form.picking_type : this.form.picking_type,
         lines: {
          sku: this.form.sku ? this.form.sku.id || this.form.sku : this.form.sku,
          product_qty:this.form.product_qty?this.form.product_qty:'',
          warahouse: this.form.warahouse ? this.form.warahouse.id || this.form.warahouse : this.form.warahouse,
          lot_id: ''
           }
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
      this.form = ''
      // this.form = {
      //   applicant: '',
      //   picking_type: '',
      //   lines: {
      //     sku:'',
      //     product_qty: '',
      //     warahouse: '',
      //     lot_id: ''
      //      }
      // }
    }
  }
}
</script>
<style scoped></style>
