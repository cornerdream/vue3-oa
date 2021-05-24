<template>
  <div class="alloce-menu">
    <el-card>
      <div slot="header" class="header">
        <span>菜单分配--{{ row_data.name }}</span>
        <el-button
          :loading="Loading"
          icon="el-icon-check"
          size="mini"
          type="success"
          style="float: right; padding: 4px 8px"
          @click="onSave"
          >保存</el-button
        >
      </div>
      <el-tree
        ref="menu"
        :data="menuList"
        :props="defaultProps"
        :default-checked-keys="menuIds"
        :default-expanded-keys="menuIds"
        check-strictly
        show-checkbox
        accordion
        node-key="id"
        highlight-current
      >
      </el-tree>
      <!-- <el-tree
        ref="menu-tree"
        :data="menus"
        node-key="id"
        :props="defaultProps"
        :default-checked-keys="checkedKeys"
        show-checkbox
        default-expand-all
      ></el-tree> -->
      <!-- <div style="text-align: center">
        <el-button @click="resetChecked">清空</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div> -->
    </el-card>
  </div>
</template>

<script lang="ts">
import { save, retrieve } from '../../../../../../api/role'
import { ElTree } from 'element-plus'
export default {
  name: 'alloce-menu',
  props: {
    row_data: {},
    menuList: [],
    menuIds: [],
    roleList: []
  },
  data() {
    return {
      Loading: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },

  async created() {},

  methods: {
    onSave(id) {
      this.Loading = true

      let form = { menus: this.$refs.menu.getCheckedKeys() }
      save(this.row_data.id, form)
        .then((res) => {
          this.$message({
            showClose: true,
            type: 'success',
            message: '保存成功!',
            duration: 2500
          })
          this.Loading = false
          this.update(this.row_data.id)
        })
        .catch((err) => {
          this.Loading = false
          console.log(err)
        })
    },
    update(id) {
      // 刷新选中行数据
      retrieve(id).then((res) => {
        for (let i = 0; i < this.roleList.length; i++) {
          if (res.data.data.id === this.roleList[i].id) {
            this.roleList[i] = res.data.data
            break
          }
        }
      })
    },
    resetChecked() {
      ;(this.$refs['menu'] as ElTree).setCheckedKeys([])
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
