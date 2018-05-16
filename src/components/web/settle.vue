<template>
    <div class="cart-container">
        <el-steps :active="step" simple finish-status="success" style="margin-top: 20px">
            <el-step title="加入购物车" icon="el-icon-edit"></el-step>
            <el-step title="确认订单" icon="el-icon-upload"></el-step>
            <el-step title="完成支付" icon="el-icon-picture"></el-step>
        </el-steps>

        <div class="order_container" v-if="payment.payUrl">
            <el-row :gutter="20">
                <el-col :span="24">
                    <span class="course_label">订购人信息</span>
                </el-col>
                <el-col :span="24">

                </el-col>
            </el-row>
            <hr class="bottom-line">
            <el-row :gutter="20">
                <el-col :span="24">
                    <span class="course_label">订购清单</span>
                </el-col>
            </el-row>
            <hr class="bottom-line" />
            <div class="course_detail" v-for="item in order_info">
                <el-row :gutter="20">
                    <el-col :span="7">
                        <div>
                            <img :src="item.course_cover_address" alt="" class="course_image">
                        </div>
                    </el-col>
                    <el-col :span="9"><span>{{item.course_title}}</span></el-col>
                    <el-col :span="4"><span class="course_cost">{{item.course_price}}</span></el-col>
                    <el-col :span="4">授课中</el-col>
                </el-row>
                <hr class="bottom-line" />
            </div>
            <el-tabs @tab-click="handleClick" class="discount" v-model="initLabel">
                <el-tab-pane label="优惠券" name="vaild">
                    <div style="margin:0 8px;"  v-if="coupon_info.length">
                        <el-row :gutter="20">
                            <el-col :span="6" v-for="(item, o) in coupon_info" :key="o">
                                <el-card :body-style="{ padding: '0px'}">
                                    <div @click="selectDiscount(o, item.coupon_is_matched)" :class="{'discount_area':true, 'discount_selected':o===discount_selected, 'discount_area_not_matched':!item.coupon_is_matched}">
                                        <div :class="{'discount_detail':true,  'discount_detail_not_matched':!item.coupon_is_matched}">
                                            <span class="discount_large_font discount_flag">￥</span>
                                            <span class="discount_large_font discount_money">{{item.coupon_discount}}</span>
                                            <span>满{{item.coupon_limit}}</span>
                                            <span class="discount_vaild_date">有效期至{{item.coupon_end_date}}</span>
                                        </div>
                                        <div class="discount_type">
                                            <span>[全品类]</span>
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                    <div v-if="!coupon_info.length">
                        <span class="discount_empty">
                            空空如也~
                        </span>
                    </div>
                    <hr class="bottom-line">
                </el-tab-pane>
                <el-tab-pane label="过期" name="overdue">
                    <div>
                        <span class="discount_empty">
                            空空如也~
                        </span>
                    </div>
                    <hr class="bottom-line">
                </el-tab-pane>
            </el-tabs>
            <div>
                <div class="price_label">
                    <ul class="course_price">
                        <li><span class="summary_label">商品价格总计：</span><span class="summary_value">{{course_price}}</span></li>
                        <li><span class="summary_label">返现：</span><span class="summary_value">{{this.order_price.order_money_return.toFixed(2)}}</span></li>
                        <li><span class="summary_label">优惠：</span><span class="summary_value">{{this.order_price.order_coupon_discount.toFixed(2)}}</span></li>
                        <li class="confirm-container"><span class="summary_label confirm">应付总额：</span><span class="confirm summary_value confirm_price">{{summary_price}}</span></li>
                    </ul>
                </div>
                <div class="order_place">
                    <el-button type="danger" :loading="false" class="order_button" @click="putOrder">提交订单</el-button>
                </div>
                <div style="clear:both;float:none;"></div>

            </div>
        </div>
        <div class="order_container" v-if="!payment.payUrl">
            <el-row :gutter="20">
                <el-col :span="10">
                    1
                </el-col>
                <el-col :span="14">
                    2
                </el-col>
            </el-row>
        </div>
        <el-dialog
                title="出错啦"
                :visible.sync="warning_dialog"
                width="25%"
                center
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :show-close="false"
        >
            <span class="dialog_content"><i class="el-icon-warning dialog_flag"></i>订单超时或信息有误，请检查信息返回购物车重新下单</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="backToCart()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style>
    ul{
        list-style: none;
    }
    .order_container{
        background-color: #ffffff;
        box-shadow: 2px 2px 2px #cccccc;
        padding:10px;
    }
    .course_label{
        margin:10px 20px 10px;
        font-weight:bold;
    }
    .course_detail{
        margin:10px 0;
        color:#666;
    }
    .bottom-line{
        width:97%;
        border:1px solid #efefef;
        margin:0 auto;
    }
    .course_image{
        display:block;
        width:50%;
        margin:0 auto 10px;
    }
    .course_cost{
        font-size:16px;
        color: #FF4949;
        font-weight:bold;
    }
    .price_label{
        display:inline-block;
        height:140px;
        width:100%;
        float:right;
    }
    .course_price{
        text-align:right;
    }
    .summary_label{
        width:200px;
        text-align: left;
        color:#666;
    }
    .summary_value{
        text-align:left;
        width:150px;
        color:#666;
    }
    .discount{
        margin:20px;
    }
    .discount_empty{
        display:block;
        text-align:center;
        margin:10px auto;
        color:#ccc;
    }
    .discount_area{
        cursor:pointer;
        border:2px solid transparent;
    }
    .discount_area_not_matched{
        cursor: not-allowed;
    }
    .discount_detail{
        background-color:#ff7777;
        color:#ffffff;
        padding:15px;
        font-size:15px;
    }
    .discount_vaild_date{
        color:#FFE6E6;
    }
    .discount_detail_not_matched{
        background-color:#cccccc;
        color:#ffffff;
    }
    .discount_large_font{
        font-size:26px;
    }
    .discount_type{
        padding:10px 15px;
        color:#ff7777;
    }
    .discount_selected{
        border:2px solid #ff3333;
    }
    .confirm-container{
        background:#efefef;
        padding:10px 20px 10px;
        margin:10px 0;
    }
    .confirm{
        height:1.5em;
        line-height:1.5em;
        color:#666;
    }
    .confirm_price{
        font-size:30px;
        font-weight:bold;
        color:#FF4949;
    }
    .order_place{
        float:right;
        margin:10px 90px 10px;
    }
    .dialog_content{
        display:block;
        font-size:16px;
        color:#666;
        text-align:center;
    }
    .dialog_flag{
        display:block;
        font-size:40px;
        line-height:40px;
        color:#FF4949;
        margin:10px auto;
        text-align:center;
    }
