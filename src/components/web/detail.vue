<template>
    <div class="detail-container">
        <div class="bread">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="item in lessonDetail.crumb" :to="{path:item.nav_url}" :key="item.nav_id">{{item.nav_text}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="detail-main">
            <el-row v-if="flag">
                <el-col :span="10">
                    <img :src="lessonDetail.detail.course_cover_address" alt="" class="main-img">
                </el-col>
                <el-col :span="14">
                    <div class="main-detail">
                        <span class="main-title">{{lessonDetail.detail.course_title}}</span>
                        <div class="main-info">
                            <i class="el-icon-menu"></i>
                            <span>{{lessonDetail.detail.course_clickNum}}</span>
                            <el-rate
                                    v-model="score"
                                    disabled
                                    show-score
                                    text-color="#ff9900"
                                    class="el-rate-inline"
                                    show-template="{value}"
                            >
                            </el-rate>
                            <span>{{lessonDetail.detail.course_score}}</span>
                        </div>
                        <div class="main-price">免费</div>
                        <div class="main-adv">超级学习节 | 每日签到领N元优惠福袋</div>
                        <div class="clearfix"></div>
                        <div  class="main-btn">
                            <el-button type="primary" size="large">立即参加</el-button>
                            <el-button type="text" @click="addToCart">加入购物车</el-button>
                        </div>
                        <div class="main-share">
                            <el-button type="primary" icon="star-off"></el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-row :gutter="20">
            <el-col :span="18">
                <div class="detail-show">
                    <el-tabs type="border-card">
                        <el-tab-pane label="介绍">
                            <div class="detail-intro">

                                适用人群

                                1.零基础学员
                                2.前端爱好者
                                课程概述
                                课程大纲：
                                1.HTML常用标签/语义化便签/多媒体标签等企业常用HTML相关知识；
                                2.CSS常见选择器/2D/3D/动画/响应式布局等CSS相关知识；
                                3.以上两部分内容完成之后会带着大家高仿一个企业网站以及做一个响应式网站(同时适配电脑/手机/平板电脑)；
                                4.JS基础语法， 涵盖所有JS基础语法，内置对象，DOM，BOM操作以及各种常见JS特效实现；
                                5.JS面向对象涵盖面向对象三大特性在JS中的应用和常见设计模式排序算法讲解；
                                6.jQuery、jQueryUI、jQuerymobile、jQuery实现原理、jQuery实战
                                7.Aajx、web存储（cookie/session/storage/三方框架）等、Ajax实战
                                8.各种流行框架（bootstrap、AngularJS、VueJS、ReactJS、组件化、模块化）等
                                9.Web工作流框架Gulp、Bower、Webpack等
                                10.Nodejs、React Native跨平台开发(同时实现Android/iOS)
                                通过1:1:1完成大型企业项目途牛App的开发， 带大家打通前后端。
                                **********************************************************************
                                更多内容可以加入“江哥带你玩转H5”群，请戳→289964053（备注：网易云课堂）
                                个人博客地址: http://www.jianshu.com/p/641506cd8153
                                **********************************************************************
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="目录">
                            <div>
                                <h3>目录</h3>
                                <div class="chapterList">
                                    <div v-for="(l, k) in list" :key="k">
                                        <div class="chapterHead" v-if="l.lesson_title">
                                            <span class="chapterTitle">章节{{parseInt(l.lesson_lid)+1}}:</span>
                                            <span class="chapterName">{{l.lesson_title}}</span>
                                        </div>
                                        <div class="section" v-for="v in l.lesson" :key="v.lesson_id">
                                            <span class="lesson">课时{{parseInt(v.lesson_lid)+1}}</span>
                                            <span class="lessonName" @click="enterVideo(v)">{{v.lesson_title}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="笔记">笔记</el-tab-pane>
                        <el-tab-pane label="讨论区">讨论区</el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
            <el-col :span="6">
                <el-card class="detail-card">
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">卡片名称</span>
                        <el-button style="float: right;" type="primary">操作按钮</el-button>
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">
                        {{'列表内容 ' + o }}
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>

</template>
<style>
    /*控制星级*/
    .el-rate-inline{
        display:inline-block;
        line-height:20px;
    }
    /*以下是目录的css控制*/

    .chapterList{
        border-top:1px solid #ddd;
        text-align:left;
        position:relative;
        padding-bottom:1em;
    }
    .chapterList .chapterHead{
        height: 35px;
        color: #999;
        font-family: '微软雅黑';
        font-size: 14px;
        font-weight: bolder;
        padding: 0 20px;
        line-height: 35px;
        cursor: default;
        background: #fafafa;
    }
    .chapterList .chapterTitle{
        width: 62px;
        height:35px;
        text-align:left;
    }
    .chapterList .chapterName{
        width:470px;
        padding-left:6px;
    }
    .chapterList .section{
        height:40px;
        line-height:40px;
        padding:0 20px;
        cursor:pointer;
        transition: background-color 0.15s ease-out;
        font-size: 16px;
    }
    .chapterList .section:hover{
        background-color:#ffd2d2;
    }
    .section .lesson{
        width:62px;
        color:#999;
        text-align:left;
        font-size:14px;
    }
    .section .lessonName{
        width:450px;
        padding-left:6px;
        color:#333;
        height:36px;
    }
    /*以上是目录的css控制*/
    .detail-show{
        background:#fff;
        box-shadow:5px 5px 3px #ccc;
        margin:10px 0;
    }
    .bread{
        margin:20px 0;
    }
    .detail-container{
        width:1200px;
        margin:0 auto;
    }
    .detail-main{
        background:#fff;
        box-shadow:5px 5px 3px #ccc;
        padding:20px;
        margin:10px 0;
    }
    .detail-card{
        box-shadow:5px 5px 3px #ccc;
    }
    .main-img{
        box-shadow:2px 2px 1px #ccc;
        height:250px;
        width:450px;
    }
    .main-detail{
        position:relative;
    }
    .main-title{
        font-size:32px;
        color:#333;
        margin:0 0 5px 0;
    }
    .main-price{
        color:#FF4949;
        font-size:38px;
        margin:15px 5px 10px 5px;
    }
    .main-adv{
        padding:4px 10px;
        margin:5px 2px;
        background:red;
        font-size:18px;
        color:#fff;
        display:inline-block;
        height:24px;
        line-height:24px;
        border-radius:16px;
    }
    .main-btn{
        position:absolute;
        left:5px;
        bottom: -50px;
    }
    .main-btn button{
        margin-right:10px;
    }
    .main-share{
        position:absolute;
        right:5px;
        top:5px;
    }
    .main-info{
        margin:10px 0;
    }
    .detail-intro{
        padding:15px;
    }
</style>
<script>
    import Vue from 'vue'
    import {Message} from 'element-ui'
    import { web_routerConfig } from './../../config/RouterConfig'
    export default {
        created(){},
        mounted(){
            this.$store.dispatch("loadIndex", {url:this.APIConfig.getLessonDetail, key:"lessonDetail", request_pattern:{'cid': this.$route.params.course_id}}).then(()=>{
                let headFlag=false
                this.flag=true
                let crumb=this.lessonDetail.crumb
                let detail=this.lessonDetail.detail
                this.score=parseFloat(detail.course_score)
                //目录生成
                let lesson_list = this.lessonDetail.lesson_list
                headFlag = false
                for (let item of lesson_list) {
                    if(item.lesson_is_chapter_head === '1'){
                        headFlag = true
                        break
                    }
                }
                let list=[]
                console.log(headFlag)
                if(headFlag){
                    for(let i of lesson_list) {
                        if (i.lesson_is_chapter_head === '1') {
                            let chapter = i
                            i.lesson = []
                            for (let item of lesson_list) {
                                if (item.lesson_pid === i.lesson_id) {
                                    chapter.lesson.push(item)
                                }
                            }
                            list.push(chapter)
                        }
                    }
                }else{
                    let chapter={lesson:lesson_list, lesson_title:false}
                    list.push(chapter)
                }
                this.list=list
                console.log(list)
            })
        },
        data(){
            return{
                flag:false,
                list:{},
                score:0
            }
        },
        methods:{
            enterVideo(obj) {
//              window.open("http://"+window.location.host+"/#/play/?" + 'course_id=' + obj.lesson_course_id + '&' + 'lesson_id=' + obj.lesson_id)
              window.location.href = "http://"+window.location.host+"/#/play/?" + 'course_id=' + obj.lesson_course_id + '&' + 'lesson_id=' + obj.lesson_id
            },
            addToCart(){
                let auth_token = localStorage.getItem('auth_token');
                if(auth_token!=='undefined' && auth_token!==null){
                    //有token记录，用户登录过
                    if(this.functions.verifyTokenExpiration(auth_token)){
                        //token未过期，直接发送给后台，加入购物车
                        let cart_ref={
                            'cart_userid': localStorage.getItem('auth_id')
                        }
                        this.$store.dispatch("loadCart", {url:this.APIConfig.loadCart, data:cart_ref, key:"cartInfo"}).then(()=>{
//                            if(this.getCookie("cart")!==""){
//                                let cookieCart = JSON.parse(this.getCookie("cart"))
//
//                            }
                            let cart_id = this.cart_info.length===0?this.functions.genNonDuplicateID():this.cart_info[0]["cart_parent_id"]
                            let cart_info = {
                                'cart_userid': localStorage.getItem('auth_id'),
                                cart_id,
                                'cart_detail': []
                            }
                            let cartFlag = this.cart_info.map(item=>{
                                    if(item.cart_course_id===this.lessonDetail.detail.course_id){
                                        console.log("购物车已经存在该商品");
                                        return false;
                                    }
                                    return true;
                                })
                            if(cartFlag){
                                cart_info.cart_detail.push({cart_course_id: this.lessonDetail.detail.course_id, cart_parent_id:cart_id})
                                this.$store.dispatch('addToCart', {url: this.APIConfig.addCart, data:cart_info})
                            }
                        })
                    }else{
                        //token已过期，需要重新获取token才可以加入购物车
                    }
                }else{
                    //没有token，没有用户登陆过，直接生成cookie购物车
                    let cookieCart = this.functions.getCookie('cart')
                    if(cookieCart===""){
                        cookieCart={
                            cart_id:this.functions.genNonDuplicateID(),
                            cart_detail:[]
                        }
                    }else{
                        cookieCart = JSON.parse(cookieCart)
                    }
                    //如果购物车中有课程
                    if(cookieCart.cart_detail.length!==0){
                        let cart_detail=[]
                        cart_detail = cookieCart.cart_detail
                        let courseFlag = cart_detail.filter(item=>{
                            if(item.cart_course_id === this.lessonDetail.detail.course_id){
                                return true
                            }
                            return false
                        })
                        if(courseFlag.length>0){
                            console.log("该课程已经存在于购物车！")
                            return;
                        }else{
                            cookieCart.cart_detail.push({cart_course_id:this.lessonDetail.detail.course_id, cart_parent_id:cookieCart.cart_id, cart_is_cookie:1})
                        }
                    }else{
                        //没有课程就直接加
                        cookieCart.cart_detail.push({cart_course_id:this.lessonDetail.detail.course_id, cart_parent_id:cookieCart.cart_id, cart_is_cookie:1})
                    }
                    this.functions.setCookie("cart",JSON.stringify(cookieCart) ,30)
                    console.log(cookieCart)
                    this.$store.dispatch('addToCart', {url:this.APIConfig.cartDetail, data: cookieCart})
                }


            }
        },
        computed:{
            lessonDetail(){
                return this.$store.getters.lessonDetail;
            },
            auth_id(){
                return this.$store.getters.auth_id
            },
            cart_info(){
                return this.$store.getters.cartInfo
            }
        }
    }
</script>