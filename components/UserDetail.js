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
    return(
      <View>
        <Text>This is the Detail Page</Text>
        <Text>{props.user.val().Name}</Text>
      </View>
    );
  }

}
