<!-- -->
<template>
<div class="product-big">
    <div class="box">
         
    </div>
    <div class="list">
          <ul>
           
          </ul>
    </div>

</div>
</template>

<script lang="ts">

export default {
       name:"product-big",
       components:{
          PicZoom
        },
       data(){

        return{
              
            }


},
       created(){

},
       mounted(){

},
methods:{
       
      }
}
</script>
<style scopted>
.box{
  width: 400px;
  height: 320px;
}
.list{
  width: 400px;
  height: 130px;
}
  .list ul{
    width: 400px;
    display: flex;
    justify-content: space-around;
  }
  .list ul li{
    width:120px;
    height: 90px;
    background-color: white;
    margin-top: 15px;
  }
  .list ul li img{
    width: 120px;
    height: 90px;
  }

</style>