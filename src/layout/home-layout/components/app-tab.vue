<!-- -->
<template>
  <div class="app-tab">
    <p class="logo">
      <img :src="headerLogo" alt="" />
    </p>
    <ul class="tabLink">
      <li>
        <router-link :to="{ name: 'home' }">
          <span>首页</span>
        </router-link>
      </li>
      <!-- <li>专题</li> -->
      <li>
         <router-link :to="{ name: 'help' }">
          <span>帮助</span>
        </router-link>  
      </li>
    </ul>
    <div class="userManger">
      <router-link :to="{ name: 'cart' }">
        <el-dropdown style="color: #fff">
          <span class="el-dropdown-link"><i class="el-icon-shopping-cart-2"></i> 购物车 </span>
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
      <router-link
        :to="{ name: 'orders' }"
        active-class=""
        exact-active-class=""
        class="userMe"
        @click.native="handleReset('orders')"
      >
        <el-avatar size="small" :src="`${$url}` + image" class="userImg"></el-avatar>
        <el-dropdown style="color: #fff">
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
    </div>
  </div>
</template>

<script>
import logo from '@/assets/images/header-logo.png'
import { mapGetters } from 'vuex'
export default {
   name: 'app-tab',
  computed: {
    ...mapGetters(['id', 'username', 'email', 'image', 'cartList'])
  },
  inject: ['$url'],
  data() {
    return {
      headerLogo:logo,
      filterParams:{
        text: '',
      }
    }
  },
  created() {
    this.loadUserInfo()
    this.loadCartInfo()
    this.loadCartProject()
    this.loadCartBuyer()
  },
  mounted() {},
  methods:{
    onSearch(){
     
      this.$router.push({name:'search',query:{text:this.filterParams.text}})
    },
    handleReset(name){
      this.$store.dispatch('GetActiveNav',name);
      this.$store.dispatch('GetActiveOpen',[name]);
    },
    async loadUserInfo() {
      this.$store.dispatch('GetUserInfo').then(() => {})
    },
    async loadCartInfo() {
      this.$store.dispatch('GetCart').then(() => {})
    },
    async loadCartProject() {
      this.$store.dispatch('GetProject').then(() => {})
    },
    async loadCartBuyer() {
      this.$store.dispatch('GetBuyer').then(() => {})
    },
    onLoginOut() {
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('LogOut').then(() => {
            this.$router.push('/login')
          })
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
}
</script>
<style scoped>
.app-tab {
  padding: 20px 60px;
  background: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  font-size: 18px;
}
.logo {
  width: 162px;
  height: 60px;
}
.logo img{
  width: 100%;
  height: 100%;
}
.tabLink {
  position: absolute;
  left: 300px;
  color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.tabLink li {
  float: left;
  margin-right: 60px;
  color: #fff;
}
.tabLink li a{
  color: #fff;
}
.tabLink li a:hover{
  color:#3e93ec;
}

.router-link-active {
  color: #fff;
}
.router-link-exact-active .el-dropdown{
  color:#0081CC;
}
.userManger {
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.el-dropdown{
  color: #fff;
}
.userImg {
  margin-right: 5px;
}
.userMe {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  
}
.count {
  display: inline-block;
  margin-left: 10px;
}
.el-dropdown-link{
  font-size: 18px;
}
.el-dropdown-link:hover{
  color:#3e93ec;
}
</style>
