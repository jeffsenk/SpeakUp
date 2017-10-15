import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  View
} from 'react-native';

export default class IconButton extends Component<{}>{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Image source={this.props.src}/>
    );
  }
}
