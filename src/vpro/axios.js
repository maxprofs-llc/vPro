/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import { Loading, Message } from 'element-ui'
// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
    console.log(config)
    loadinginstace = Loading.service({ fullscreen: true })
    return config
}, error => {
    loadinginstace.close()
    Message.error({
        message: '加载超时'
    })
    return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
    console.log(data)
    loadinginstace.close()
    return data
}, error => {
    console.log(error.response)
    //取得完整的页面路径
    let fullpath=window.document.location.href
    if(error.response){
        switch (error.response.status){
            case 401:
                //跳转到登录页面，带上原始地址作为网址参数，登陆成功后跳转到原始地址
                window.location.href=fullpath.substring(0,fullpath.indexOf(fullpath.pathname)) + '/user#/login' + '?redirect='+fullpath
        }
    }
    loadinginstace.close()
    Message.error({
        message: '加载失败'
    })
    return Promise.reject(error)
})

export default axios