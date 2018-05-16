/**
 * Created by szl4zsy on 3/27/2017.
 */
import 'babel-polyfill';
import Vue from 'vue'
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui'
import VueResource from 'vue-resource';
import 'element-ui/lib/theme-chalk/index.css';
import './../css/common.css';
import global from './global';
import ResModule from './../store/modules/ResModule';
import UserModule from './../store/modules/UserModule';
import {user_routerConfig} from './../config/RouterConfig';

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(global);
Vue.use(VueResource);
Vue.use(VueRouter);
const vuex_store=new Vuex.Store({
    state:{},
    mutations:{},
    actions:{},
    getters:{},
    modules:{
        res:ResModule,
        user:UserModule
    }
});

new Vue({
    el:'.container',
    store:vuex_store,
    router:user_routerConfig,
});
