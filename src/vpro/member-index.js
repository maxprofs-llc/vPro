/**
 * Created by szl4zsy on 3/14/2017.
 */
import 'babel-polyfill';
require("qiniu-js/dist/qiniu.min.js");
import Vue from 'vue'
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui'
import VueResource from 'vue-resource';
import 'element-ui/lib/theme-chalk/index.css';
import './../css/common.css';
import navbar from './../components/member/navbar.vue'
import global from './global';
import ResModule from './../store/modules/ResModule';
import VideoModule from './../store/modules/VideoModule';
import UserModule from './../store/modules/UserModule';
import {routerConfig} from './../config/RouterConfig';

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(global);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.component('navbar',navbar);
const vuex_store=new Vuex.Store({
    state:{
        uploader:"",
        editData:[]
    },
    mutations:{},
    actions:{},
    getters:{},
    modules:{
        res:ResModule,
        video:VideoModule,
        user:UserModule,
    }
});

new Vue({
    el:'.container',
    store:vuex_store,
    router:routerConfig,
});