/**
  * 分期商城订单列表
  */
  import React, { Component } from 'react';
  import {
    Platform,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
  } from 'react-native';

import Header from "./../../../../common/header/Header";
import Bridge from "./../../../../common/bridge/bridge";

let pageTitle = "选择城市";

class CityChoosePage extends Component<{}> {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        dataSource: ds.cloneWithRows(this._genRows({})),
        data: null,
        listData: null,
        isloaded: false,
        isgetRequestOK: true,
    }
    this._renderRow = this._renderRow.bind(this);
  }

  render() {
    return (
        <View style={styles.container}>
          <Header title={pageTitle} textColor='#000'/>
          <View style={styles.line}/>
          <ListView
              dataSource={this.state.dataSource}
              automaticallyAdjustContentInsets={true}
              scrollsToTop={false}
              enableEmptySections={true}
              renderRow={this._renderRow}
          />
        </View>
    );
  }

  _genRows(pressData: {[key: number]: boolean}): Array<string> {
     var dataBlob = [];
     for (var ii = 0; ii < 20; ii++) {
       var pressedText = pressData[ii] ? ' (pressed)' : '';
       dataBlob.push('Row ' + ii + pressedText);
     }
     return dataBlob;
   }

  _renderRow(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
      return (
        <TouchableHighlight onPress={() => {
            this._pressRow(rowID);
            highlightRow(sectionID, rowID);
          }}>
            <Text style={styles.row}>{rowData}</Text>
          </TouchableHighlight>
      );
  }

  _pressRow(rowID: number) {
    if (Platform.OS === 'ios') {
      //send event to ios
      let city = {};
      city.key = 'Row' + rowID;
      // Bridge.popBackToNativePage(city, (d) => {});
    } else {
      //send event to android
      Bridge.emitEventEmitter('cityInfo', 'Row' + rowID);
    }
    Bridge.setOpenUrl({"url":"http://www.tuniu.com"},function(d){});
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
});
module.exports = CityChoosePage;
