<!-- -->
<template>
<div class="news">
    <el-tabs :tab-position="tabPosition">
        <el-tab-pane v-for="item in options" :key="item" :label="item.label">      
            <div class="transition-box" >
                <p  v-for="o in item.children" :key="o" class="item" @click="onClick(item.id)">
                    {{ o.label }}                   
                </p>
            </div>
        </el-tab-pane>
        
    </el-tabs>
    
</div>
</template>

<script lang="ts">
import {getProductTree} from '../../../../api/product'
export default {
    name:"news",
    data(){
        return {
            tabPosition:'left',
            options: []
                    
        }
    },
    created(){
        this.loadProduct();
    },
    mounted(){

    },
    methods:{       
        async loadProduct(){           
            const {data} = await getProductTree();                             
            data.data.map((item,index)=>{       
                console.log(item);           
                let obj = {id:'',value:'',label:'',children:[],show:false};
                
                obj.value = index;              
                item.channels.forEach(Item => {
                    obj.id = Item.id;
                    return obj.label+=" "+Item.name
                });
                
                if(item.sub_cats){         
                    item.sub_cats.forEach((el,i) => {
                        let childObj = {value:'',label:''};                       
                        childObj.value = i;
                        childObj.label = el;
                        obj.children.push(childObj);
                    });                       
                }
                
                this.options.push(obj);              
                
            })
            
        },
        onClick(id){
            console.log(id);
            this.$router.push({name:'productList',query:{id}});
        }
           
    }
}
</script>
<style scopted>
.news{
    flex:0 0 400px;
}    
.el-tabs{
    height: 100%;
}
.el-tabs__content{
    height:100%;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
}
.item{
    padding: 0 20px;
    height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 40px;
    font-size: 14px;
    font-weight: 500;
    position: relative;
    cursor: pointer;
}
</style>