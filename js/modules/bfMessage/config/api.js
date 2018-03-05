/**
 * 消息请求URL
 */

let RELEASE = false;
let DEBUG = true;
let isDebug = DEBUG; //true:debug  false:release
let http = 'http://';
let https = 'https://';
let host = 'api.blackfish.cn';
let debugHost = 'api.tnp.fmc.sit.blackfi.sh:10025';
let baseUrl = isDebug ? (http + debugHost) : (https + host); //debug:http+debugHost   release:https+host

export default {
    //修改消息状态
    requestMessageStatus: baseUrl + '/tnp/app/message/modify',

    //是否有未读消息
    requestHaveNewMessage: baseUrl + '/tnp/app/message/hasNewMessage',

    //消息列表
    requestMessageList: baseUrl + '/tnp/app/message/queryList'
}
