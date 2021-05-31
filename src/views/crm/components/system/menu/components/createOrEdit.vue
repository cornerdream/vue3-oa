<!-- -->
<template>
  <div class="createOrEdit">
    <el-dialog v-model="dialogVisible" :title="isAdd ? '新增菜单' : '编辑菜单'" width="600px">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
        <el-form-item label="是否显示" prop="is_show">
          <el-radio v-model="form.is_show" label="true">是</el-radio>
          <el-radio v-model="form.is_show" label="false">否</el-radio>
        </el-form-item>
        <el-form-item v-if="form.is_show === 'true'" label="菜单图标" prop="icon">
          <el-select v-model="form.icon" placeholder="请选择" ref="iconSelect">
            <el-option
              v-for="item in iconList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name" placeholder="名称" style="width: 460px" />
        </el-form-item>
        <el-form-item label="菜单排序" prop="sort">
          <el-input v-model.number="form.sort" placeholder="序号越小越靠前" style="width: 460px" />
        </el-form-item>
        <el-form-item label="内部菜单" prop="is_frame">
          <el-radio v-model="form.is_frame" label="false">是</el-radio>
          <el-radio v-model="form.is_frame" label="true">否</el-radio>
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input v-model="form.path" placeholder="菜单路径" style="width: 460px" />
        </el-form-item>
        <el-form-item v-if="form.is_frame === 'false'" label="组件路径">
          <el-input v-model="form.component" placeholder="组件路径" style="width: 460px" />
        </el-form-item>
        <el-form-item label="父级菜单">
          <el-cascader
            v-model="form.pid"
            :options="menus"
            :props="defaultProps"
            :show-all-levels="false"
            style="width: 460px"
            placeholder="请选择父级菜单"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <template #footer class="dialog-footer">
        <el-button type="text" @click="cancel">取消</el-button>
        <el-button :loading="loading" type="primary" @click="onSubmit">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { add, edit } from '../../../../../../api/menu'

export default {
  name: 'createOrEdit',
  props: {
    menus: {
      type: Array,
      required: true
    },
    isAdd: {
      type: Boolean,
      required: true
    },
    rowId: {
      type: Number,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      defaultProps: {
        label: 'name',
        vaule: 'pid'
      },
      iconList: [
        {
          value: 'iconfont icon-zuzhi',
          label: 'iconfont icon-zuzhi'
        },
        {
          value: 'iconfont icon-user',
          label: 'iconfont icon-user'
        },
        {
          value: 'iconfont icon-permission',
          label: 'iconfont icon-permission'
        },
        {
          value: 'iconfont icon-role',
          label: 'iconfont icon-role'
        },
        {
          value: 'iconfont icon-order',
          label: 'iconfont icon-order'
        },
        {
          value: 'iconfont icon-config',
          label: 'iconfont icon-config'
        },
        {
          value: 'iconfont icon-cart',
          label: 'iconfont icon-cart'
        },
        {
          value: 'iconfont icon-caidan',
          label: 'iconfont icon-caidan'
        },
        {
          value: 'iconfont icon-system',
          label: 'iconfont icon-system'
        },
        {
          value: 'iconfont icon-me',
          label: 'iconfont icon-me'
        },
        {
          value: 'iconfont icon-caigou',
          label: 'iconfont icon-caigou'
        },
        {
          value: 'iconfont icon-shenpi',
          label: 'iconfont icon-shenpi'
        },
        {
          value: 'iconfont icon-cangku',
          label: 'iconfont icon-cangku'
        }
      ],
      loading: false,
      dialogVisible: false,
      form: {
        id: -1,
        name: '',
        sort: 999,
        path: '',
        component: '',
        is_show: 'true',
        is_frame: 'false',
        pid: 0,
        icon: ''
      },
      rules: {
        is_show: [{ required: true, message: '是否在导航栏显示', trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入序号', trigger: 'blur', type: 'number' }],
        is_frame: [{ required: true, message: '请选择菜单类型', trigger: 'blur' }]
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    cancel() {
      this.resetForm()
    },
    async onSubmit() {
      await (this.$refs.form as any).validate()

      this.loading = true
      console.log(this.isAdd)
      if (this.isAdd) {
        console.log('add')
        this.onAdd()
      } else {
        console.log('edit')
        this.onEdit()
      }
    },
    onAdd() {
      console.log(this.form)
      add(this.form)
        .then((res) => {
          console.log(res)
          this.resetForm()
          this.$message({
            showClose: true,
            type: 'success',
            message: '添加成功!',
            duration: 2500
          })
          this.loading = false
          this.sup_this.loadMenus()
          this.$store.dispatch('GetUserMenu').then(() => {})
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    onEdit() {
      console.log(this.rowId)
      console.log(this.form)
      edit(this.rowId, this.form)
        .then((res) => {
          this.resetForm()
          this.$message({
            showClose: true,
            type: 'success',
            message: '修改成功!',
            duration: 2500
          })
          this.loading = false
          this.$parent.$parent.loadMenus()
          this.$store.dispatch('GetUserMenu').then(() => {})
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    resetForm() {
      this.dialogVisible = false
      this.$refs.form.resetFields()
      this.form = {
        name: '',
        sort: 999,
        path: '',
        component: '',
        is_show: 'true',
        is_frame: 'false',
        pid: 0,
        icon: ''
      }
    }
  }
}
</script>
<style scoped></style>
