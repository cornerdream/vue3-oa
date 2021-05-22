<!-- -->
<template>
  <div class="me">
    1111
    <cardState />
    <cardCollect />
    <cardOrder />
    <cardFoot />
  </div>
</template>

<script lang="ts">
import cardState from './components/card-state.vue'
import cardCollect from './components/card-collect.vue'
import cardOrder from './components/card-order.vue'
import cardFoot from './components/card-foot.vue'
export default {
  name: 'me',
  components: { cardState, cardCollect, cardOrder, cardFoot },
  data() {
    return {}
  },
  created() {},
  mounted() {}
}
</script>
<style scopted></style>
