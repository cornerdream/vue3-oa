<!-- -->
<template>
  <div class="consumerList">
    <el-table :data="userList" height="650" style="width: 100%">
      <el-table-column prop="image" label="头像" width="80">
        <template #default="scope">
          <el-avatar size="small" :src="scope.row.image"></el-avatar>
          <!-- <img :src="scope.row.image" alt="" min-width="70" height="70">          -->
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="80"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="80"> </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
      <el-table-column prop="mobile" label="手机号" width="180"> </el-table-column>
      <el-table-column prop="department.name" label="部门" width="180"> </el-table-column>
      <el-table-column prop="position" label="职位" width="80"> </el-table-column>
      <el-table-column prop="is_active" label="状态" width="80"> </el-table-column>
      <el-table-column label="操作" fixed="right" width="100">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" @click="handleEditPassword(scope.row)">密码</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next"
      :total="400">
    </el-pagination> -->
    <createOrEdit
      ref="form"
      :select="selectOption"
      :menus="userList"
      :roles="roles"
      :organizations="organizations"
      :orgusers="orgusers"
      :is-add="false"
      :row-id="userId"
    />
    <password ref="passwordForm" :row-id="userId" :sup_this="sup_this" />
  </div>
</template>

<script>
import createOrEdit from './createOrEdit.vue'
import password from './password.vue'
import { del } from '@/api/user'
export default {
  name: 'consumerList',
  components: {
    createOrEdit,
    password
  },
  props:['select','userList','roles','organizations','orgusers'],
  data() {
    return {
      userId: 0,
      selectOption:''
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleEdit(item) {  
      let did = []
      if(item.department !== null){
        did=item.department.id
      }
      this.selectOption =item.department?item.department.name:'';
      let uid = null
      if (item.superior !== null) {
        uid = item.superior.id
      }
      let rid = []
      if (item.roles.length !== 0) {
        item.roles.forEach((element) => {
          rid.push(element.id)
        })
      }
      const _this = this.$refs.form;
      _this.form = {
        name: item.name,
        username: item.username,
        id: item.id,
        image: item.image,
        mobile: item.mobile,
        department: did,
        superior: uid,
        position: item.position,
        email: item.email,
        is_active: item.is_active.toString(),
        roles: rid
      }
      this.userId = item.id;
      this.$refs.form.dialogVisible = true
    },
    handleEditPassword(item) {
      this.userId = item.id;
      this.$refs.passwordForm.dialogVisible = true
    },
    handleDelete(item) {
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(async () => {
          const { data } = await del(item.id);
          this.$message.success('删除成功')
          this.$emit('initList') // 更新数据列表
        })
        .catch((err) => {
          this.$message.info('已取消删除')
        })
    }
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    // }
  }
}
</script>
<style scoped>
.consumerList .el-table {
  margin: 10px 0;
}
.cell .el-button {
  margin: 2px;
}
</style>
