<!-- -->
<template>
  <div class="cate">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" @click="show = !show">全部商品分类</el-menu-item>
      <el-menu-item index="2"><a href="#" target="_blank">手机</a></el-menu-item>
      <el-menu-item index="3"><a href="#" target="_blank">消息中心</a></el-menu-item>
      <el-menu-item index="4"><a href="#" target="_blank">订单管理</a></el-menu-item>
    </el-menu>
    <div class="el-menu-content" v-if="show">
      <transition name="el-fade-in-linear">
        <el-tabs :tab-position="tabPosition" ref="navTabs" class="cate-el-tabs">
          <el-tab-pane v-for="item in options" :key="item">
            <template #label>
              <span
                v-for="o in item.channels"
                :key="o"
                @click="onClick(o.id)"
                style="padding: 5px"
                >{{ o.name }}</span
              >
            </template>

            <div class="transition-box" v-for="sub in item.sub_cats" :key="sub">
              <p class="item" @click="onClick(sub.id)">
                {{ sub.name }}
                <span v-if="sub.child"
                  >>
                  <span v-for="c in sub.child" :key="c" @click="onClick(c.id)" style="padding: 5px">
                    {{ c.name }}</span
                  ></span
                >
              </p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import { getProductTree } from '../../../../api/product'
export default {
  name: 'tab',
  computed: {
    ...mapGetters(['options'])
  },
  props: {
    menu: []
  },
  data() {
    return {
      activeIndex: 1,
      tabPosition: 'left',
      show: false
    }
  },
  created() {
    this.loadProduct()
  },
  mounted() {},
  methods: {
    async loadProduct() {
      this.show = false
    }
  }
}
</script>
<style scoped>
.cate .el-dropdown-menu__item,
.cate .el-menu-item {
  padding: 0 40px;
}
.cate-el-tabs {
  height: 100%;
}
.cate-el-tabs .el-tabs__content {
  height: 100%;
  background-color: #409eff;
  text-align: left;
  color: #fff;
}
.cate-el-tabs .item {
  padding: 0 20px;
  height: 40px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 40px;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  cursor: pointer;
}
</style>
