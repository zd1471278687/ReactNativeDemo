/**
  * 消息中心
  */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';

import Header from "./../../../../common/header/Header";
import Bridge from "./../../../../common/bridge/bridge";
import GlobalConfig from './../../../../common/config/GlobalConfig';
import ErrorView from './../../../../common/errorView/MessageErrorView';
import TabView from './components/MessageCenterTab';
import NoticeListItem from './components/NoticeListItem';
import ServiceURL from './../../config/api';

let pageTitle = "消息中心";
const ACTIVITY_TAB_ID = '1';
const ORDER_TAB_ID = '2';
const SYSTEM_TAB_ID = '3';
const MESSAGE_ACTIVITY = 2201;
const MESSAGE_SYSTEM = 2300;

class MessageCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        activityDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        orderDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        systemDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        currentTab: ACTIVITY_TAB_ID,
        orderHasNotice: false, //订单通知是否有未读消息
        systemHasNotice: false, //系统通知是否有未读消息
        isgetRequestOK: true,
    };
  }

  componentDidMount() {
      this._loadMessageInfo();
      this._changeMessageReadType(ACTIVITY_TAB_ID);
  }

  componentWillReceiveProps(object){
    if (!this.state.isgetRequestOK) {
          this._loadMessageInfo();
    }
  }

  render() {
    if (!this.state.isgetRequestOK) {
        // show error page
        return this._renderErrorPage();
    }
    return (
        <View style={styles.container}>
          <Header title={pageTitle} textColor='#000'/>
          <View style={styles.line}/>
          <TabView
          orderNotice={this.state.orderHasNotice}
          systemNotice={this.state.systemHasNotice}
          callbackParent={this._onChildChanged.bind(this)}/>
          {this._noticeListView()}
        </View>
    );
  }

  _renderRow(rowData, sectionID, rowID) {
      return (
          <View style={styles.rowstyle}>
              {rowData}
          </View>
      )
  }

  _noticeListView() {
    if (this.state.dataSource && this.state.dataSource._cachedRowCount > 0) {
      return (
        <ListView
          backgroundColor='#f6f6f6'
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          automaticallyAdjustContentInsets={false}
          scrollsToTop={false}/>
      )
    } else {
      return (
        <ErrorView errorImage={require('./../../images/rn-error-message.png')}
        errorTitle={'暂无消息'} errorDetail={'哎呀～还没有消息哦！'}/>
      )
    }
  }

  _onChildChanged(tabId) { //tab子组件回调，一定记得要绑定
    let listData = [];
    if (tabId === ORDER_TAB_ID) {
      listData = this.state.orderDataSource;
    } else if (tabId === SYSTEM_TAB_ID) {
      listData = this.state.systemDataSource;
    } else {
      listData = this.state.activityDataSource;
    }
    this.setState({
        currentTab: tabId,
        dataSource: listData,
    });
    this._changeMessageReadType(tabId); //清除tab下的未读项
  }

  _loadMessageInfo() { //获取消息列表数据
    Bridge.setLoading('{"isLoading":true}'); //展示loading
    let url = ServiceURL.requestMessageList;
    //msgType促销类：2100，订单类：2201,2202,2203,2204,2205，系统通知类：2300
    Bridge.getRequest({url, type: "get", data: {"queryFlag":0,"msgType":"2201,2202,2203,2204,2205,2300"}}, (d) => {
      Bridge.setLoading('{"isLoading":false}'); //隐藏loading
        if (d && d.success && d.data && d.data.content) {
          this._getListData(d.data);
        }
        else {
            this.setState({
                isgetRequestOK: false,
            });
        }
    })
  }

  _changeMessageReadType(tabId) { //修改消息读取状态
    let url = ServiceURL.requestMessageStatus;
    //modifyFlag 1:删除;2:已读 msgClass 1:促销类 2:订单类 3:系统通知类
    Bridge.getRequest({url, type: "POST", data: {"modifyFlag":2,"msgClass":tabId}}, (d) => {
    })
  }

  _getListData(outputData) { //构造列表数据
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let itemCurrent = [];
    let itemActivity = [];
    let itemOrder = [];
    let itemSystem = [];
    let orderHasNoRead = false; //订单通知是否有未读
    let systemHasNoRead = false; //系统通知是否有未读
    for (let i = 0; i < outputData.content.length; i++) {
        let itemData = outputData.content[i];
        let jumpUrl = itemData.activity ? itemData.activity : itemData.url;
        if (MESSAGE_ACTIVITY === itemData.msgType) { //活动福利
          itemActivity.push(
              <NoticeListItem
                title = {itemData.title}
                text = {itemData.text}
                sendTime = {itemData.sendTime}
                msgType = {itemData.msgType}
                activity = {jumpUrl}/>);
        } else if (MESSAGE_SYSTEM === itemData.msgType) { //系统通知
          if (itemData.readFlag === 0) {
            systemHasNoRead = true; //有未读消息
          }
          itemSystem.push(
              <NoticeListItem
                title = {itemData.title}
                text = {itemData.text}
                sendTime = {itemData.sendTime}
                msgType = {itemData.msgType}
                activity = {jumpUrl}/>);
        } else { //订单通知
          if (itemData.readFlag === 0) {
            orderHasNoRead = true; //有未读消息
          }
          itemOrder.push(
              <NoticeListItem
                title = {itemData.title}
                text = {itemData.text}
                sendTime = {itemData.sendTime}
                msgType = {itemData.msgType}
                picUrl = {itemData.picUrl}
                activity = {jumpUrl}/>);
        }
    }
    this.setState({
        activityDataSource: ds.cloneWithRows(itemActivity),
        orderDataSource: ds.cloneWithRows(itemOrder),
        systemDataSource: ds.cloneWithRows(itemSystem),
        orderHasNotice: orderHasNoRead,
        systemHasNotice: systemHasNoRead,
        isgetRequestOK: true,
    });
    this._onChildChanged(this.state.currentTab);
  }

  _renderErrorPage() {
      return (
        <View style={styles.container}>
          <Header title={pageTitle} textColor='#000'/>
          <View style={styles.line}/>
          <ErrorView errorImage={require('./../../images/rn-error-message.png')}
          errorTitle={'暂无消息'} errorDetail={'哎呀～还没有消息哦！'}/>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  line: {
    backgroundColor: '#eee',
    height: 0.5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  rowstyle: {
      flexDirection: "column",
  },
});
module.exports = MessageCenter;
