import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

export default class UserItem extends Component<{}>{
  constructor(props){
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress(){
    this.props.selectUser(this.props.user)
  }

  render(){
    return(
      <View style={styles.user}>
      <TouchableHighlight underlayColor="white" onPress={this.onPress}>
        <Text>{this.props.user.val().Name}</Text>
      </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  user:{
    height:50,
    justifyContent:'center',
    marginLeft:10
  }
});
