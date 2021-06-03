<!-- -->
<template>
  <div class="createOrEdit">
    <el-dialog
      center
      v-model="dialogVisible"
      :title="isAdd ? '新增用户' : '编辑用户'"
      width="850px"
    >
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="头像" prop="image">
              <el-upload
                class="avatar-uploader"
                name="upImage"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="imgSuccess"
              >
                <img v-if="form.image" :src="form.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" :disabled="isAdd === false" style="width: 300px" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" style="width: 300px" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" style="width: 300px" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机" prop="mobile">
              <el-input v-model="form.mobile" style="width: 300px" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门">
              
                <el-input
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
             :options="organizations"></el-cascader-panel>
              </div>
              
            
              <!-- <el-cascader
                :v-model="form.department"
                :options="organizations"
                :props="defaultProps"
                :show-all-levels="false"
                clearable
                style="width: 300px"
                placeholder="请选择部门"
                @change="handleChange"
              ></el-cascader> -->
             
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="职位" prop="position">
              <el-input v-model="form.position" style="width: 300px" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="is_active">
              <el-radio v-model="form.is_active" label="true">激活</el-radio>
              <el-radio v-model="form.is_active" label="false">锁定</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="上级主管">
              <!-- {{form.superior}} -->
              <el-select v-model="form.superior" clearable placeholder="请选择上级主管">
                <el-option
                  v-for="item in orgusers"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <!-- <el-select v-model="form.superior" :options="orgusers" clearable style="width: 300px;" placeholder="请选择上级主管">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option> 
            </el-select>                -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item style="margin-bottom: 0px" label="角色">
              <!-- {{form.roles}} -->
              <el-select v-model="form.roles" multiple placeholder="请选择角色">
                <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
              <!-- <el-select v-model="role"  :options="roles" clearable style="width: 300px;" placeholder="请选择角色">
                <el-option
                    v-for="item in roles"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>                
            </el-select>               -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="text" @click="cancel">取消</el-button>
          <el-button :loading="loading" type="primary" @click="onSubmit">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { add, edit } from '../../../../../../api/user'
import $ from 'jquery'
export default {
  name: 'createOrEdit',
  props: {
    select:{
      type: String,
      required: true
    },
    organizations: {
      type: Array,
      required: true
    },
    orgusers: {
      type: Array,
      required: true
    },
    roles: {
      type: Array,
      required: true
    },
    users: {
      type: Array,
      required: true
    },
    isAdd: {
      type: Boolean,
      required: true
    },
    rowId: {
      type: Number,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  watch:{
    select(newv){
      this.selectDepartment = newv;
    }
  },
  data() {
    return {
      defaultProps: {
        checkStrictly: true,
        children: 'children',
        label: 'name',
        value: 'id'
      },
      treeShow: false,
      loading: false,
      dialogVisible: false,
      form: {
        name: '',
        username: '',
        id: -1,
        image: '',
        mobile: '',
        department: null,
        superior: null,
        position: '',
        email: '',
        is_active: 'false',
        roles: []
      },
      selectDepartment:'',
      departmentId:null,
      rules: {
        image: [{ required: true, message: '请上传图片', trigger: 'blur' }],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确手机号', trigger: 'blur' }
        ],
        is_active: [{ required: true, message: '状态不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {},
  mounted() {
    this.$nextTick(()=>{
      $('.cascader').hide();
    })
  },
  methods: {
    handleBlur(){
      $('.mycascader').hide();
    },
    handleClick(e){
      console.log(e);
      console.log(e.target);
      console.log(e.target.nextSibling);
      console.log('click');
      console.log($('.mycascader'));
      $('.mycascader').show();
    },
    handleChange(item:any){
      console.log(item);      
      console.log(this.form.department); 
      // if(Array.isArray(item)){
      //   this.form.department = item[item.length-1]
      // }else{
      //   this.form.department = item;
      // }
      let labels = this.$refs.cascader.getCheckedNodes()[0].pathLabels;
      console.log(labels);
      if(Array.isArray(item)){
        this.selectDepartment = labels[labels.length-1];
        this.form.department = item[item.length-1]
      }else{
        this.form.department = item;
      }
      $('.mycascader').hide();
    },
    imgSuccess(res, file) {
      this.form.image = URL.createObjectURL(file.raw)
    },
    cancel() {
      this.resetForm();
    },
    async onSubmit() {
      await (this.$refs.form as any).validate()
      this.loading = true
      if (this.isAdd) {
        this.onAdd();
      } else {
        this.onEdit();
      }
    },
    onAdd() {
      
      console.log(this.form);
      add(this.form)
        .then((res) => {
          this.resetForm();
          (this as any).$message({
            showClose: true,
            type: 'success',
            message: '添加成功!默认密码123456!',
            duration: 2500
          });
          this.loading = false;
          this.sup_this.loadUsers();
        })
        .catch((err) => {
          this.loading = false;
        })
    },
    onEdit() {
      
      edit(this.rowId, this.form)
        .then((res) => {
          this.resetForm();
          (this as any).$message({
            showClose: true,
            type: 'success',
            message: '修改成功!',
            duration: 2500
          })
          this.loading = false;
          (this as any).$parent.$parent.loadUsers();
        })
        .catch((err) => {
          this.loading = false;
        })
    },
    resetForm() {
      this.dialogVisible = false;
      (this.$refs.form as any).resetFields();
      (this as any).roleIds = [];
      (this as any).form = {
        username: '',
        name: '',
        mobile: '',
        department: null,
        superior: null,
        position: '',
        email: '',
        is_active: 'false',
        roles: []
      }
    }
  }
}
</script>
<style scoped>
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
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.avatar {
  width: 30px;
  height: 30px;
  display: block;
}
.mycascader{
  position: absolute;
  left: 0;
  top:40px;
  z-index: 999;
  background: #fff;
  display: none;
}


</style>
