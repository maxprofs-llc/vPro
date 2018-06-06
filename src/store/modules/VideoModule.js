import {routerConfig} from './../../config/RouterConfig';
import Vue from 'vue';
import Axios from './../../vpro/axios';
import {web_routerConfig} from "../../config/RouterConfig";
export default{
    state: {
        indexNav: [],
        videoList: [],
        //分页页数
        listPagination: "",
        //每一个课程的详细信息
        lessonDetail: [],
        video: {
            video_title: '',
            video_class: 2,
            video_desc: "",
            video_mode: 'free',
            video_price: 0,
            video_videokey: '',  //上传到七牛后的key
            video_cover: {
                name: '',
                url: '',
                id: 0
            },
            video_tag: [],
            video_file_url: '',
            video_file_id: ''
        },
        //购物车信息
        cartInfo: [],
        //订单信息
        orderInfo: [],
        //优惠券信息
        couponInfo: [],
        //最后的购买信息
        payment: {
            payUrl: true,
        },
        edit_video_info:[],
        videoDetail:{},
        orderHistory:{}
    },
    mutations:{
        setVideoData(state,{key,data}){
            state[key]=data;
            // console.log(state[key])
        },
        delCartInfo(state, {key, course_id}){
            for (let i in state[key]){
                console.log(state[key])
                if(state[key][i].cart_course_id === course_id){
                    Vue.delete(state[key], i)
                }
            }
        }
    },
    actions:{
        changeUsed(context,{url,body}){
            return Axios.post(url,body).then(res=>{
                if(res.data.status==='success'){
                    Vue.prototype.$message.success({
                        message:'图片删除成功！',
                        type:'success'
                    });
                }
            }).catch(err=>{
                console.log(err)
                Vue.prototype.$notify.error({
                    title: '错误',
                    message: '数据提交失败！'
                });
            })
        },
        /**
         * 将该行视频数据发送到待修改的数据容器中。
         * @param context
         * @param data
         */
        transferEdit(context,data){
            context.commit('setVideoData',{key:"edit_video_info",data:data})
            routerConfig.push({path:'/pub'});
        },
        loadDetail(context,{url,nav,key,page=1}){
                let loading = Vue.prototype.$loading({
                    text: '正在加载中'
                });
                return Axios.get(url, {
                    timeout: 5000,
                    params:{
                        category:nav,
                        p:page
                    }
                }).then(
                    res=>{
                        loading.close();
                        let gainRes = res.data;
                        // console.table(gainRes);
                        context.commit('setVideoData', {key:key, data:gainRes})
                }).catch(err=>{
                    loading.close();
                    Vue.prototype.$notify.error({
                        title: '错误',
                        message: '数据未成功加载！'
                    });
                })
        },
        addToCart(context, {url, data}){
            return Axios.post(url,data).then(res=>{
                if(res.data.hasOwnProperty("status")){
                    if(res.data.status){
                        context.commit('delCartInfo', {key:"cartInfo",course_id:res.data.course_id})
                    }
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        putOrder(context, {url, data, key}){
            return Axios.post(url, data).then(res=>{
                console.log(res.data)
                if(!res.data['status']){
                    console.log(res.data)
                }else{
                    console.log(res.data)
                    context.commit('setVideoData', {key:"payUrl", data:res.data['order_pay_url']})
                }

            })
        },
        submitVideo(context,video){
            video.video_author=context.rootState.user.userObj.auth_id
            Axios.post('http://223.112.88.211:9696/index.php/video/submitvideo',
                {
                    video
                }).then(res=>{
                    console.log(res.data)
                    routerConfig.push({path:'/vlist'})
            }).catch(err=>{
                console.log(err)
            });
        },
        modifyVideo(context,postData){
            Axios.post('http://223.112.88.211:9696/index.php/video/modifyvideo',
                {
                    video:postData
                }).then(msg=>{
                    console.log(msg.data);
                    if(msg.data.status=='success'){
                        routerConfig.push({path:'/vlist'});
                    }else{
                        console.log(msg.data);
                        Vue.prototype.$notify.error({
                            title: '错误',
                            message: '数据未被修改 ！'
                        });
                    }
                }).catch(error=>{
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
        })}
    },
    getters:{
        edit_video_info(state){
            return state.edit_video_info
        },
        video_list(state){
            return state.videoList
        },
        payment(state){
            return state.payment
        },
        orderHistory(state){
            return state.orderHistory
        }
    }
}
