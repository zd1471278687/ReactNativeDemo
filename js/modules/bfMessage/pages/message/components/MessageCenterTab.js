/**
 * 消息中心顶部tab
 */
 import React from 'react'
 import {
   View,
   Text,
   Platform,
   StyleSheet,
   TouchableHighlight,
   ART,
 } from 'react-native';

 import Bridge from "./../../../../../common/bridge/bridge";
 import GlobalConfig from './../../../../../common/config/GlobalConfig';
 const {Surface, Shape, Path} = ART;
 const ACTIVITY_TAB_ID = '1';
 const ORDER_TAB_ID = '2';
 const SYSTEM_TAB_ID = '3';

 class MessageCenterTab extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
         currentTab: ACTIVITY_TAB_ID,
         activityHasNotice: false, //动福利是否有未读消息（默认选中所以为false）
         orderHasNotice: false, //订单通知是否有未读消息
         systemHasNotice: false, //系统通知是否有未读消息
     };
   }

   componentWillReceiveProps(object) {
     this.state.orderHasNotice = this.props.orderNotice;
     this.state.systemHasNotice = this.props.systemNotice;
   }

   render() {
     let activitySelect = this.state.currentTab === ACTIVITY_TAB_ID; //选中活动福利
     let orderSelect = this.state.currentTab === ORDER_TAB_ID; //选中订单通知
     let systemSelect = this.state.currentTab === SYSTEM_TAB_ID; //选中系统通知
     return (
       <View style={styles.root}>
         <View style={styles.container}>
            {this._tabView('活动福利', ACTIVITY_TAB_ID, activitySelect, this.state.activityHasNotice)}
            {this._tabView('订单通知', ORDER_TAB_ID, orderSelect, this.state.orderHasNotice)}
            {this._tabView('系统通知', SYSTEM_TAB_ID, systemSelect, this.state.systemHasNotice)}
         </View>
         <View style={styles.lineContainer}>
          <View style={activitySelect ? styles.selectLine : styles.unselectLine}/>
          <View style={orderSelect ? styles.selectLine : styles.unselectLine}/>
          <View style={systemSelect ? styles.selectLine : styles.unselectLine}/>
         </View>
       </View>
     )
   }

   _tabView(text, tabId, isSelect, showCircle) {
     let textStyle = isSelect ? styles.tabSelectText : styles.tabUnselectText;
     return (
       <TouchableHighlight style={{flex: 1}} underlayColor = "#f3f3f3" onPress={()=>{
         this._tabPressed(tabId)}}>
         <View style={styles.tabItemView}>
           <Text style={textStyle}>{text}</Text>
           {this._redCircleView(showCircle)}
         </View>
       </TouchableHighlight>)
   }

   _tabPressed(tabId) {
     if (tabId === ORDER_TAB_ID) {
       this.state.orderHasNotice = false;
     }
     if (tabId === SYSTEM_TAB_ID) {
       this.state.systemHasNotice = false;
     }
     this.setState({
       currentTab: tabId,
       orderHasNotice: this.state.orderHasNotice,
       systemHasNotice: this.state.systemHasNotice,
      }); //刷新展示
      this.props.callbackParent(tabId); //通知父组件
   }

   _redCircleView(showCircle) {
     if (!showCircle) {
       return (<View/>)
     }
     const path = new Path()
            .moveTo(4,0)
            .arc(0,8,2)
            .arc(0,-8,2)
            .close();
     return (
       <View style={styles.circle}>
         <Surface width={8} height={8}>
           <Shape d={path} fill="#f00"/>
         </Surface>
       </View>
     )
   }
 }

 var styles = StyleSheet.create({
   root: {
     height: 52,
     flexDirection: "column",
   },
   container: {
     height: 50,
     justifyContent: 'center',
     alignItems:'center',
     flexDirection: "row",
     backgroundColor: '#fff'
   },
   lineContainer: {
     height: 2,
     flexDirection: "row",
     backgroundColor: '#f6f6f6'
   },
   tabItemView: {
     flex: 1,
     flexDirection: "row",
     justifyContent: 'center',
     paddingTop:14,
     paddingBottom: 14,
   },
   tabSelectText: {
     fontSize: 16,
     textAlign:'center',
     justifyContent: 'center',
     color: '#222',
   },
   tabUnselectText: {
     fontSize: 16,
     textAlign:'center',
     justifyContent: 'center',
     color: '#999',
   },
   circle: {
     width: 10,
     height: 10,
   },
   selectLine: {
     flex: 1,
     backgroundColor: '#fecd15',
   },
   unselectLine: {
     flex: 1,
     backgroundColor: '#0000',
   },
 });

 module.exports = MessageCenterTab;
