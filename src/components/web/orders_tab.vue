<template>
   <!-- <el-table
            :data="orders_detail"
            style="width: 100%">
        <el-table-column
                prop="orders_name"
                label="订单信息"
                width="500">
        </el-table-column>
        <el-table-column
                prop="price"
                label="单价（元）"
                width="130">
        </el-table-column>
        <el-table-column
                prop="total_price"
                label="金额（元）"
                width="130">
        </el-table-column>
        <el-table-column
                prop="orders_course_ops"
                label="课程操作"
                width="155">
        </el-table-column>
        <el-table-column
                prop="orders_trade_status"
                label="交易状态"
                width="130">
        </el-table-column>
        <el-table-column
                prop="orders_trade_ops"
                label="交易操作"
                width="155"
                >
        </el-table-column>
        <el-table-column>
        <template slot-scope="scope">
            <image :src="scope.row.image" width="80" height="80"/>
        </template>
        </el-table-column>
    </el-table>-->
    <div>
        <div v-if="orders_detail" v-for="(items, i) in orders_detail" :key="i">
            <el-card class="orders-card">
                <div slot="header">
                    <el-row :gutter="20">
                        <el-col :span="8">订单编号：{{i}}</el-col>
                        <el-col :span="8">创建时间：{{(new Date(parseInt(items.order_time + '000')).format('yyyy-MM-dd hh:mm:ss'))}}</el-col>
                        <el-col :span="8"></el-col>
                    </el-row>
                </div>
                <div class="orders-lab">
                    <el-row>
                        <el-col :span="14">
                            <el-row v-for="(v,k) in items.sub_order" :key="k" class="orders-history-lab">
                                <el-col :span="6">
                                    <img class="orders-history-img" :src="v.course_cover_address" alt="" />
                                </el-col>
                                <el-col :span="8"><router-link :to="'detail/'+v.course_id" class="course-link">{{v.course_title}}</router-link></el-col>
                                <el-col :span="5">{{v.course_author}}</el-col>
                                <el-col :span="5">{{v.course_price}}</el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="10">
                            <el-row>
                                <el-col :span="8">
                                    <span class="origin-price">{{items.order_discount!=='0'?(parseFloat(items.order_discount)+parseFloat(items.order_price)).toString().currency():''}}</span>
                                    <span class="order-price">{{items.order_price}}</span>
                                </el-col>
                                <el-col :span="8">等待支付</el-col>
                                <el-col :span="8"><el-button>订单详情</el-button></el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </div>
    </div>
</template>
<style>
    .orders-card{
        max-height:none
    }
    .orders-history-img{
        width:120px;
        height:68px;
    }
    .origin-price{
        text-decoration: line-through;
        color:#ccc;
    }
    .course-link{
        color:#666;
        text-decoration: none;
    }
    .orders-lab{

    }
    .orders-history-lab{
        margin:10px 0;
    }
</style>
<script>
    export default {
        mounted(){

        },
        props:{
            orders_detail:{
                type:Object,
                default: ()=>{
                    return {};
                }
            },
        },
        data: () => {
            return {
                msg: 'hello vue'
            }
        },
    }
</script>