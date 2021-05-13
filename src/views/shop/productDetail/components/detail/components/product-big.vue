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
.product-big{
  width: 400px;
  float: left;
}
.box{
  width: 400px;
  height: 220px;
}
.list{
  width: 400px;
  height: 30px;
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