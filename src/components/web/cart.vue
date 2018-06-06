<template>
    <div class="cart-container">
        <div class="cart-title">
            <span>我的购物车</span>
            <span>共{{cartInfo.length}}门课程</span>
        </div>
        <el-card class="box-card">
            <div class="clearfix order-title">
                <el-row>
                    <el-col :span="5">
                        <!--<el-checkbox v-model="check.checkAll"  @change="checkAll">全选</el-checkbox>-->
                        <span><input type="checkbox" @click="checkAll" v-model="check.checkAll" class="cart-checkbox" autocomplate="off">全选</span>
                    </el-col>
                    <el-col :span="8">
                        课程名称
                    </el-col>
                    <el-col :span="5">
                        学期或课程有效期
                    </el-col>
                    <el-col :span="3">
                        单价（元）
                    </el-col>
                    <el-col :span="3">
                        <el-button size="large" style="float: right;" type="danger" @click="placeOrder()" :disabled="!check.cartIds.length" :loading="check.orderCheck">确认下单</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <!--<el-checkbox v-model="check.checkAll" @change="checkAll">网站自营</el-checkbox>-->
                <span><input type="checkbox" @click="checkAll" v-model="check.checkAll" class="cart-checkbox" autocomplate="off">网站自营</span>
            </div>
            <div v-for="item in cartInfo" :key="item.cart_course_id" class="text item">
                <el-row>
                    <el-col :span="1">
                        <span><input type="checkbox" @click="checkOne(item.cart_course_id)" :checked="check.cartIds.indexOf(item.cart_course_id)>=0" class="cart-checkbox"></span>
                        <!--<el-checkbox :checked="check.cartIds.indexOf(item.cart_course_id)>=0" @change="test" @click="checkOne(item.cart_course_id)"></el-checkbox>-->
                    </el-col>
                    <el-col :span="5">
                        <div><img class="thumbnail_cart" :src="item.cart_course_cover_address" alt="" @click="jumpToCourse(item.cart_course_id)"></div>
                    </el-col>
                    <el-col :span="9">
                        <span style="cursor: pointer" @click="jumpToCourse(item.cart_course_id)">{{item.cart_course_title}}</span>
                    </el-col>
                    <el-col :span="4">
                        永久有效
                    </el-col>
                    <el-col :span="3">
                        {{item.cart_course_price}}
                    </el-col>
                    <el-col :span="2">
                        <el-button type="text" @click="deleteCartItem(item.cart_course_id)">delete</el-button>
                    </el-col>
                </el-row>
                <hr class="cart-divide">
            </div>
        </el-card>
        <div class="cart-bottom">
            <el-row :gutter="20">
                <el-col :span="5">
                    <!--<div class="checkAll"><el-checkbox v-model="check.checkAll" @change="checkAll">全选</el-checkbox></div>-->
                    <span><input type="checkbox" @click="checkAll" v-model="check.checkAll" class="cart-checkbox">全选</span>
                </el-col>
                <el-col :span="15">
                    <div class="total-price">
                        <span class="price-desc">合计：</span><span class="price-num">{{summaryPrice}}</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <el-button size="large" :class="{'disable_button':!check.cartIds.length,'put_order':check.cartIds.length}" :disabled="!check.cartIds.length" type="danger" @click="placeOrder()" :loading="check.orderCheck">确认下单</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<style>
    .cart-container{
        width:1200px;
        margin:0 auto;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
    .cart-container .el-card{
        max-height:100%;
    }
    .cart-title{
        margin:10px 0 10px 0;
        font-size:18px;
    }
    .bottom{
        border-top:1px solid #eee;
    }
    .el-checkbox{
        line-height:36px;
    }
    .order-title .el-col{
        line-height:36px;
    }
    .thumbnail_cart{
        margin: 0 0 0 10px;
        height:68px;
        width:120px;
        display:inline-block;
        cursor: pointer;
    }
    .cart-divide{
        border:1px solid #eee;
        margin:8px 0;
    }
    .cart-bottom{
        line-height:60px;
        border: 1px solid #d1dbe5;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        height:60px;
        width:100%;
        max-width:1200px;
        background-color:#ffffff;
        margin: 0 0 10px 0;
    }
    .cart-bottom .put_order{
        padding:0;
        border-radius:0px;
        cursor:pointer;
        background-color: #ff4949;
        border: 1px solid #ff4949;
        color: #fff;
        font-size: 20px;
        height:60px;
        text-align:center;
        width:100%;
    }
    .disable_button{
        padding:0;
        border-radius:0px;
        cursor:pointer;
        font-size: 20px;
        height:60px;
        text-align:center;
        width:100%;
        color:#bfcbd9;
        background-color: #eef1f6;
        border-color: #d1dbe5;
    }
    .cart-bottom .total-price{
        float:right;
        padding:0 55px 0 0;
    }
    .cart-bottom .total{
        color:#666;
        font-size:16px;
    }
    .cart-bottom .price-desc{
        font-size:16px;
        color:#666;
    }
    .cart-bottom .price-num{
        font-size:24px;
        color:#FF4949;
    }
    .cart-bottom .checkAll{
        padding:0 0 0 20px;
    }
    .cart-checkbox{
        line-height:1.5;
        margin-right:10px;
        margin-left:10px;
    }
</style>
<script>
  import { mapGetters } from 'vuex'
  import {web_routerConfig} from './../../config/RouterConfig'
  export default{
    mounted(){
      if(localStorage.getItem("auth_token") !== undefined || localStorage.getItem("auth_token") !== null){
        let auth_token = localStorage.getItem("auth_token")
        if(this.functions.verifyTokenExpiration(auth_token)){
          let cart_ref={
            'cart_userid': localStorage.getItem('auth_id')
          }
          this.$store.dispatch("loadCart", cart_ref).then(() => {
            if(this.cartInfo.length > 0) {
              this.cart_parent_id = this.cartInfo[0]["cart_parent_id"]
              this.functions.addLocalData("cart_parent_id", this.cart_parent_id)
            }
          })
        }else{
          this.$root.$emit("showLogin")
        }
      }else if(this.functions.getCookie("cart") !== ""){
        let cookieCart = JSON.parse(this.functions.getCookie("cart"))
        let cart_ref = {
          'cart_cookieid': cookieCart.cart_id
        }
        this.$store.dispatch("loadCart", cart_ref).then(() => {
          console.log(this.cartInfo)
        })
      }
    },
    data: () => {
      return {
        cart_parent_id:-1,
        check:{
          checkAll:false,
          cartIds:[],
          orderCheck:false
        },
        summaryPrice:"0.00",
      }
    },
    methods:{
      checkAll(){
        if(!this.check.checkAll){
          this.check.cartIds=[]
          this.cartInfo.map(item => {
            this.check.cartIds.push(item.cart_course_id)
          })
        }else{
          this.check.cartIds=[]
        }
        this.priceSummary()
      },
      priceSummary(){
        let price = 0
        this.cartInfo.filter((item)=>{
          for(let i of this.check.cartIds){
            if(i === item.cart_course_id)return true
          }
          return false
        }).map(item=>{
          price = price + parseFloat(item.cart_course_price)
        })
        this.summaryPrice = price.toFixed(2)
      },
      checkOne(course_id){
        let idIndex = this.check.cartIds.indexOf(course_id)
        if(idIndex >= 0 ){
          this.check.cartIds.splice(idIndex, 1)
        }else{
          this.check.cartIds.push(course_id)
        }
        if(this.cartInfo.length !== this.check.cartIds.length){
          this.check.checkAll=false
        }else{
          this.check.checkAll=true
        }
        this.priceSummary()
      },
      deleteCartItem(course_id){
        let originCart={}
        let cart = {}
        if(localStorage.getItem("auth_token")===null||localStorage.getItem("auth_token")===undefined){
          cart = JSON.parse(this.functions.getCookie("cart"))
          originCart = cart.cart_detail
          cart["is_login"]=false
        }else{
          originCart = this.cartInfo
          cart["is_login"]=true
          cart['cart_userid']=localStorage.getItem('auth_id')
        }
        cart.cart_detail=originCart.filter(item=>{
          if(item.cart_course_id==course_id){
            return true
          }
          return false
        })
        console.log(cart)
        this.$store.dispatch('addToCart',{url: this.APIConfig.delCartDetail, data:cart})
      },
      jumpToCourse(course_id){
        window.open("http://"+window.location.host+"/#/detail/"+course_id);
//               web_routerConfig.push({path:'/detail/'+course_id})
      },
      placeOrder(){
        if(this.check.cartIds.length > 0){
//                   this.check.orderCheck=true
          this.$store.dispatch('checkCourses', { order_course_ids: this.check.cartIds }).then(()=>{
            let checkOrder = {
              isChanged:false,
              changedId:[]
            }
            // 提交订单前，检查订单商品，如果商品不存在了，那么直接删去
            this.orderInfo.map((item, i) => {
              if(this.check.cartIds.indexOf(item.course_id.toString()) < 0){
                this.check.cartIds.splice(i, 1);
                checkOrder.isChanged=true
                checkOrder.changedId.push(item.course_id)
              }
            })
            // order如果没有更改，进入下单界面
            if(!checkOrder.isChanged) {
              this.check.orderCheck = false
              this.functions.addLocalData('cart_ids', this.check.cartIds)
              web_routerConfig.push({path:"/settle"})
            }
          })
        }
      }
    },
    computed:{
      ...mapGetters(['cartInfo', 'orderInfo']),
    }
  }
</script>