</style>
<script>
    import {web_routerConfig} from './../../config/RouterConfig'
    export default {
        created(){
            if(this.order_info.length===0) {
                let cart_ids = this.functions.checkLocalData('cart_ids')
                console.log(cart_ids)
                return
                if (cart_ids) {
                    this.$store.dispatch('checkData', {
                        url: this.APIConfig.checkCourses,
                        data: {order_course_ids: cart_ids},
                        key: 'orderInfo'
                    })
                }else{
                    console.log("购物车过期或为空")
                }
            }
        },
        mounted(){

        },
        data: () => {
            return {
                initLabel:"",
                discount_selected:false,
                order_price:{
                    order_coupon_discount:0,
                    order_money_return:0,
                },
                warning_dialog:false,
                step: 1
            }
        },
        methods:{
            handleClick(tab, event) {
                if(tab.$el.id==="pane-vaild"){
                    this.$store.dispatch('checkData', {url:this.APIConfig.getCoupon, data:{
                        user_id:localStorage.getItem('auth_id')
                    }, key:'couponInfo'}).then(()=>{
                        console.log(this.coupon_info)
                    })
                }
            },
            selectDiscount(o, is_matched){
                if(is_matched){
                    if(this.discount_selected < 0){
                        this.discount_selected=o;
                        this.order_price.order_coupon_discount=this.coupon_info[o]['coupon_discount']
                    }else if(o>=0 && this.discount_selected>=0&&o!==this.discount_selected){
                        this.discount_selected=o;
                        this.order_price.order_coupon_discount=this.coupon_info[o]['coupon_discount']
                    }else{
                        this.discount_selected=-1;
                        this.order_price.order_coupon_discount=0
                    }
                }
            },
            /**
             * 最终下单：
             * 首先判断token是否过期
             * 判断订单是否有课程
             * 判断价格是否大于0
             *
             */
            putOrder(){
                let auth_id = localStorage.getItem('auth_id')
                let auth_token = localStorage.getItem('auth_token')
                let cart_ids = JSON.parse(this.functions.getLocalData('cart_ids'))
                if(auth_id && auth_token && cart_ids.length>0){
                    //判断价值量大于0并且订单信息存在，
                    if(this.order_info.length > 0 && this.summary_price >= 0){
                        this.$store.dispatch('checkData', {
                            url:this.APIConfig.checkCourses,
                            data:{
                                    user_id:auth_id,
                                    order_course_ids:cart_ids,
                                    order_coupon_used:this.discount_selected,
                                    order_price:{
                                        course_price:this.course_price,
                                        coupon_discount:this.order_price.order_coupon_discount,
                                        money_return:this.order_price.order_money_return,
                                    }
                                },
                            key:'orderInfo'
                        }).then(()=>{
                            console.log('insert')
                            this.step = 2
                            let info = {}
                            info.user_id = localStorage.getItem("auth_id")
                            info.order_course_ids = JSON.parse(this.functions.getLocalData('cart_ids'))
                            info.cart_parent_id = this.functions.getLocalData("cart_parent_id");
                            info.course_price = this.course_price
                            info.order_coupon_discount=this.order_price.order_coupon_discount
                            info.order_coupon_selected = this.discount_selected
                            this.$store.dispatch('putOrder', {
                                url:this.APIConfig.putOrder,
                                data:info,
                            })
                        }).then(()=>{

                        })
                    }
                }
//                this.warning_dialog=true
            },
            backToCart(){
                this.warning_dialog=false
                web_routerConfig.push({'path':'/cart'})
            }
        },
        computed:{
            order_info(){
                return this.$store.getters.orderInfo
            },
            coupon_info(){
                let coupon_info = []
                if(this.$store.getters.couponInfo.length>0){
                    coupon_info=this.$store.getters.couponInfo
                    let date=new Date()
                    for(let i in coupon_info){
                        coupon_info[i]['coupon_is_matched']=coupon_info[i]['coupon_limit'] > this.course_price?false:true
                        for(let k in coupon_info[i]){
                            if(k.indexOf('date')>=0){
                                date.setTime(coupon_info[i][k]*1000)
                                console.log(
                                    date.getYear()+1900,
                                    date.getMonth()+1,
                                    date.getDate()
                                )
                                coupon_info[i][k]=(date.getYear()+1900)+' 年 '+ (date.getMonth()+1)+' 月 '+ (date.getDate()) + ' 日 '
                            }
                        }
                    }
                }
                return coupon_info
            },
            //课程总价
            course_price(){
                let price=0;
                this.order_info.map(item=>{
                    price += parseFloat(item.course_price)
                })
                return price.toFixed(2);
            },
            //获得最终总价
            summary_price(){
                return parseFloat(this.course_price - this.order_price.order_coupon_discount).toFixed(2);
            },
            payment(){
                return this.$store.getters.payment
            }
        }

    }
</script>