import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class DefaultComponent extends Component<{}>{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <View>
        <Text>Default</Text>
      </View>
    );
  }

}
