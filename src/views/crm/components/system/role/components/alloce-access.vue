<template>
  <div class="alloce-access">
    <el-card>
      <div slot="header" class="header">
        <span>权限分配-{{ row_data.name }}</span>
        <el-button
          :loading="Loading"
          icon="el-icon-check"
          size="mini"
          type="success"
          style="float: right; padding: 4px 8px"
          @click="onSave()"
          >保存</el-button
        >
      </div>
      <el-tree
        ref="access"
        :data="permissionList"
        node-key="id"
        :props="defaultProps"
        show-checkbox
        :default-checked-keys="permissionIds"
      ></el-tree>
      <!-- <div style="text-align: center">
        <el-button @click="resetChecked">清空</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div> -->
    </el-card>
  </div>
</template>

<script lang="ts">
import { save, retrieve } from '../../../../../../api/role'

export default {
  name: 'alloce-access',
  props: {
    row_data: {},
    permissionList: [],
    permissionIds: [],
    roleList: []
  },
  data() {
    return {
      Loading: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {},
  methods: {
    onSave(id:Number) {
      this.Loading = true;
      let form = { permissions: (this as any).$refs.access.getCheckedKeys() };
      save((this as any).row_data.id, form)
        .then((res) => {
          (this as any).$message({
            showClose: true,
            type: 'success',
            message: '保存成功!',
            duration: 2500
          });
          this.Loading = false;
          this.update((this as any).row_data.id)
        })
        .catch((err) => {
          this.Loading = false;
          console.log(err)
        })
    },
    update(id) {
      // 刷新选中行数据
      retrieve(id).then((res) => {
        for (let i = 0; i < (this as any).roleList.length; i++) {
          if (res.data.data.id === (this as any).roleList[i].id) {
            (this as any).roleList[i] = res.data.data
            break
          }
        }
      })
    },
    resetChecked() {
      (this.$refs['access'] as any).setCheckedKeys([]);
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
