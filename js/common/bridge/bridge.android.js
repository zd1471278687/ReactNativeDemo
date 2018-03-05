'use strict';
import {
    NativeModules,
    Platform,
    BackAndroid
} from 'react-native';
import {DeviceEventEmitter} from 'react-native';
const AndroidUtil = NativeModules.AndroidUtil;

export default {
    /**
     * 封装JSON对象和JSON String的转换操作
     * @param methodName
     * @param params
     * @param callback
     */
    callAndroid: function (methodName, params, callback) {
        AndroidUtil[methodName](JSON.stringify(params), function (d) {
            callback && callback(JSON.parse(d));
        })
    },

    /**
     * @method getGPS
     * @param params Object
     * @param callback Function
     * @description 获取定位信息
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
     *    console.log(data.orderCityName); //预订城市名（用户点击左上角选择的）
     *    console.log(data.orderCityCode); //预订城市code（用户点击左上角选择的）
     *    console.log(data.orderCityLetter); //预订城市英文缩写（用户点击左上角选择的）

     *  }
     * })
     */
    getGPS: function (params, callback) {
        this.callAndroid("getLocation", params, callback);
    },

    /**
     * 跳转协议
     * @method setOpenUrl
     * @param params Object
     * @param callback Function
     * @description 打开一个URL
     * @example
     * bridge.setOpenUrl({"url":"http://www.blackfish.com"},function(d){
     * })
     */
    setOpenUrl: function (params, callback) {
        this.callAndroid("pageRouterUrl", params, callback);
    },

    /**
     * @method setLogPage
     * @param params Object
     * @param callback Function
     * @description 页面打点
     * @example
     * bridge.setLogPage({"currentPageName":"频道页","previousPageName":"首页"},function(d){
     * })
     */
    setLogPage: function (params, callback) {
        this.callAndroid("trackPage", params, callback);
    },

    /**
     * @method setLogEvent
     * @param params Object
     * @param callback Function
     * @description 事件打点
     * @example
     * bridge.setLogEvent({"eventName":"点击_顶部按钮___消息","currentPageName":"频道页","previousPageName":"首页"},function(d){
     * })
     */
    setLogEvent: function (params, callback) {
        this.callAndroid("trackEvent", params, callback);
    },

    /**
     * @method setLinkBack
     * @param params Object
     * @param callback Function
     * @description 页面后退
     * @example
     * bridge.setLinkBack(null,function(d){
     * })
     */
    setLinkBack: function (params, callback) {
        this.callAndroid("back", params, callback);
    },

    /**
     * @method setPhoneCall
     * @param params Object
     * @param callback Function
     * @description 拨打电话
     */
    setPhoneCall: function (params, callback) {
        this.callAndroid("callPhone", params, callback);
    },

    /**
     * @method toastShow
     * @param params Object
     * @param callback Function
     * @description 弹toast
     */
    toastShow: function (params, callback) {
        AndroidUtil.toast(params, function (d) {
            callback && callback(JSON.parse(d));
        });
    },

    /**
     * 显示、隐藏loading
     * @param params true or false
     */
    setLoading:function(params){
        AndroidUtil.setLoading(params);
    },

    /**
     * @method getRequest
     * @param params Object
     * @param callback Function
     * @description 请求http接口
     */
    getRequest: function (params, callback) {
        if (typeof params.url == "object") {
            this.callAndroid("advancedRequest", params, callback);
        } else {
            this.callAndroid("httpRequest", params, callback);
        }
    },

    /**
     * 协议定制中
     * 提交,通知更新
     * @param notifName 通知名称
     * @param params
     */
    emitEventEmitter: function (notifyName, params) {
        let obj = {
            notifyName: notifyName,
            params: JSON.stringify(params),
        };
        this.callAndroid('emitEventRN', obj, (d) => {
        });
    },

    /**
     * 添加监听 协议定制中
     * @param notifName 通知名称
     * @param callback 回调
     * @returns {*} 返回listener
     */
    addEventEmitterListener: function (notifyName, callback) {
        //接收事件
        return DeviceEventEmitter.addListener(notifyName, callback);
    },

    /**
     * 协议定制中
     * listener是由addEventEmitterListener返回的
     * @param listener 移除
     */
    removeEventEmitterListener: function (listener) {
        if (listener) {
            listener.remove();
        }
    },

    /**
     * 获得用户相册的图片或者是使用相机
     * @param params
     * maxCount int  最多可选择张数 default:9
     * smallPicture BOOL  是否为小图、否则为大图 default:NO
     * rightText string :'' 右上角的按钮文字 default :'完成'
     * @param callback
     */
    fetchLocalCamereRoll: function (params, callback) {
        this.callAndroid("openFileChoose", params, callback)
    },

    /**
     * 获取屏幕宽高
     * @param params
     * @param callback
     */
    getScreenSize: function (params, callback) {
        this.callAndroid("getScreenSize", params, callback)
    },

    /**
     * 监听scrollView事件
     * @param params
     * @param callback
     */
    setScrollListener: function (params, callback) {
        this.callAndroid("scrollListener", params, callback)
    },

    /**  A-->B-->C-->D 
     *  @param params {popCount:2} 参数2,销毁2个页面,表示D直接返回到B,销毁D和C 
     *  @param callback 
     */
    popBackStack: function (params, callback) {
        this.callAndroid("popBackStack", params, callback)
    },

    /**
     * 将网络图片保存到相册
     * @param params Object
     * @param callback
     * bridge.saveImageToPictures({url: imageUrl}, ()=> {})
     */
    saveImageToPictures: function (params, callback) {
        this.callAndroid("saveImageToPictures", params, callback);
    },

}
