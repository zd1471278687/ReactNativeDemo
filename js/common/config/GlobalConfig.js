/**
  * 全局常量
  */
import React from 'react'

// ------------------------布局相关------------------------
var Dimensions = require('Dimensions');
export default {
    ScreenWidth : Dimensions.get('window').width,
    ScreenHeight : Dimensions.get('window').height,
    ScreenScale : Dimensions.get('window').scale,
}
