import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Alert,
  View
} from 'react-native';
import IconButton from './IconButton';

export default class NavBar extends Component<{}>{
  constructor(props){
    super(props);
  }

  render(){
    var homeIcon = require('../assets/homeIcon.png');
    var followingIcon = require('../assets/followingIcon.png');
    var categoryIcon = require('../assets/categoriesIcon.png');

    return(
      <View style={styles.main}>
        <IconButton source={homeIcon} onPress={this.props.homePress}/>
        <IconButton source={categoryIcon} onPress={this.props.followingPress}/>
        <IconButton source={followingIcon} onPress={this.props.categoryPress}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  main:{
    height:50,
    borderTopWidth:1,
    borderTopColor:'lightgray',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginLeft:10,
    marginRight:10 
  }
});
