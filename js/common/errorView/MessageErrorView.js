/**
 * 消息类错误页面
 */
 import React from 'react'
 import {
   View,
   Text,
   Image,
   StyleSheet,
 } from 'react-native';

 import GlobalConfig from './../config/GlobalConfig';

 class MessageErrorView extends React.Component {

   constructor(props) {
     super(props);
   }

   render() {
      return (
        <View style = {styles.container}>
          {this._imageView()}
          {this._errorTextView()}
          {this._errorDetailView()}
        </View>
      )
   }

   _imageView() {
     let image = this.props.errorImage;
     if (image) {
       return (<Image source={image} style={styles.errorImage}/>)
     } else {
       return (<Image source={require('./images/rn-error-image.png')} style={styles.errorImage}/>)
     }
   }

   _errorTextView() {
     let title = this.props.errorTitle;
     if (title) {
       return (<Text style={styles.errorTitle}>{title}</Text>)
     } else {
       return (<Text style={styles.errorTitle}>出错啦！</Text>)
     }
   }

   _errorDetailView() {
     let detail = this.props.errorDetail;
     if (detail) {
       return (<Text style={styles.errorDetail}>{detail}</Text>)
     } else {
       return (<Text style={styles.errorDetail}>请稍后再试哦！</Text>)
     }
   }
 }
 var styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#f6f6f6',
   },
   errorImage: {
     width: 120,
     height: 120,
     resizeMode: 'contain'
   },
   errorTitle: {
     fontSize: 20,
     color: '#222',
     marginTop: 15
   },
   errorDetail: {
     fontSize: 14,
     color: '#999',
     marginTop: 15
   },
 });

module.exports = MessageErrorView
