/**
 * Created by szl4zsy on 3/15/2017.
 */
import functions from './functions';
import APIConfig from './../config/APIConfig';
export default{
    //Vue.use插件，如果插件是一个对象，则必须提供一个install方法，如果插件式个函数，他会被作为install方法。
    install(Vue){
        Vue.prototype.functions=functions;
        Vue.prototype.APIConfig=APIConfig;
        Function.prototype.after=function(fn){
            let self=this;
            return function(){
                let ret=self.apply(this,arguments);
                if(ret='nextStep'){
                    return fn.apply(this,arguments);
                }
                return ret;
            }
        }
    }
}