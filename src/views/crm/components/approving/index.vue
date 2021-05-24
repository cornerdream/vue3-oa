<!--待我审批 rengaoli 2021/5/18 -->
<template>
  <div class="approving">
    <div class="appcontent">
      <h4>待我审批</h4>
      <!-- <ul class="app-ul">
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
      </ul> -->
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
              <span>单号</span> ：<span>{{ item.req_id.name }}</span>
              <span
                :class="[item.type_id.model == 'orderinfo' ? 'flag' : 'code']"
                >{{ item.type_id.name }}</span
              >
            </li>
            <li>
              <span>申请人</span>：<span>{{ item.user_id.name }}</span>
            </li>
            <li>
              <span>申请时间</span>：<span>{{ create_time }}</span>
            </li>
            <li>
              <span>部门</span>：<span> {{ item.department.name }}</span>
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
            <div class="list-policy">
              <ul>
                <li>
                  <span>单号</span> ：<span>{{ order.name }}</span>
                </li>
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
                <li>
                  <span>申请人</span>：<span>{{ order.create_uid.name }}</span>
                </li>
                <li>
                  <span>创建时间</span>：<span>{{ create_time }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="app-listss">
            <div class="list-conts">
              <p class="font">基础信息：</p>
              <div class="user-devep">
                <div>
                  <p>
                    <span>项目</span> ： <span>{{ order.project.name }}</span>
                  </p>
                  <p>
                    <span>供应商</span> ：<span>{{ order.supplier.name }}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span>部门</span> ：<span>{{ order.department.name }}</span>
                  </p>
                  <p><span>总价</span> ： <span>{{}}</span></p>
                </div>
              </div>
            </div>
          </div>
          <div class="app-listss">
            <div class="list-conts">
              <p class="font">物品信息：</p>
              <el-table
                :data="tableData"
                border
                style="width: 600px; text-align: center; margin: 10px"
              >
                <el-table-column prop="skuname" label="物品"> </el-table-column>
                <el-table-column prop="count" label="数量"> </el-table-column>
                <el-table-column prop="uom" label="单位"> </el-table-column>
                <el-table-column prop="price" label="单价"> </el-table-column>
                <el-table-column prop="total_amount" label="合计">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="app-argent">
            <div class="app-all">
              <p class="font">审批详情：</p>
              <div class="app-conts">
                <div
                  class="app-listCard"
                  v-for="(item, index) in workflowtask"
                  :key="index"
                >
                  <div class="user">
                    <div class="block">
                      <el-avatar
                        :size="50"
                        :src="item.appro_user.image"
                      ></el-avatar>
                    </div>
                  </div>
                  <div class="list-contr">
                    <ul>
                      <li>
                        <span>{{ item.state[1] }}</span>
                      </li>
                      <li>
                        <span>用户</span>：<span>{{
                          item.appro_user.name
                        }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="app-alls">
              <p class="font">审批意见：</p>
              <el-input
                class="textarea"
                type="textarea"
                :rows="4"
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
      <div class="hide" v-else>请选择一个已有订单</div>
    </div>
  </div>
</template>

<script >
import { sworkflowtask, worflowre, approve } from "../../../../api/approval";
import { transdate, timestampToTime } from "../../../../utils/index";
export default {
  name: "personal",
  data() {
    return {
      is_approve: "", //同意拒绝
      task_id: "1", //任务id
      apply_comment: "", // 审批意见
      search: "火狐",
      ordering: "33",
      page: "1",
      size: "10",
      create_time: "", // 申请时间
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
      mag: "",
      order: {},
      tableData: [
        {
          skuname: "",
          count: "",
          uom: "",
          price: "",
          total_amount: "",
        },
      ],
      workflowtask: [],
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
        this.is_approve = res.data.data.results[0].is_approved;
        this.create_time = timestampToTime(
          transdate(res.data.data.results[0].create_time)
        );
      });
    },
    async detail(item) {
      let type_id = item.type_id.id;
      let req_id = item.req_id.id;
      this.mag = item.type_id.name;
      const { data } = await worflowre(type_id, req_id);
      this.order = data.data;
      let datalist = [];
      let list = data.data.line;
      for (let i in list) {
        let obj = {};
        obj.skuname = list[i].sku.name;
        obj.count = list[i].count;
        obj.uom = list[i].uom.name;
        obj.price = list[i].price;
        obj.total_amount = list[i].total_amount;
        datalist[i] = obj;
      }
      this.tableData = datalist;
      this.create_time = timestampToTime(transdate(data.data.create_time));
      this.workflowtask = data.data.workflowtask;
      this.show = true;
    },
    async agree() {
      let obj = {
        is_approve: this.is_approve,
        task_id: this.task_id,
        apply_comment: this.apply_comment,
      };
      console.log(this.apply_comment);
    },
    refuse() {
    },
  },
};
</script>
<style scopted>
.approving {
  width: 100%;
  display: flex;
  box-sizing: border-box;
  text-align: center;
}
.appcontent {
  width: 25%;
  height: 848px;
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
}
.user {
  width: 70px;
  margin: 10px;
}
.list-cont {
  width: 500px;
  text-align: left;
}
.list-cont ul li span:nth-child(1) {
  width: 60px;
  display: inline-block;
  text-align-last: justify;
}
.block {
  margin-top: 10px;
}
.block img {
  width: 100%;
  height: 100%;
}
.flag {
  margin-left: 10px;
  width: 100px;
  display: inline-block;
  text-align: center;
  border-radius: 10px;
  color: #fff;
  background: cornflowerblue;
}
.code {
  margin-left: 10px;
  width: 100px;
  display: inline-block;
  text-align: center;
  border-radius: 10px;
  color: #fff;
  background: chocolate;
}
.apprconte {
  width: 75%;
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
  /* padding: 10px; */
}
.app-listCard {
  display: flex;
  align-items: center;
}
.list-policy {
  font-size: 18px;
  font-weight: 600;
}
.app-listss {
}
.user-devep {
  margin-top: 10px;
  width: 400px;
  display: flex;
  justify-content: center;
}
.user-devep div:nth-child(1) {
  flex: 1;
}
.user-devep div p {
  padding: 10px;
}
.user-devep div p span:nth-child(1) {
  width: 60px;
  display: inline-block;
  text-align-last: justify;
}
.font {
  font-weight: 600;
}
.app-argent {
  margin: 10px;
  padding: 10px;
  display: flex;
  text-align: left;
}
.app-all {
  flex: 1;
}
.app-all {
  flex: 2;
}
.app-conts {
  margin: 20px;
}
.el-card {
  display: flex;
}
.el-card .user {
  flex: 1;
}
.textarea {
  width: 300px;
  margin: 10px;
}
.app-argent .app-btn {
  text-align: left;
  margin: 10px;
}
.hide {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -50px;
}
</style>