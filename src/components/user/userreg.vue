<template>
    <div>
        <el-steps :space="100" :active="getStep" finish-status="success">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
        </el-steps>
        <el-form  label-width="80px" :model="regForm" ref="regForm" :rules="regRules" v-if="this.$store.getters.getStep==0">
            <el-form-item label="用户名：" prop="user_name">
                <el-input v-model="regForm.user_name"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="user_pass">
                <el-input v-model="regForm.user_pass" type="password"></el-input>
            </el-form-item>
            <el-form-item label="重复密码：" prop="user_confirm">
                <el-input v-model="regForm.user_confirm" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button style="margin-top: 12px;" @click="next1">下一步</el-button>
            </el-form-item>
        </el-form>
        <el-form  label-width="80px" :model="regForm" ref="regForm" :rules="regRules" v-if="this.$store.getters.getStep==1">
            <el-form-item label="手机：" prop="user_tel">
                <el-input v-model="regForm.user_tel"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button style="margin-top: 12px;" @click="next2">下一步</el-button>
            </el-form-item>
        </el-form>
        <el-form  label-width="80px" :model="regForm" ref="regForm" :rules="regRules" v-if="this.$store.getters.getStep==2">
            <el-form-item label="完成">

            </el-form-item>
            <el-form-item>
                <el-button style="margin-top: 12px;" @click="next3">完成</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        created(){
            if(Object.keys(this.$store.state.user.userObj).length>0 && this.$store.state.user.userObj.user_id>0){
                this.$store.dispatch('loadUserStep',{url:this.APIConfig.getUser,key:'step'});
            }
        },
        data() {
            var checkUserPass=(rule,value,callback)=>{
                if(value===''){
                    callback(new Error('密码不能为空！'));
                }else{
                    if(this.regForm.user_confirm!==''){
                        this.$refs.regForm.validateField('user_confirm');
                    }
                    callback();
                }
            };
            var checkUserConfirm=(rule,value,callback)=>{
                if(value===''){
                    callback(new Error('请再次输入密码！'));
                }else if(value!==this.regForm.user_pass){
                    callback(new Error('两次密码输入不一致!'));
                }else{
                    callback();
                }
            };
            var checkUserTel=(rule,value,callback)=>{
                if(value===''){
                    callback(new Error('请输入手机号码！'));
                }else if(!/\d{11,11}/.test(value)){
                    callback(new Error('请输入有效的手机号码！'));
                }else{
                    callback();
                }
            };
            return {
                step:0,
                active:0,
                regForm: {
                    user_name: '',
                    user_pass: '',
                    user_confirm:'',
                    user_tel:''
                },
                regRules:{
                    user_pass:[
                        {validator:checkUserPass,trigger:'blur'},
                    ],
                    user_confirm:[
                        {validator:checkUserConfirm,trigger:'blur'}
                    ],
                    user_tel:[
                        {validator:checkUserTel,trigger:'blur'}
                    ]
                }
            };
        },
        methods: {
            next1() {
                this.$refs.regForm.validate((valid)=>{
                    if(valid){
                        let data={
                            user_name:this.regForm.user_name,
                            user_pass:this.regForm.user_pass,
                            user_step:1
                        };
                        let url=this.APIConfig.getUser + '/addinfo';
                        this.$store.dispatch('postUser',{url:url,key:false,body:data}).then((res)=>{
                            if(res.status){
                                data.user_id=res.user_id;
                                this.$store.dispatch('step1',data);
                            }else{

                            }
                        });
                    }else{
                        console.log('error');
                        return false;
                    }
                })
            },
            next2(){
                this.$refs.regForm.validate((valid)=>{
                    if(valid){
                        let data={
                            user_id:this.$store.state.user.userObj.user_id,
                            user_tel:this.regForm.user_tel,
                            user_step:2
                        };
                        this.$store.dispatch('postUser',{url:this.APIConfig.regUser,key:false,body:data}).then((res)=>{
                            if(res.status){
                                this.$store.dispatch('step2',data);
                            }else{
                                console.log(res.message);
                            }
                        })

                    }
                })
            },
            next3(){
                let data = {
                    user_id: this.$store.state.user.userObj.user_id,
                    user_isinit:1
                };
                this.$store.dispatch('postUser', {url: this.APIConfig.regUser, key: false, body: data}).then((res)=> {
                    if (res.status) {
                        self.location='http://localhost:8080/member#/';
                    } else {
                        console.log(res.message);
                    }
                })
            }
        },
        computed:{
            getStep(){
                return this.$store.getters.getStep;
            }
        }
    }
</script>