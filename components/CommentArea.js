import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  View
} from 'react-native';

import CommentItem from './CommentItem';

export default class CommentArea extends Component<{}>{
  constructor(props){
    super(props);
  }

  render(){
    if(this.props.comments.length >0){
      return(
      <View style={styles.main}>
        <FlatList data={this.props.comments} renderItem={({item})=>
          <CommentItem comment={item}/>
        }/>
      </View>
      );
    }
    return(
      <View style={styles.main}>
        <Text>No Comments Yet</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main:{
    marginLeft:10
  }
});

