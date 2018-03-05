/**
 * 通用标题
 */
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    NativeModules,
    PropTypes,
    Platform
} from 'react-native';

// 公用模块
import BackView from './HeaderCompont';
import Bridge from "./../../common/bridge/bridge";

class Header extends React.Component {
  constructor(props) {
      super(props);
      this.centerView = this._centerView.bind(this);
  }

  render() {
      let renderLeft = this.props.renderLeft && this._renderLeft() || this._leftBotton(this.props.backEnum);
      let title = this.props.title; //标题
      let backgroundColor = this.props.backgroundColor || '#ffffff'; //背景色
      let textColor = this.props.textColor || '#222'; //标题颜色

      return (
          <SafeAreaView>
          <View key="topbar" style={ [styles.container, { backgroundColor: backgroundColor }] }>
            {this._centerView(title, renderLeft)}
          </View>
          </SafeAreaView>);
    }

    _centerView(title, renderLeft) {
      return (<View style={ styles.topbar }>
          <View style={ styles.item }>
              {
                this._leftBotton(this.props.backEnum)
              }
          </View>
          <View style={styles.dividingLine}/>
          <View style={styles.titleView}>
              <Text style={styles.titleTextView} numberOfLines={ 1 } allowFontScaling={false}>{title}</Text>
          </View>
          <View style={styles.rightView}/>
          </View>);
    }

    _leftBotton(data){
        let isWhite = this.props.iconWhiteStyle ? this.props.iconWhiteStyle : false;
        return (
            <TouchableOpacity
              onPress={this._back.bind(this)}
              style={styles.backIcon}
              activeOpacity={1} >
                  <BackView backEnum={data} isWhite={isWhite}/>
            </TouchableOpacity>
          );
    }

    _back(){
        if(this.props.leftClick){
            this.props.leftClick();
        } else {
            Bridge.setLinkBack(null,function(d){});
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        height:Platform.OS == 'ios' ? 44 : 50,
    },
    dividingLine:{
        backgroundColor:'#EEEEEE',
        width:Platform.OS == 'ios' ? 0 : 1,
        top:13,
        height:24,
        marginRight:1
    },
    rightView:{
        width:Platform.OS == 'ios' ? 44 : 0,
    },
    image:{
        width: 160,
        height:24,
        top:Platform.OS == 'ios' ? 0 : 10,
    },
    headerView:{
        width:Platform.OS == 'ios' ? 100 : 48,
        flexDirection: 'row',
        flex:1,
        justifyContent:Platform.OS == 'ios' ?'center' : 'flex-start',
        alignItems:Platform.OS == 'ios' ?'center' : 'flex-start',
        marginLeft:Platform.OS == 'ios' ? 0:15
    },
    headerBackView:{
        height:Platform.OS == 'ios' ?64 : 50,
        flexDirection: 'row',
        flexGrow:1,
    },
    titleView:{
        flexGrow:1,
        marginLeft: 12,
        justifyContent:'center',
    },
    titleTextView:{
        marginLeft:Platform.OS == 'ios' ? 0 : 15,
        textAlign: Platform.OS == 'ios' ?'center' : 'left',
        fontSize: 18,
        color: '#222222',
        marginRight:0,
        fontWeight:'normal',
    },
    topbar: {
        height:Platform.OS == 'ios' ? 44 : 50,
        flexDirection: 'row',
        flexGrow:1,
    },
    item: {
        marginLeft:0,
        width:Platform.OS == 'ios' ? 34 : 48,
        flexDirection: 'row',
        alignItems:'flex-start',
    },
    backIcon: {
        height:Platform.OS == 'ios' ? 44 : 50,
        flexGrow:1,
        marginLeft: Platform.OS == 'ios' ? 14 : 20,
        justifyContent:'center',
    },
    rowFlex: {
        flex:1,
        flexDirection :'row'
    }
});
module.exports = Header;



