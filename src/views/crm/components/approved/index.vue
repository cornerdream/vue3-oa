<!--待我审批 rengaoli 2021/5/18 -->
<template>
  <div class="approved">
    <div class="appcontent">
      <h4>待我审批</h4>
      <ul class="app-ul">
        <li>
          <span>提交时间</span>
          <el-select size="mini" v-model="search" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </li>
        <li>
          <span>申请类型</span>
          <el-select size="mini" v-model="ordering" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </li>
        <li>
          <span>申请人</span>
          <el-select size="mini" v-model="page" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </li>
        <li>
          <span>详细筛选</span>
          <el-select size="mini" v-model="size" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </li>
        <li>
          <span>是否已完成</span>
          <el-select size="mini" v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </li>
      </ul>
      <div
        class="app-list"
        v-for="(item, index) in arrlist"
        :key="index"
        @click="detail(item)"
      >
        <div class="user">
          <div class="block">
            <el-avatar :size="50" :src="item.user_id.image"></el-avatar>
          </div>
        </div>
        <div class="list-cont">
          <ul>
            <li>
              <span>{{ item.req_id.name }}</span
              ><span :class="[item.state == '1' ? 'flag' : 'code']">{{
                item.state[1]
              }}</span>
            </li>
            <li>
              <span>申请人</span>：<span>{{ item.user_id.name }}</span>
            </li>
            <li>
              <span>申请时间</span>：<span>{{ item.approve_date }}</span>
            </li>
            <li>
              <span>当前审批人</span>：<span>{{ item.name }}</span>
            </li>
            <li>
              <span>备注</span>：<span>{{ item.message }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="apprconte">
      <div class="content" v-if="show">
        <h4>{{ mag }}</h4>
        <div class="app-box">
          <div class="app-lists">
            <div class="user">
              <div class="block">
                <el-avatar class="avatar" :size="50"> user </el-avatar>
              </div>
            </div>
            <div class="list-cont">
              <ul>
                <li><span>BT2019071709595082</span></li>
              </ul>
            </div>
          </div>
          <div class="app-lists">
            <div class="user">
              <div class="block">
                <el-avatar
                  :size="50"
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                ></el-avatar>
              </div>
            </div>
            <div class="list-cont">
              <ul>
                <li><span>申请人</span>：<span>小米</span></li>
                <li><span>申请部门</span>：<span>生物信息</span></li>
                <li><span>申请时间</span>：<span>2021-05-12</span></li>
              </ul>
            </div>
          </div>
          <div class="app-listss">
            <div class="list-cont">
              <ul>
                <li><span>申请人</span>：<span>小米</span></li>
                <li><span>申请部门</span>：<span>生物信息</span></li>
                <li><span>申请时间</span>：<span>2021-05-12</span></li>
              </ul>
            </div>
          </div>
          <div class="app-argent">
            <div class="header">
              <h4>审批详情</h4>
              <div class="list-cont">
                <ul>
                  <li><span>待审批</span>：<span>小米</span></li>
                  <li><span>审批人</span>：<span>生物信息</span></li>
                </ul>
              </div>
            </div>
            <div class="text">
              <p>审批建议：</p>
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="apply_comment"
              >
              </el-input>
              <div class="app-btn">
                <el-button type="success" size="mini" @click="agree"
                  >同意</el-button
                >
                <el-button type="danger" size="mini" @click="refuse"
                  >拒绝</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { sworkflowtask, worflowre,approve } from "../../../../api/approval";
export default {
  name: "personal",
  data() {
    return {
      is_approve:'', //同意拒绝
      task_id :'1',//任务id
      apply_comment:'', // 审批意见
      search: "火狐",
      ordering: "33",
      page: "1",
      size: "10",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      arrlist: [],
      show: false,
      mag: "补卡申请单",
    };
  },
  created() {
    this.swork();
  },
  mounted() {},
  methods: {
    async swork() {
      await sworkflowtask(
        this.search,
        this.ordering,
        this.page,
        this.size
      ).then((res) => {
        this.arrlist = res.data.data.results;
        this.is_approve  = res.data.data.results[0].is_approved
        console.log(res.data.data.results[0].is_approved, "审批数据");
      });
    },
    async detail(item: any) {
      let type_id = item.type_id.id;
      let req_id = item.req_id.id;
      console.log(item.req_id.id,item);
      const { data } = await worflowre(type_id, req_id);
      console.log(data.data, "data");
      this.show = true;
    },
   async agree() {
     let obj = {
       is_approve: this.is_approve ,
       task_id : this.task_id ,
       apply_comment: this.apply_comment
     }
     if( obj.apply_comment!=='' ){
await approve(obj).then((res)=>{
              console.log(res,'统一数据')
     })
     }
     
      // this.show =false
    console.log(this.apply_comment)

    },
    refuse() {
      // this.show =false
    },
  },
};
</script>
<style scopted>
.approved {
  width: 100%;
  display: flex;
  text-align: center;
  box-sizing: border-box;
}
.appcontent {
  flex: 1;
  height: 848px;
  background: lemonchiffon;
}
.appcontent h4 {
  text-align: center;
  font-size: 24px;
  font-weight: 400;
}
.app-ul {
  display: flex;
  justify-content: space-around;
  margin: 20px;
}
.app-ul li {
  flex: 1;
  width: 100px;
  padding: 5px;
}
.app-list {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.user {
  width: 70px;
}
.list-cont {
  width: 500px;
  text-align: left;
}
.list-cont ul li span:nth-child(1) {
  display: inline-block;
  text-align-last: justify;
}
.block {
  margin-top: 10px;
}
.block img{
  width: 100%;
  height: 100%;
}
.flag {
  margin-left: 30px;
  width: 100px;
  display: inline-block;
  text-align: center;
  border-radius: 10px;
  color: #fff;
  background: cornflowerblue;
}
.code {
  margin-left: 30px;
  width: 100px;
  display: inline-block;
  text-align: center;
  border-radius: 10px;
  color: #fff;
  background: chocolate;
}
.apprconte {
  flex: 3;
  text-align: left;
}
.app-box {
  margin: 20px;
}
.content h4 {
  text-align: center;
  font-size: 24px;
  font-weight: 400;
}
.app-lists {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.app-listss {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.app-argent {
  margin: 10px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.app-argent .header {
  width: 400px;
  height: 100px;
  border: 1px solid #ccc;
}
.app-argent .header h4 {
  font-size: 16px;
}
.app-argent .header .list-cont {
  padding: 20px;
}
.app-argent .text {
  width: 300px;
  margin-top: 10px;
}
.app-argent .app-btn {
  margin-top: 10px;
}
</style>