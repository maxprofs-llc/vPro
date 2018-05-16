/**
 * Created by SZL4ZSY on 3/15/2017.
 */
import Vue from 'vue';
import Axios from 'axios'
import {KJUR, b64utoutf8} from 'jsrsasign'
export default{
    state:{
        step:0,
        userObj:{
            get auth_token(){
                let auth_token=localStorage.getItem('auth_token');
                if(auth_token==null||auth_token==undefined){
                    return "";
                }
                return auth_token;
            },
            get auth_id(){
                let auth_id=localStorage.getItem('auth_id')
                if(auth_id==null || auth_id==undefined){
                    return false
                }
                return auth_id
            },
            get auth_appid(){
                let auth_appid=localStorage.getItem('auth_appid')
                if(auth_appid==null||auth_appid==undefined){
                    return false
                }
                return auth_appid
            }
        },
    },
    mutations:{
        setFrontData(state, {data}){
            console.log(data)
            for(let i in data){
                state['userObj'][i]=data[i]
            }
            console.log(state['userObj']);
        },
        setLocalStorageData(state, {data}){
            for(let i in data){
                localStorage.setItem(i, data[i])
            }
            console.log(localStorage)
        },
        setUserData(state,data){
            state[data.container][data.key]=data.value;
        },
        setStep(state,num){
            state.step=num;
            // if (state.step++ > 2) state.step = 0;
        },
        setUser(state,data){
            localStorage.setItem('user_name',data.user_name);
            localStorage.setItem('auth_id',data.auth_id);
            localStorage.setItem('auth_token',data.auth_token);
            localStorage.setItem('auth_time',Date.parse(new Date()));
        },
    },
    actions:{
        auth(context,url){
            Axios.get(url+'?token='+context.state.userObj.auth_token).then().catch()
        },
        loadUserStep(context,{url,key}){
            if(Object.keys(context.state.userObj).length>0){
                let loading=Vue.prototype.$loading({
                    text:'正在加载中'
                });
                Vue.http.get(url,{params:{id:context.state.userObj.user_id}},{timeout:5000}).then(
                    msg=>{
                        loading.close();
                        context.commit('setStep',{key:key,data:msg.body['user_step']});
                    },
                    function(error){
                        console.log('error!');
                        console.log(error);
                        loading.close();
                        Vue.prototype.$notify.error({
                            title: '错误',
                            message: '数据未成功加载！'
                        });
                    }
                )
            }
        },
        postUser(context,{url,key,body}){
            // if(Object.keys(context.state.userObj).length>0){
                let loading=Vue.prototype.$loading({
                    text:'正在加载中'
                });
                return Vue.http.post(url,{key:body},{emulateJSON:true},{timeout:5000}).then(
                    msg=>{
                        loading.close();
                        return msg.body;
                    },
                    function(error){
                        console.log('error!');
                        console.log(error);
                        loading.close();
                        Vue.prototype.$notify.error({
                            title: '错误',
                            message: '数据提交失败！'
                        });
                    }
                );
            // }
        },
        userLogin(context,{url,userInfo,address}){
            Axios.post(url,userInfo).then(res=>{
                console.log(res.data)
                if(res!=null && res.data!=undefined && 'auth_token' in res.data){
                    if(res.data.auth_token!=''){
                        userInfo.auth_token=res.data.auth_token
                        userInfo.auth_id=res.data.auth_id
                        for(let i in userInfo){
                            context.commit('setUserData',{key:i,value:userInfo[i],container:'userObj'})
                        }
                        context.commit('setUser',userInfo)
                        self.location=address
                        return true
                    }else{

                    }
                }
            }).catch(err=>{
                console.log(err)
                return false
            })
        },
        userLogout(context,callback){
            let auth_id=context.state.userObj.auth_id;
            if( auth_id!='') {
                Axios.get('http://223.112.88.211:9696/index.php/auth/logout?id='+auth_id).then(res=>{
                    if(res.data.status=='success'){
                        localStorage.removeItem('user_name');
                        localStorage.removeItem('auth_token');
                        localStorage.removeItem('auth_time');
                        localStorage.removeItem('auth_id');
                        callback()
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        frontUserLogin(context, {url, data, saveKey}){
            console.log(data)
            Axios.post(url, data).then(res=>{
                if(res.data){
                    let auth_token = res.data.auth_token
                    let payload = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(res.data.auth_token.split(".")[1]))
                    console.log(payload)
                    if(payload.auth_id && payload.auth_appid){
                        let userObj = {
                            "auth_id": payload.auth_id,
                            "auth_appid": payload.auth_appid,
                            "auth_token": auth_token
                        }
                        //context.commit这里是获取一个context,其实可以简洁一些，第一个参数变成{commit}就直接从context中取到commit了
                        context.commit('setFrontData', {data:userObj});
                        context.commit('setLocalStorageData', {data:userObj})
                        location.reload()
                    }else{
                        //错误指示
                    }
                }
            })
        },
        frontUserLogout(context, callback){
            let userInfo = context.state.userObj;
            Object.keys(userInfo).map(item=>{
                localStorage.removeItem(item)
            })
            location.reload()
        },
        step1(context,regInfo){
            if(regInfo.user_name!=''&&regInfo.user_pass!=''&&regInfo.user_id!=''){
                for(var i in regInfo){
                    context.commit('setUserData',{key:i,value:regInfo[i],container:'userObj'});
                }
                context.commit('setStep',1);
            }
        },
        step2(context,regInfo){
            console.log(regInfo);
            console.log(context.state.userObj);
            if(regInfo.user_tel!=''&&regInfo.user_id==context.state.userObj.user_id){
                delete regInfo.user_id;
                for(var i in regInfo){
                    context.commit('setUserData',{key:i,value:regInfo[i],container:'userObj'});
                }
                context.commit('setStep',2);
            }
        },
    },
    getters:{
        getStep:state=>{
            return state.step;
        },
        auth_appid:state=>state.userObj.auth_appid,
        auth_id:state=>state.userObj.auth_id
    }
}