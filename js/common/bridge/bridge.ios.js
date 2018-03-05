import {
    NativeModules,
    CameraRoll,
} from 'react-native';
import {DeviceEventEmitter} from 'react-native';
export default {

    /**
     * @method getGPS
     * @param params Object
     * @param callback Function
     * @description 获取定位信息
     * @update
     * @example
     * bridge.getGPS(null,function(d){
     *  if(d.success){
     *    var data=d.data;
     *    console.log(data.name); //GPS定位的城市名
     *    console.log(data.code); //GPS定位的城市code
     *    console.log(data.letter); //GPS定位的城市英文缩写
     *    console.log(data.lat); //GPS定位纬度
     *    console.log(data.lng); //GPS定位经度
     *    console.log(data.address); //GPS定位到的地址
     *    console.log(data.belongName); //归属城市名
     *    console.log(data.belongCode); //归属城市code
     *    console.log(data.belongLetter); //归属城市英文缩写
     *    console.log(data.orderCityName); //预订城市名
     *    console.log(data.orderCityCode); //预订城市code
     *    console.log(data.orderCityLetter); //预订城市英文缩写
     *    console.log(data.startCityName); //用户点击左上角选择的城市名
     *    console.log(data.startCityCode); //用户点击左上角选择的城市code

     *  }
     * })
     */
    getGPS:function(params,callback){
        callback = callback || function(callbackParams){};
        NativeModules.BFReactNativeUtil.rn_ios_loadCitycallBack(callback);
    },

    /**
     * @method getSessionId
     * @param params Object
     * @param callback Function
     * @description 获取客户端sessionid
     * @update
     * @example
     * bridge.getSessionId(null,function(d){
     *  if(d.success){
     *    var data=d.data;
     *    console.log(data.sessionId); //sessionId
     *  }
     * })
     */
    getSessionId:function(params,callback){
      callback = callback || function(callbackParams){};
        NativeModules.BFReactNativeUtil.rn_ios_getSessionId(callback);
    },

    /**
     *
     * http请求方法
     * @param params { url:"http://api.tnp.fmc.sit.blackfi.sh:10025/tnp/app/message/queryList",
     *                type:"post",
     *                data:bizParam }
     * @param callback Function
     * @description 请求一个地址
     * @example
     */
    getRequest:function(params,callback){
        callback = callback || function(callbackParams){};
        NativeModules.BFReactNativeUtil.rn_ios_httpRequestPromise(params, callback);
    },

    /**
     *
     * @methdd 跳转协议
     * @param params Object
     * @param callback Function
     * @description 打开一个URL
     * @example
     * bridge.setOpenUrl({"url":"http://www.blackfish.com"},function(d){
            console.log(d.success);
     * })
     */
    setOpenUrl:function(params,callback){
        callback = callback || function(callbackParams){};
        NativeModules.BFReactNativeUtil.rn_ios_parseUrl(params.url, callback);
    },

    /**
     *
     * @methdd setLinkBack
     * @param params Object
     * @param callback Function
     * @description 页面后退
     * @example
     * bridge.setLinkBack(null,function(d){
     * })
     */
    setLinkBack:function(params,callback){
        callback = callback || function(callbackParams){};
        NativeModules.BFReactNativeUtil.rn_ios_leftTopBarClick(callback);
    },

    /**
     *
     * @methdd setLinkLogin
     * @param callback Function
     * @description 弹出登录界面
     * @example
     * bridge.setLinkLogin(function(d){
        console.log(d.success);
     * })
     */
    setLinkLogin:function(params,callback) {
        callback = callback || function(callbackParams){};
        NativeModules.BFReactNativeUtil.rn_ios_login(callback);
    },

    /**
     *
     * @methdd setPhoneCall
     * @param params Object
     * @param callback Function
     * @description 拨打电话
     * @example
     * bridge.setPhoneCall({number:"13376052481"},function(d){
            console.log(d.success);
     * })
     */
    setPhoneCall:function(params,callback){
        callback = callback || function(callbackParams){};
        NativeModules.BFReactNativeUtil.rn_ios_call(params,callback);
    },
        /**
     *
     * @methdd toastShow
     * @param params Object
     * @param callback Function
     * @description toast
     * @example
     * bridge.toastShow("成功",function(d){
            console.log(d.success);
     * })
     */
    toastShow:function(params,callback){
        //native code here
        NativeModules.BFReactNativeUtil.rn_ios_toast(params,callback);
    },

    /**
     * 显示、隐藏loading
     * @param params true or false
     */
    setLoading:function(params){
        NativeModules.BFReactNativeUtil.rn_ios_setLoading(params);
    },

    /**
     * 发送通知
     * @param notifName
     * @param params
     */
    emitEventEmitter:function (notiyfName, params) {
        DeviceEventEmitter.emit(notiyfName, JSON.stringify(params));
    },
    /**
     * 通知更新
     * @param notifName 通知名称
     * @param callback 回调
     * @returns {*} 返回值监听
     */
    addEventEmitterListener:function (notiyfName,callback) {
       return DeviceEventEmitter.addListener(notiyfName,callback);
    },

    /**
     * 移除监听
     * @param listener
     */
    removeEventEmitterListener:function (listener) {
        listener.remove();
    },

    /**
     * 获得用户相册的图片或者是使用相机，获得一个{base64:base64,path:path} 的数组
     * @param params
     * maxCount int  最多可选择张数 default:9
     * rightText string :'' 右上角的按钮文字 default :'完成'
     * smallPicture BOOL  是否为小图、否则为大图 default:NO
     * @param callback
     */
    fetchLocalCameraRoll: function (params, callback) {
        callback = callback || function(callbackParams){};
        NativeModules.BFReactNativeUtil.rn_ios_fetchLocalCamereRoll(params,callback);
    },


    /**
     * @method setGestureBack
     * @param params Object
     * @param callback Function
     * @description 设置侧滑返回
     */
    setGestureBack(params, callback) {
        callback = callback || function(callbackParams){};
        NativeModules.BFReactNativeUtil.rn_ios_setRNGestureBack(params,callback);
    },

    /** 
     * * A-->B-->C-->D 
     * * @param params {popCount:2} 参数2,销毁2个页面,表示D直接返回到B,销毁D和C 
     * * @param callback  */
     popBackStack:function (params,callback) {
        callback = callback || function(callbackParams){};
        NativeModules.BFReactNativeUtil.rn_ios_popBackStack(params,callback)
     },

}
