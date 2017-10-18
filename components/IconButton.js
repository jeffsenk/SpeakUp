import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';

export default class IconButton extends Component<{}>{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <TouchableHighlight underlayColor="white" onPress={this.props.onPress}>
        <Image style={{height:30,width:35}} source={this.props.source}/>
      </TouchableHighlight>
    );
  }
}
