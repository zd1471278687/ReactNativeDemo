/**
  * 标题组件
  */
import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity
 } from 'react-native';

 /**
  * 回退按钮
  * @returns {XML}
  * @constructor
  */
 let BackView = (data) => {
     let backEnum = data && data.backEnum;

     let backItem;
     if(data && data.backEnum === 'Close'){
         backItem=<Image source={ require("./images/rn-topbar-close.png") }/>
     } else if (data && data.backEnum === 'Title') {
         backItem=<Text>返回</Text>
     } else{
         backItem= data.isWhite?<Image source={ require("./images/rn-topbar-nav-back-white.png") }/>:<Image source={ require("./images/rn-topbar-nav-back.png") }/>;
     }
     return (
         backItem
     )
 };

 module.exports = BackView;
