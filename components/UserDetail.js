import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class UserDetail extends Component<{}>{
  constructor(props){
    super(props);
  }

  render(){
    var props = this.props.navigation.state.params;
console.log(props.user.val().Name);
    return(
      <View>
        <Text>{props.user.val().Name}</Text>
        <Text>{props.user.val().email}</Text>
      </View>
    );
  }

}
