<template>
    <el-row>
        <el-col :span="18">
            <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
                <el-menu-item v-for="item in this.$store.state.res.navbar" :key="item.nav_id" :index="item.nav_url">
                    {{item.nav_text}}
                </el-menu-item>
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
        <el-col :span="6">
            <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="false">
                <el-menu-item index="4" v-if="!isLogin"><a @click="login">登录</a>/<a @click="register">注册</a></el-menu-item>
                <el-menu-item index="5" v-if="isLogin">{{this.$store.state.res.userName}}</el-menu-item>
                <el-menu-item index="logout" v-if="isLogin">注销</el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        created(){
            let userName=localStorage.getItem('user_name');
            if(userName != null && userName != undefined){
                this.$store.state.res.userName=userName;
                this.isLogin=true;
            }
            this.$store.dispatch('loadData',{url:this.APIConfig.NavBar,key:'navbar'});
        },
        data() {
            return {
                activeIndex2: '/',
                isLogin:false,
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                if(key=="logout"){
                    this.logout();
                }
            },
            login(){
                self.location='/user#/login';
            },
            register(){
                self.location='/user#/reg';
            },
            logout(){
                this.$store.dispatch('userLogout',function(){
                    self.location='/user/#/login';
                })
            }
        }
    }
</script>