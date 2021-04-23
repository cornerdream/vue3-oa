<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'App',
  components: {
    
  }
})
</script>

<style>
*{
margin:0;
padding:0;
}
body{ font-size:13px; font-family: 'Avenir', Helvetica, Arial, sans-serif;}
a{ text-decoration:none; }
li{ list-style:none; }
img{ border:none 0;}
input{ outline:none; border:none; background:none;}
button{ outline:none; }
</style>
