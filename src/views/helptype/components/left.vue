<template>
  <div class="box">
    <ul class="box-ul">
      <li v-for="(item, index) in list" :key="index">
        <p @click="showToggle(item, index)">
          <span>{{ item.name }}</span
          ><i
            class="list-i"
            :class="item.index == 0 ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
          ></i>
        </p>
        <ul class="box-li" v-show="index == indexs ? !item.isSubShow : item.isSubShow">
          <li v-for="(subItem, index) in item.lines" :key="index">
            <p :class="subItem.id == num ? 'active' : ''" @click="showToggles(subItem)">
              {{ subItem.name }}
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <breadcrumbNav class="el-breadcrumb" :currentPath="indexBreadcrumbs">
      <div class="listBox"></div>
    </breadcrumbNav>
  </div>
</template>

<script>
import { getHelptype, getHelpdoc } from '../../../api/help'
import breadcrumbNav from './breadcrumb.vue'
import $ from 'jquery'
export default {
  components: { breadcrumbNav },
  data() {
    return {
      list: [],
      num: 1,
      indexs: 0,
      indexBreadcrumbs: [],
      name: '',
      listBox: {}
    }
  },
  created() {},
  mounted() {
    getHelptype().then((res) => {
      this.list = res.data.data
    })
    if (this.indexBreadcrumbs.length == 0) {
      this.indexBreadcrumbs = ['购物指南', '购物流程']
      this.getDoc(1)
    }
  },
  methods: {
    showToggle: function (item, index) {
      this.indexs = index
      if (this.indexs == index) {
        item.isSubShow = false
        this.name = item.name
      }
    },
    showToggles: function (subItem) {
      this.num = subItem.id
      if (!isNaN(this.name)) {
        this.indexBreadcrumbs = ['购物指南', subItem.name]
      } else {
        this.indexBreadcrumbs = [this.name, subItem.name]
      }
      this.getDoc(subItem.id)
    },
    getDoc(subItem) {
      getHelpdoc(subItem).then((res) => {
        this.listBox = res.data.data
        this.loadhtml()
      })
    },
    loadhtml() {
      $(document).off()
      $('.el-tabs__content').show()
      $('.listBox').html('')
      $('.listBox').html(this.listBox)
    }
  }
}
</script>

<style  scoped>
.box {
  display: flex;
}
.box-ul {
  width: 240px;
  background: #303133;
  color: #fff;
  min-height: 800px;
  font-size: 14px;
  padding: 20px;
  cursor: pointer;
}
.box-ul > li {
  line-height: 30px;
}
.active {
  color: #3e93ec;
}
.list-i {
  margin-left: 98px;
  text-align: right;
}
span {
  display: inline-block;
  width: 88px;
}
.box-li {
  margin-left: 20px;
}
.el-breadcrumb {
  flex: 3;
}
</style>