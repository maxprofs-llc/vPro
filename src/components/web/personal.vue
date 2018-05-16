<template>
    <div>
        <div class="panel">
            <div class="panel-container">
                <div class="panel-img">
                    <img src="" alt="" />
                </div>
                <div class="panel-title">
                    <span class="panel-title-name">{{this.getAuthAppId}}</span>
                    <span class="panel-title-greetings">，早上好</span>
                </div>
                <div class="panel-content">
                    <span class="panel-detail">美国女神一手拿着火炬，一手拿着书，这是告诉我们停电也要学习。</span>
                </div>
            </div>
        </div>
        <div class="content-container">
            <el-input
                    placeholder="请选择日期"
                    icon="search"
                    v-model="input"
                    :on-icon-click="handleClick">
            </el-input>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="课程" name="first">
                    <div class="cards-container">
                        <el-row :gutter="30">
                            <el-col :span="6" v-for="(item,i) in 4" :key="i">
                                <el-card :body-style="{ padding: '0px' }">
                                    <div class="image">
                                        <img src="/imgs/php.png">
                                    </div>
                                    <div class="des">
                                        <span class="projectTitle">PHP开发</span>
                                        <div class="bottom clearfix">
                                            <time class="time">已学习7/24课时</time>
                                        </div>
                                    </div>
                                    <div class="course-progress">
                                        <el-progress :percentage="70"></el-progress>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="计划" name="second">计划</el-tab-pane>
                <el-tab-pane label="收藏夹" name="third">收藏夹</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<style>
    .panel{
        background-color:#333;
        height:270px;
    }
    .panel-container{
        width:1200px;
        height:270px;
        margin:0 auto;
        padding:80px 0 0 120px;
        position:relative;
    }
    .panel-img{
        width:80px;
        height:80px;
        background:#ccc;
        border-radius:40px;
        position:absolute;
        top:85px;
        left:20px;
        display: block;

    }
    .panel-title{
        color:#fff;
        font-size:32px;

    }
    .panel-content{
        color:#fff;
        font-size:22px;
        margin:10px 0;
    }
    .content-container{
        width:1200px;
        margin:15px auto;
    }
    .cards-container{
        width:1200px;
        margin:0 auto;
    }
    .course-progress{
        margin:5px auto;
        width:90%;
    }
    .content-container .el-tabs__item{
        font-size:24px;
    }
</style>
<script>
    export default {
        data() {
            return {
                activeName: 'first',
                input:''
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        },
        computed:{
            getAuthAppId(){
                return this.$store.getters.auth_appid
            }
        }
    };
</script>