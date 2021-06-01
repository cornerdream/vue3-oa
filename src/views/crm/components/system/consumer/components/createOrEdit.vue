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
              <!-- <el-input
              placeholder="请选择部门"
              suffix-icon="el-icon-arrow-right"
              v-model="form.department"
              @click="treeShow=!treeShow">
            </el-input>
            {{form.department}}
            <el-tree
              :data="organizations"
              show-checkbox
              default-expand-all
              node-key="pid"
              ref="tree"
              highlight-current
              :props="defaultProps"
              default-expanded-keys="form.department"
              v-if="treeShow"
              @node-click="nodeClick">
            </el-tree> -->
              <!-- {{ form.department }} -->
              <el-cascader
                v-model="form.department"
                :options="organizations"
                :props="defaultProps"
                clearable
                style="width: 300px"
                placeholder="请选择部门"
              ></el-cascader>
              <!-- <el-select v-model="form.department" :options="organizations" clearable style="width: 300px;" placeholder="请选择部门">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option> 
            </el-select>             -->
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
export default {
  name: 'createOrEdit',
  props: {
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
  data() {
    return {
      defaultProps: {
        label: 'name'
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
        department: [],
        superior: null,
        position: '',
        email: '',
        is_active: 'false',
        roles: []
      },

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
  mounted() {},
  methods: {
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
        department: [],
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
</style>
