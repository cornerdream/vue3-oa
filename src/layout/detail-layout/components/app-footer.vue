<!-- -->
<template>
  <div class="footer">
    <div class="footer-left">
      <div class="footer-left-top">
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
      </div>
      <div class="footer-left-bottom">
        <div class="footer-left-top-left">
          <ul class="footer-right-left-bottom">
            <li>电话：+86(10)6786-4680</li>
            <li>邮箱:HR@yiconmed.com</li>
            <li>网址：www.yiconmed.com</li>
          </ul>
        </div>
        <div class="footer-left-top-right">
          <ul class="footer-right-left-bottom">
            <li>地址：北京经济技术开发区隆庆街9号1号楼</li>
            <li>邮编：100176</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-right">
      <div class="footer-right-right">
        <div class="footer-right-right-top">
          <img :src="footerRight" alt="" />
        </div>
        <div class="footer-right-right-bootom">扫一扫，关注我们</div>
      </div>
    </div>
  </div>
</template>
<script>
import footerLeftLogo from '@/assets/images/footer-logo.png'
import footerRightLogo from '@/assets/images/footer-logo1.png'
export default {
  name: 'footer',
  data() {
    return {
      footerLeft: footerLeftLogo,
      footerRight: footerRightLogo
    }
  },
  created() {},
  mounted() {}
}
</script>
<style scoped>
.footer {
  padding: 20px 60px;
  background: #0d2140;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-left {
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start;
    align-items: center; */
}
.footer-left-top {
  padding: 5px 0;
}
.footer-left-top .tabLink li:first-child {
  padding-left: 0;
}
.footer-left-bottom {
  width: 692px;
  border-top: 1px solid #fff;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tabLink {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.tabLink li {
  padding: 0 20px;
  border-right: 1px solid #fff;
}
.tabLink li:last-child {
  border-right: 0;
}
.tabLink a {
  color: #fff;
}
.footer-right {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.footer-right-left {
  margin: 0 60px;
}
.footer-right-left-top {
  margin-bottom: 20px;
}
.footer-right-left-bottom li {
  margin-bottom: 5px;
}
.footer-right-right {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
