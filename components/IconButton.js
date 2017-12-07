import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class IconButton extends Component<{}>{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <TouchableHighlight underlayColor="white" onPress={this.props.onPress}>
        <Icon name={this.props.source} size={32} color={this.props.color}/>
      </TouchableHighlight>
    );
  }
}
