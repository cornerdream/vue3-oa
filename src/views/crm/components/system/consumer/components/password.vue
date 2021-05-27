<!-- -->
<template>
  <div class="password">
    <el-dialog v-model="dialogVisible" :title="修改密码" width="500px" @close="cancel">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="88px">
        <el-form-item label="新密码" prop="new_password1">
          <el-input
            v-model="form.new_password1"
            type="password"
            auto-complete="on"
            style="width: 370px"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="new_password2">
          <el-input
            v-model="form.new_password2"
            type="password"
            auto-complete="on"
            style="width: 370px"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="text" @click="cancel">取消</el-button>
          <el-button :loading="loading" type="primary" @click="onSubmit">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { updatePasswd } from '../../../../../../api/user'
export default {
  name: 'password',
  props: {
    rowId: {
      type: Number,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  data() {
    const confirmPass = (rule, value, callback) => {
      if ((this as any).form.new_password1 !== value) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      dialogVisible: false,
      form: {
        new_password1: '',
        new_password2: ''
      },
      rules: {
        new_password1: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        new_password2: [{ required: true, validator: confirmPass, trigger: 'blur' }]
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    cancel() {
      this.resetForm()
    },
    async onSubmit() {
      await (this.$refs.form as any).validate()
      this.loading = true
      updatePasswd(this.rowId, this.form)
        .then((res) => {
          this.resetForm();
          (this as any).$message({
            showClose: true,
            type: 'success',
            message: '密码修改成功!请重新登录!',
            duration: 2500
          })
          (this as any).$parent.$parent.loadUsers();
        })
        .catch((err) => {
          this.loading = false;
        })
    },
    resetForm() {
      (this as any).dialog = false;
      (this as any).$refs.form.resetFields()
      this.form = { new_password1: '', new_password2: '' }
    }
  }
}
</script>
<style scoped></style>
