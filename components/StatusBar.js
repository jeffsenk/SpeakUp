import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class StatusBar extends Component<{}>{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style={styles.status}>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  status:{
    height:(Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: 'white'
  }
});
