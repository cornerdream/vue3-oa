<!--入库单 rengaoli 2021/5/18 -->
<template>
  <div class="personal">
    <div class="content">
      <div class="title">RK20-04-24</div>
      <information></information>
      <detailed></detailed>
    </div>
  </div>
</template>

<script lang="ts">
import information from "./components/information.vue";
import detailed from "./components/detailed.vue";
export default {
  name: "personal",
  components: { information, detailed },
  data() {
    return {};
  },
  methods: {
  },
};
</script>
<style scopted>
.personal {
  padding: 20px;
}
.title {
  font-size: 20px;
  font-weight: 600;
  padding: 20px;
}
.content-head {
  margin: 30px 60px;
}
h4 {
  margin: 10px;
}
</style>