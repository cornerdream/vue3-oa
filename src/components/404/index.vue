<template>
    <div class="noData">
        <section class="result">
            <el-result title="404" subTitle="抱歉，请求没有数据">
                <template #icon>
                <el-image :src="defaultImage" class="result-image"></el-image>
                </template>
                <template #extra>
                <el-button type="primary" size="medium" @click="onBack">返回</el-button>
                </template>
            </el-result>
        </section>
    </div>
</template>
<script>
import defaultImg from '@/assets/images/mouse.png'
export default {
    name: 'list',
    data() {
        return {
            defaultImage: defaultImg,
         }
    },
    methods:{
        onBack(){
            this.$router.back();
        }
    }         
}
</script>
<style scoped>
.result {
  max-height: 500px;
  max-width: 500px;
  margin: 0 auto;
}
</style>
