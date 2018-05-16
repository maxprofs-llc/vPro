<template>
    <el-card :body-style="{ padding: '0px' }">
        <div class="image">
            <img :src="info.course_cover_address+'?imageView2/1/w/251/h/140/format/jpg/interlace/1/q/100'" />
        </div>
        <div class="des">
            <span class="projectTitle"><a @click="jumpTo(info.course_id)">{{info.course_title}}</a></span>
            <div class="bottom clearfix">
                <time class="time">{{  }}</time>
                <div class="price">
                    <span class="original-price">￥1599</span>
                    <span class="discount-price">{{info.course_price}}</span>
                </div>
            </div>
        </div>
    </el-card>
</template>
<style>
    /*
        以下开始是重复部分
        ,可以提取出来重复利用
    */
    .el-card{
        max-height:350px;
        /*width:220px;*/
        width:100%;
        margin:10px 0;
    }
    .projectTitle{
        transition:color 0.2s linear;
    }
    .projectTitle:hover{
        color:#FF4949;
    }
    .price{
        padding:10px 0 5px 0;
    }
    .price .original-price{
        color:#bbb;
        font-size:15px;
        text-decoration: line-through;
    }
    .price .discount-price{
        display:inline-block;
        color:#FF501A;
        font-size:24px;
    }
    .des{
        padding: 6px;
        /*height:80px;*/
    }
    .des .projectTitle{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size:14px;
        line-height:1.4;
        width:90%;
    }
    .des .time {
        font-size: 13px;
        color: #999;
    }

    .des .bottom {
        padding-top: 10px;
        line-height: 13px;

    }
    .image{
        width:100%;
        height:140px;
        overflow: hidden;
    }
    .image img {
        width: 100%;
        height:140px;
        display: block;
        cursor:pointer;
        transition:transform 0.7s;
    }
    .image img:hover{
        transform: scale(1.2);
        /*zoom:1.2;*/
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>
<script>
    import {web_routerConfig} from './../../config/RouterConfig'
    export default {
        created(){

        },
        props:{
            info:{
                type:Object,
                default: {}
            }
        },
        data: () => {
            return {
                msg: 'hello vue'
            }
        },
        methods:{
            jumpTo(video_id){
                web_routerConfig.push({path:'/detail/'+video_id})
            }
        },


    }
</script>