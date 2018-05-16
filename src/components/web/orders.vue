<template>
    <div class="orders_container">
        <div class="orders_white_container">
            <span>我的订单</span>
        </div>
        <el-tabs v-model="order_label_show" @tab-click="handleClick">
            <el-tab-pane label="全部订单" name="first">
                <orders_tab :orders_detail="order_history"></orders_tab>
                <pagination :page_count="order_page_count" :current_page="order_current_page" v-if="order_page_count"></pagination>
            </el-tab-pane>
            <el-tab-pane label="待支付" name="second">
                <orders_tab></orders_tab>
                <pagination  v-if="order_page_count"></pagination>
            </el-tab-pane>
            <el-tab-pane label="交易成功" name="third">
                <orders_tab ></orders_tab>
                <pagination  v-if="order_page_count"></pagination>
            </el-tab-pane>
            <el-tab-pane label="交易关闭" name="fourth">
                <orders_tab></orders_tab>
                <pagination  v-if="order_page_count"></pagination>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<style>
    .orders_container{

    }
    .el-tabs__nav-scroll{
        width:1200px;
        margin:20px auto 0;
    }
    .el-tabs__header{
        background-color:#fff;
    }
    .orders_white_container{
        background:#fff;
    }
    .orders_white_container span{
        display: block;
        width:1200px;
        margin:0 auto;
        padding:30px 0 5px 0;
    }
    .orders_container .el-tabs__content{
        width:1200px;
        margin:0 auto;
    }

</style>
<script>
    import orders_tab from './orders_tab.vue'
    import pagination from './pagination.vue'
    export default {
        mounted(){
            this.$store.dispatch('loadIndex',
                {
                    url: this.APIConfig.getOrder,
                    key: 'orderHistory',
                    request_pattern : {"user_id" : localStorage.getItem('auth_id')}
                })
        },
        data: () => {
            return {
                order_label_show:"first",
            }
        },

        components:{
            orders_tab:orders_tab,
            pagination
        },
        methods:{
            handleClick(tab, event){
                console.log(tab)
                console.log(event)
                if(tab.name=='first'){
                    this.$store.dispatch('loadIndex',
                        {
                            url: this.APIConfig.getOrder,
                            key: 'orderHistory',
                            request_pattern: {"user_id": localStorage.getItem('auth_id')}
                        })
                }
            },
        },
        computed:{
            order_history(){
                return this.$store.getters.orderHistory.orders
            },
            order_page_count(){
                let page_count = parseInt(this.$store.getters.orderHistory.page_count)
                return page_count==='undefined'?0:page_count
            },
            order_current_page(){
                return parseInt(this.$store.getters.orderHistory.current_page)
            }

        }
    }
</script>