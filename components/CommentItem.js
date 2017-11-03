import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

export default class CommentItem extends Component<{}>{
  constructor(props){
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress(){
    this.props.database.ref('Users/'+this.props.comment.val().Author).once('value').then(function(user){
      this.props.selectUser(user);
    }.bind(this));
  }


  render(){
    return(
      <View style={styles.main}>
        <TouchableHighlight underlayColor="white" onPress={this.onPress}>
          <Text style={styles.user}>@{this.props.comment.val().AuthorName}</Text>
        </TouchableHighlight>
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
