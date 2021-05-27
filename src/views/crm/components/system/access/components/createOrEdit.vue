<!-- -->
<template>
  <div class="createOrEdit">
    <el-dialog v-model="dialogVisible" :title="isAdd ? '新增组织' : '编辑组织'" width="600px">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" style="width: 360px" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" style="width: 360px" placeholder="请选择组织类型">
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item style="margin-bottom: 0px" label="父级组织">
          <el-cascader
            :options="access"
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
import { add, edit } from '../../../../../../api/permission'

export default {
  name: 'createOrEdit',
  props: {
    menus: {
      type: Array,
      required: true
    },
    access: {
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
      loading: false,
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      form: {
        name: '',
        type: '',
        pid: null
      },
      types: [
        { value: 'company', label: '公司' },
        { value: 'department', label: '部门' }
      ],
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
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
      await (this.$refs.form as any).validate();
      this.loading = true;
      if (this.isAdd) {
        this.onAdd();
      } else {
        this.onEdit();
      }
    },
    onAdd() {
      add(this.form)
        .then((res) => {
          this.resetForm();
          (this as any).$message({
            showClose: true,
            type: 'success',
            message: '添加成功!',
            duration: 2500
          })
          this.loading = false
          this.sup_this.loadAccess();
        })
        .catch((err) => {
          this.loading = false;
        })
    },
    onEdit() {
      edit(this.rowId, this.form)
        .then((res) => {
          this.resetForm();
          (this as any).$message({
            showClose: true,
            type: 'success',
            message: '修改成功!',
            duration: 2500
          })
          this.loading = false;
          (this as any).$parent.$parent.loadAccess();
        })
        .catch((err) => {
          this.loading = false;
        })
    },
    resetForm() {
      this.dialogVisible = false;
      (this as any).$refs.form.resetFields()
      this.form = { name: '', type: '', pid: null }
    },
    selected(name:any) {
      (this.form as any).icon = name;
    }
  }
}
</script>
<style scoped></style>
