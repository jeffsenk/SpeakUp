import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class CommentItem extends Component<{}>{
  constructor(props){
    super(props);
  }

  render(){
    console.log(this.props.comment.val());
    return(
      <View style={styles.main}>
        <Text style={styles.user}>@{this.props.comment.val().AuthorName}</Text>
        <Text>{this.props.comment.val().Content}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    flexDirection:'row',
    flex:1
  },
  user:{
    color:'blue',
    marginRight:10
  }
});
