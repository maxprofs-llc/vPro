/**
 * Created by SZL4ZSY on 3/15/2017.
 */
import VueRouter from 'vue-router';
// const webIndex = r =>require.ensure([],()=>(require('./../components/web/index.vue')),'webIndex')
import webIndex from './../components/web/index.vue';
// const home = r =>require.ensure([],()=>(require('./../components/web/home.vue')),'home')
import home from './../components/web/home.vue';
// const course = r =>require.ensure([],()=>(require('./../components/web/course.vue')),'course')
import course from './../components/web/personal.vue';
// const detail = r =>require.ensure([],()=>(require('./../components/web/detail.vue')),'detail')
import detail from './../components/web/detail.vue';
// const category = r =>require.ensure([],()=>(require('./../components/web/category.vue')),'category')
import category from './../components/web/category.vue';
// const settle = r =>require.ensure([],()=>(require('./../components/web/settle.vue')),'settle')
import settle from './../components/web/settle.vue';
// const cart = r =>require.ensure([],()=>(require('./../components/web/cart.vue')),'cart')
import cart from './../components/web/cart.vue';
import orders from './../components/web/orders.vue';
import play from './../components/web/play.vue';
// const orders = r =>require.ensure([],()=>(require('./../components/web/orders.vue')),'orders')
import memberIndex from './../components/member/index.vue';
import publish from './../components/member/publish.vue';
import vlist from './../components/member/vlist.vue';
import info from './../components/member/info.vue';
import modify from './../components/member/modify.vue';
import action from './../components/user/useraction.vue';
import login from './../components/user/userlogin.vue';
import register from './../components/user/userreg.vue';

/*
const memberIndex = r =>require.ensure([],()=>(require('./../components/member/index.vue')),'memberIndex')
const publish = r =>require.ensure([],()=>(require('./../components/member/publish.vue')),'publish')
const vlist = r =>require.ensure([],()=>(require('./../components/member/vlist.vue')),'vlist')
const info = r =>require.ensure([],()=>(require('./../components/member/info.vue')),'info')
const modify = r =>require.ensure([],()=>(require('./../components/member/modify.vue')),'modify')
const action = r =>require.ensure([],()=>(require('./../components/user/useraction.vue')),'action')
const login = r =>require.ensure([],()=>(require('./../components/user/userlogin.vue')),'login')
const register = r =>require.ensure([],()=>(require('./../components/user/userreg.vue')),'register')
*/


export const routerConfig=new VueRouter({
    routes:[
        {path:'/',component:memberIndex,name:'memberIndex',
            children:[
                {path:'/pub',component:publish,name:'publish'},
                {path:'/vlist',component:vlist,name:'vlist'},
                {path:'/info',component:info,name:'info'},
                {path:'/modify',component:modify,name:'modify'},
            ],
            //添加该属性，可以在router对象中找到，用于判断一些权限
            meta:{
                requireAuth:true
            }
        },
    ]
});
//导航钩子函数
/**
 * to: 即将进入的目标路由对象
 * from：当前导航正要离开的路由
 * next：function，用来resolve钩子，执行效果依赖next函数。next传入的是一个路由对象，例如next({path:'/login',query:{redirect:to.fullPath}})
 */
routerConfig.beforeEach((to, from, next)=>{
    if(to.matched.some(res=>res.meta.requireAuth)){
        let auth=localStorage.getItem('auth_token')
        if(auth != undefined || auth != null){
            next()
        }else{
            let fullpath=window.document.location.href
            window.location.href=fullpath.substring(0,fullpath.indexOf(fullpath.pathname)) + '/user#/login' + '?redirect='+fullpath
        }
    }else{
        next()
    }
})
export const user_routerConfig=new VueRouter({
    routes:[
        {path:'/',component:action,redirect:'/login',
            children:[
                {path:'/login',component:login,name:'login'},
                {path:'reg',component:register,name:'register'}
            ]
        }
    ]
});
export const web_routerConfig=new VueRouter({
    scrollBehavior: (to, from, savedPosition) => {
        // console.log(savedPosition)
        return { y: 0 }
    },
    routes:[
        {path:'/',component:webIndex,name:'webIndex',redirect:'/home',
            children:[
                {path:'home',component:home,name:'home'},
                {path:"index/:nav", component:home, name:"index"},
                {path:'personal',component:course, name:'personal'},
                {path:'detail/:course_id',component:detail, name:'detail' },
                {path:'cart',component:cart, name:'cart'},
                {path:'settle', component:settle, name: 'settle'},
                {path:"category/:nav", component:category, name:"category"},
                {path:"orders", component:orders, name:"orders"},
                {path: "play", component: play, name: "play"}
            ]
        },
    ]
});
