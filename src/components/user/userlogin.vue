<template>
    <el-row v-if="!isLogin">
        <el-col :span="14">
            <div class="user_bg"></div>
        </el-col>
        <el-col :span="10">
            <el-form :rules="rules" ref="login" :model="loginForm" label-width="100px" class="loginForm">
                <el-form-item label="用户名：" prop="user_name">
                    <el-input v-model="loginForm.user_name" type="text"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="user_pass">
                    <el-input v-model="loginForm.user_pass" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="UserLogin()">login</el-button>
                    <el-button type="primary" @click="clear()">clear</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
    <el-row v-else-if="isLogin">
        <el-col>
            <el-alert
                    title="您已经成功登录，1秒钟后将跳转至首页"
                    type="success"
                    show-icon>
            </el-alert>
        </el-col>
    </el-row>
</template>
<style>
    .loginImg{
        width:100%;
    }
    .loginForm{
        margin:20px 0 0 0;
    }
    .user_bg{
        background-image:url("http://omxvb7tjv.bkt.clouddn.com/15.jpg");
        background-repeat:no-repeat;
        white-space:nowrap;
        width:100%;
        height:600px;
        filter:alpha(opacity=70);
        -moz-opacity: 0.7;
        opacity: 0.7;
        -khtml-opacity:0.7;
    }
</style>
<script>
    import {user_routerConfig} from './../../config/RouterConfig'
    export default{
        mounted(){
            console.log(this.$route.query)
            console.log(this.$route.query.redirect)
            console.log(this.$route.query.redirect + this.$route.hash)
            console.log(this.$route.fullPath)
            if(localStorage.getItem('auth_time')!=null){
                if(!localStorage.getItem('auth_time')||parseInt(localStorage.getItem('auth_time'))+5000>=Date.parse(new Date())){
                    this.isLogin=true;
                }else{
                    this.isLogin=false;
                }
                if(this.isLogin){
                    setTimeout(()=>{
                        self.location='http://127.0.0.1:8080/member/#/'
                    },1000);
                }
            }
        },
        data(){
            let checkUserName=(rule,value,callback)=>{
                if(!value){
                    callback(new Error('用户名不能为空'));
                }else if(!/\w{3,10}/.test(value)){
                    callback(new Error('用户名不符合规则'));
                }else{
                    callback();
                }
            };
            let checkPass=(rule,value,callback)=>{
                if(!value){
                    callback(new Error('密码不能为空'));
                }else if (!(/[0-9]+/.test(value) && /[A-Z]+/.test(value) && /[a-z]+/.test(value) && /\w{3,20}/.test(value))){
                    callback(new Error('密码必须包含大小写字母数字，不少于6位'));
                }else{
                    callback();
                }
            };
            return {
                loginForm:{
                    user_name:"",
                    user_pass:""
                },
                rules:{
                    user_name:[
                        {validator:checkUserName,trigger:'blur'}
                    ],
                    user_pass: [
                        {validator:checkPass,trigger:'blur'}
                    ],
                },
                isLogin:false
            }
        },
        methods:{
            UserLogin(){
                this.$refs['login'].validate((v)=>{
                    if(v){
                        let userInfo={
                            user_name:this.loginForm.user_name,
                            user_pass:this.loginForm.user_pass,
                        };
                        let address='';
                        if(JSON.stringify(this.$route.query) != '{}' && this.$route.query.redirect){
                            address=this.$route.query.redirect + this.$route.hash
                        }else{
                            address='/member/';
                        }
                        this.$store.dispatch('userLogin',{url:this.APIConfig.getUser,userInfo:userInfo,address});
                    }else{
                        alert('userName or password must input!');
                    }
                })
            },
            clear(){
                localStorage.removeItem('user_name');
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_time');
            }
        }
    }
</script>