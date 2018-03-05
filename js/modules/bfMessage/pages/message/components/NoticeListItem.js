/**
 * 订单通知列表item
 */
 import React from 'react'
 import {
   View,
   Text,
   Image,
   Platform,
   StyleSheet,
   TouchableHighlight,
   ART,
 } from 'react-native';
 import Bridge from "./../../../../../common/bridge/bridge";
 const {Surface, Shape, Path} = ART;

 class NoticeListItem extends React.Component {
   constructor(props) {
     super(props);
   }

   render() {
     return (
       <TouchableHighlight style={{flex: 1}} underlayColor = "#f3f3f3" onPress={()=>{
         this._itemPressed()}}>
         <View style={styles.container}>
            <Text style={styles.titleText}>{this.props.title}</Text>
            {this._noticeDetailView()}
            <View style={styles.line}/>
            <View style={styles.containerRow}>
              <Image source={require('./../../../images/rn-notice-black-fish.png')} style={styles.smallImage}/>
              <Text style={styles.smallText}>小黑鱼</Text>
              <Text style={{fontSize: 12, color: '#999'}}>{this.props.sendTime}</Text>
            </View>
         </View>
       </TouchableHighlight>
     )
   }

   _itemPressed() {
     if (this.props.activity) {
       Bridge.setOpenUrl({"url":this.props.activity}, null); //协议跳转
     }
   }

   _noticeDetailView() {
     if (this.props.picUrl) {
       return (
         <View style={{flexDirection: "row", paddingLeft: 15}}>
           <Image source={{uri: this.props.picUrl}} style={styles.bigImage}/>
           <Text style={styles.detailText}>{this.props.text}</Text>
         </View>
       )
     } else {
       return (
         <Text style={styles.detailText}>{this.props.text}</Text>
       )
     }
   }
 }
 var styles = StyleSheet.create({
   container: {
     flexDirection: "column",
     backgroundColor: '#fff',
     borderRadius: 10,
     marginTop: 7,
     marginLeft: 15,
     marginRight: 15,
     marginBottom: 7,
   },
   containerRow: {
     flexDirection: "row",
     justifyContent: 'center',
     alignItems:'center',
     marginLeft: 15,
     marginRight: 15,
     marginBottom: 15,
   },
   titleText: {
    fontSize: 16,
    color: '#222',
    margin: 15,
   },
   detailText: {
    flex: 1,
    fontSize: 14,
    color: '#999',
    paddingLeft: 15,
    paddingRight: 15,
   },
   smallText: {
     flex: 1,
     fontSize: 12,
     color: '#999',
     marginLeft: 5,
   },
   line: {
     backgroundColor: '#ddd',
     height: 0.5,
     margin: 15,
   },
   bigImage: {
     width: 80,
     height: 80,
   },
   smallImage: {
     width: 25,
     height: 25,
   },
 });

 module.exports = NoticeListItem;
