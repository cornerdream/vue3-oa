<!-- -->
<template>
  <div class="app-top">
    <div class="helloMsg">您好，欢迎来到YICONMED商城</div>
    <div class="userManger">
      <router-link :to="{ name: 'me' }" active-class="" exact-active-class="" class="userMe">
        <el-avatar size="small" :src="image" class="userImg"></el-avatar>
        <el-dropdown>
          <span class="el-dropdown-link">
            个人中心<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="el-icon-plus">{{ username }}</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus" @click.native="onLoginOut"
                >退出</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </router-link>
      <router-link :to="{ name: 'cart' }">
        <el-dropdown>
          <span class="el-dropdown-link"> 购物车<i class="el-icon-shopping-cart-2"></i> </span>
          <template #dropdown>
            <el-dropdown-menu max-height="200">
              <el-dropdown-item v-show="cartList.length == 0">购物车空空，快添加~</el-dropdown-item>
              <el-dropdown-item v-for="item in cartList" :key="item" v-show="cartList.length > 0">
                {{ item.name }}
                <span class="count">{{ item.count }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
export default {
  name: 'app-top',
  computed: {
    ...mapGetters(['id', 'username', 'email', 'image', 'cartList'])
  },
  data() {
    return {}
  },
  created() {
    this.loadUserInfo()
    this.loadCartInfo()
    this.loadCartProject()
    this.loadCartBuyer()
  },
  mounted() {},
  methods: {
    async loadUserInfo() {
      (this as any).$store.dispatch('GetUserInfo').then(() => {})
    },
    async loadCartInfo() {
      (this as any).$store.dispatch('GetCart').then(() => {})
    },
    async loadCartProject() {
      (this as any).$store.dispatch('GetProject').then(() => {})
    },
    async loadCartBuyer() {
      (this as any).$store.dispatch('GetBuyer').then(() => {})
    },
    onLoginOut() {
      (this as any).$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          (this as any).$store.dispatch('LogOut').then(() => {
            this.$router.push('/login')
          })
          (this as any).$message({
            type: 'success',
            message: '退出成功!'
          })
        })
        .catch(() => {
          (this as any).$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
}
</script>
<style scoped>
.app-top {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userManger {
  display: flex;
  justify-content: center;
  align-items: center;
}

a.active {
  color: rgba(235, 14, 14, 0.384);
}
.userImg {
  margin-right: 5px;
}
.userMe {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}
.count {
  display: inline-block;
  margin-left: 10px;
}
</style>
