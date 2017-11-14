import React, { Component } from 'react';
import {
  Linking,
  TouchableOpacity,
  Text,
  View,
  Platform,
  StyleSheet,
} from 'react-native';

export default class LinkButton extends Component<{}>{
  constructor(props){
    super(props);
  }

  handlePress(){
    Linking.canOpenURL(this.props.url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.url);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.url);
      }
    });
  }

  render(){
    return(
      <TouchableOpacity onPress={this.handlePress.bind(this)}>
        <View style={{marginBottom:10}}>
          <Text style={{color:'blue'}}>{this.props.url}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
