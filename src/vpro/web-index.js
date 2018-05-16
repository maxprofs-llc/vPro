import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './../css/common.css';
import global from './global';
import navbar from './../components/web/navbar.vue'
import modal from 'vue-js-modal'
import VideoModule from './../store/modules/VideoModule';
import UserModule from './../store/modules/UserModule';
import CommentModule from './../store/modules/CommentModule';
import {web_routerConfig} from './../config/RouterConfig';
import { getters } from './../store/getters'
require('./extend')

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(global);
Vue.use(VueRouter);
Vue.use(modal);
Vue.component('navbar',navbar);

const vuex_store=new Vuex.Store({
    state:{},
    mutations:{},
    actions:{},
    modules:{
        video:VideoModule,
        user:UserModule,
        comment: CommentModule
    },
    getters
});
let hub = new Vue()
new Vue({
    el:'.container',
    store:vuex_store,
    router:web_routerConfig
});