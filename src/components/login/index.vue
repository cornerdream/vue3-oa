<!-- -->
<template>
  <div class="login">
    <el-form
      class="login-form"
      label-position="top"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" :loading="isLoginLoading" @click="onLogin"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
export default {
  name: 'login',
  data() {
    return {
      form: {
        username: 'admin',
        password: '1'
      },
      rules: {
        phone: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /./, message: '请输入正确的用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 18, message: '长度在 1 到 18 个字符', trigger: 'blur' }
        ]
      },
      isLoginLoading: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    async onLogin() {
      try {
        await (this.$refs.form as any).validate();
        this.isLoginLoading = true;
        (this as any).$store
          .dispatch('Login', this.form)
          .then(() => {
            this.isLoginLoading = false;
            this.$router.push((this.$route.query.redirect as string) || '/');
          })
          .catch(() => {
            this.isLoginLoading = false;
          })
      } catch (error) {
        console.log(error);
      }
      this.isLoginLoading = false;
    }
  }
}
</script>
<style scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  width: 300px;
  background: #fff;
  padding: 20px;
  border-radius: 5px;
}
.login-btn {
  width: 100%;
}
</style>
