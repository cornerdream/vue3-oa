<template>
  <div>
    <textarea :id="id" name="content"></textarea>
  </div>
</template>
<script>
export default {
  props: ['content'], //从父组件转递的内容
  mounted: function () {
    const self = this
    // 渲染编辑器
    self.ckeditor = window.CKEDITOR.replace('content', { height: '280px' }) //定义编辑器的高度
    // 设置初始内容
    self.ckeditor.setData(self.content)

    // 监听内容变更事件
    self.ckeditor.on('change', function () {
      self.$emit('sendContnet', self.ckeditor.getData())
    })
  },
  data: function () {
    return {
      id: parseInt(Math.random() * 10000).toString(),
      ckeditor: null
    }
  },
  watch: {
    // 监听prop的变化，更新ckeditor中的值
    content: function () {
      if (this.content !== this.ckeditor.getData()) {
        this.ckeditor.setData(this.content)
      }
    }
  }
}
</script>
<style scoped>
</style>