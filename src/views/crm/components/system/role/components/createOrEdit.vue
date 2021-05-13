<!-- -->
<template>
<div class="createOrEdit">
  <el-dialog v-model="dialogVisible" :title="isAdd ? '新增角色' : '编辑角色'" width="600px">  
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.desc" style="width: 370px;" rows="5" type="textarea"/>
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
import { add, edit } from '../../../../../../api/role'
export default {
      name:"CreateOrEdit",
      props: {
        roles: {
          type: Array,
          required: true
        },
        isAdd: {
          type: Boolean,
          required: true
        },
        rowId:{
          type:Number,
          required:true
        },
        sup_this: {
          type: Object,
          default: null
        }
      },
      data(){
        return {
          loading: false, 
          dialogVisible: false,
          form: {             
            name: '', 
            desc:''
          },
          rules: {          
            name: [
              { required: true, message: '请输入名称', trigger: 'blur' }
            ]
          }
        }
      },
      created(){
        
      },
      mounted(){

      },
      methods:{
        cancel() {
          this.resetForm()
        },
        async onSubmit() {
          await (this.$refs.form as any).validate();
        
          this.loading = true;
          console.log(this.isAdd);
          if (this.isAdd) {
            console.log('add');
            this.onAdd();
            
          } else {
            console.log('edit');
            this.onEdit();
            
          }
          
        },
        onAdd() {
          console.log(this.form);
          add(this.form).then(res => {
            console.log(res);
            this.resetForm()
            this.$message({
              showClose: true,
              type: 'success',
              message: '添加成功!',
              duration: 2500
            })
            this.loading = false         
            this.sup_this.loadRoles();  
            
          }).catch(err => {
            this.loading = false
            console.log(err)
          })
        },
        onEdit() {        
          console.log(this.rowId);
          edit(this.rowId,this.form).then(res => {
            this.resetForm()
            this.$message({
              showClose: true,
              type: 'success',
              message: '修改成功!',
              duration: 2500
            })
            this.loading = false         
            this.$parent.$parent.loadRoles();          
            
          }).catch(err => {
            this.loading = false
            console.log(err)
          })
        },
        resetForm() {
          this.dialogVisible = false
          this.$refs.form.resetFields()
          this.form = { name: '', sort: 999, path: '', component: '', is_show: 'true', is_frame: 'false', pid: null, icon: '' }
        },
      }
}
</script>
<style scopted>

</style>