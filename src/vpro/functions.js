/**
 * Created by szl4zsy on 3/15/2017.
 */
import {KJUR, b64utoutf8} from 'jsrsasign'
import { JSEncrypt } from 'jsencrypt'
export default{
  getVersion(){
    return '1.0';
  },
  /**
   * 该函数用来复制对象内容，如果直接那个使用obja=objb，实际上并不是传递值，而是地址，所以a的改变直接导致b也改变了！！！
   * 该函数可以理解为对值的传递。
   * 首先创建一个空对象，然后迭代传入的对象，检查键值对，如果值是对象，那么判断是否是数组，根据数组和对象，创建不同的初值。
   * 然后递归，继续检查值下面的
   * @param p
   * @param c
   * @returns {*|{}}
   */
  deepCopy(p, c) {
    var c = c || {};
    for (var i in p) {
      if(! p.hasOwnProperty(i)){
        continue;
      }
      if (typeof p[i] === 'object') {
        c[i] = (p[i].constructor === Array) ? [] : {};
        this.deepCopy(p[i], c[i]);
      } else {
        c[i] = p[i];
      }
    }
    return c;
  },
  genNonDuplicateID(){
    return (String(Math.floor(Math.random()*10000))) + String(new Date().getTime())
  },
  verifyTokenExpiration(auth_token){
    let payload = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(auth_token.split(".")[1]))
    if(payload.auth_id && payload.auth_appid && payload.exp) {
      return (parseInt(payload.exp) > parseInt(String((new Date()).getTime()).substr(0, 10))) ? true : false
    }
  },
  setCookie(name,value,myDay){
    let oDate=new Date();
    oDate.setDate(oDate.getDate()+myDay);
    document.cookie=name+'='+value+'; expires='+oDate;
  },
  getCookie(name){
    let arr=document.cookie.split('; ');
    for(let i=0;i<arr.length;i++){
      let arr1=arr[i].split('=');
      if(arr1[0] === name){
        return arr1[1];
      }
    }
    return '';
  },
  checkLocalData(key){
    let data = localStorage.getItem(key)
    if(data === null || data === undefined){
      return null
    } else {
      let expire = localStorage.getItem(key + 'expire')
      if(Math.ceil(((new Date()).getTime())/1000) < parseInt(expire)){
        return JSON.parse(data)
      }
      localStorage.removeItem(key)
      localStorage.removeItem(key+'expire')
      return null
    }
  },
  /**
   * 购物车信息放到本地存储
   * @param key
   * @param data
   * @param expire
   */
  addLocalData(key, data, expire){
    if(expire === undefined){
      expire = 3600*24
    }
    if(key && data){
      let now = Math.ceil((new Date()).getTime()/1000);
      localStorage.setItem(key,JSON.stringify(data))
      localStorage.setItem(key+'expire',(now+expire).toString())
    }
  },
  getLocalData(key){
    let expire = localStorage.getItem(key+"expire")
    let value = localStorage.getItem(key)
    if(expire !== null && expire !== undefined){
      let now = Math.ceil((new Date()).getTime()/1000);
      //过期时间比当前时间早，已过期
      if(localStorage.getItem(key+"expire") < now){
        localStorage.removeItem(key)
        localStorage.removeItem(key+"expire")
        return false
      }
    }
    if(value !== null && value !==undefined){
      return value
    }
    return false
  },
  removeCookie(name){
    this.setCookie(name, 1, -1);
  },
  encrypt(data, pubKey) {
    const jsencrypt = new JSEncrypt()
    jsencrypt.setPublicKey(pubKey)
    const enData = {}
    for(const key in data) {
      enData[key] =  jsencrypt.encrypt(data[key])
    }
    return enData
  },
  // 判断优惠券是否符合限制（金额限制和时间限制）
  checkCouponInfo(originCouponInfo, coursePrice) {
    let couponInfo = []
    if(originCouponInfo.length > 0) {
      let date = new Date()
      for (let i in originCouponInfo) {
        // 判断优惠券的金额是否满足限制
        couponInfo[i]['coupon_is_matched'] = couponInfo[i]['coupon_limit'] <= coursePrice
        for(let k in couponInfo[i]) {
          if(k.indexOf('date') >= 0){
            date.setTime(couponInfo[i][k] * 1000)
            console.log(
              date.getYear()+1900,
              date.getMonth()+1,
              date.getDate()
            )
            couponInfo[i][k]=(date.getYear()+1900)+' 年 '+ (date.getMonth()+1)+' 月 '+ (date.getDate()) + ' 日 '
          }
        }
      }
    }
    return couponInfo
  },
}