<template>
  <div class="roleList">
    <el-row :gutter="28">
      <el-col :span="span">
        <el-table
          v-loading="loading"
          :data="roleList"
          size="small"
          border
          height="650"
          style="width: 100%"
          highlight-current-row="true"
          row-key="roleId"
          @current-change="handleCurrentChange"
        >
          <el-table-column label="序号" width="60" align="center">
            <template v-slot="scope">
              <div>{{ scope.$index + 1 }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称" />
          <el-table-column v-if="table_show" prop="desc" label="描述" />
          <el-table-column label="操作" fixed="right" align="center" width="150px">
            <template #default="scope">
              <div>
                <el-button type="text" @click.stop="handleEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="text" @click.stop="handleDelete(scope.row)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <!-- <el-pagination
                :total="total"
                style="margin-top: 8px;"
                layout="total, prev, pager, next, sizes"
                @size-change="sizeChange"
                @current-change="pageChange"/> -->
      </el-col>
      <el-col :span="8">
        <alloce-access
          ref="permissions"
          v-if="show"
          :roleList="roleList"
          :row_data="row_data"
          :permissionList="permissionList"
          :permissionIds="permissionIds"
        />
        <!-- <alloceMenu v-if="show"/> -->
      </el-col>
      <el-col :span="8">
        <alloce-menu
          ref="menus"
          v-if="show"
          :roleList="roleList"
          :row_data="row_data"
          :menuList="menuList"
          :menuIds="menuIds"
        />
        <!-- <alloceAccess v-if="show"/> -->
      </el-col>
    </el-row>
    <createOrEdit ref="form" :roles="roleList" :is-add="false" :row-id="roleId" />
  </div>
</template>

<script>
import createOrEdit from './createOrEdit.vue'
import alloceMenu from '../components/alloce-menu.vue'
import alloceAccess from '../components/alloce-access.vue'
import { getMenuTree } from '@/api/menu'
import { getPermissionTree } from '@/api/permission'
import { del } from '../../../../../../api/role'

export default {
  name: 'roleList',
  props: {
    roleList: [],
    total: 0,
    query: {}
  },
  components: {
    createOrEdit,
    alloceMenu,
    alloceAccess
  },
  data() {
    return {
      span: 24,
      roleId: 0,
      currentNum:0,
      table_show: true,
      show: false,
      row_data: null,
      permissionList: [],
      menuList: [],
      permissionIds: [],
      menuIds: []
    }
  },
  created() {
    this.$nextTick(() => {
      this.getPermissions()
      this.getMenus()
    })
  },
  methods: {
    handleCurrentChange(item) {
      this.currentNum++;
      const flag = Number(this.currentNum)%2==0;
      // if(flag){
      //   this.span=24;

      // }else{
      //   this.sapn = 8;
      // }
      if (item.id !== 1) {
        if (this.show) {
          // 清空选中状态
          this.$refs.permissions.resetChecked()
          this.$refs.menus.resetChecked()
        }
        this.span = 8
        ;(this.table_show = false), (this.show = true)
        this.row_data = item
        console.log(this.row_data)
        if (this.row_data) {
          this.permissionIds = this.row_data.permissions
          this.menuIds = this.row_data.menus
        }
      } else {
        this.$message({
          showClose: true,
          type: 'error',
          message: '默认管理员不可修改!',
          duration: 2500
        })
      }
    },
    handleEdit(item) {
      console.log('编辑')
      console.log(item)
      const _this = this.$refs.form
      _this.form = {
        name: item.name,
        desc: item.desc
      }
      console.log(item.id)
      console.log(this.$refs.form)
      this.roleId = item.id
      this.$refs.form.dialogVisible = true
    },

    async handleDelete(item) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => {
          // 确认执行这里
          // 请求删除操作
          const { data } = await del(item.id)
          console.log(data)
          this.$message.success('删除成功')
          this.span = 24
          ;(this.table_show = true), (this.show = false)
          this.$emit('initList') // 更新数据列表
        })
        .catch((err) => {
          // 取消执行这里
          console.log(err)
          this.$message.info('已取消删除')
        })
    },

    getMenus() {
      if (Array.isArray(this.menuList) && this.menuList.length === 0) {
        getMenuTree().then((res) => {
          console.log(res)
          this.menuList = res.data.data.results
        })
      }
    },
    getPermissions() {
      if (Array.isArray(this.permissionList) && this.permissionList.length === 0) {
        getPermissionTree().then((res) => {
          console.log(res)
          this.permissionList = res.data.data.results
        })
      }
    }
  }
}
</script>

<style scoped>
.roleList {
  margin: 10px 0;
}
.cell .el-button {
  margin: 2px;
}
</style>
