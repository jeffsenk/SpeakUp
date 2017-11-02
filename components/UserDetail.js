import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class UserDetail extends Component<{}>{
  constructor(props){
    super(props);
  }

  render(){
    var props = this.props.navigation.state.params;
    let proposalsCount = 0;
    let voteCount =0;
    let commentCount =0;

    if(props.user.val().Proposals){
       proposalsCount = Object.keys(props.user.val().Proposals).length;
    }
    if(props.user.val().Votes){
       voteCount = Object.keys(props.user.val().Votes).length;
    }
    if(props.user.val().Comments){
      commentCount = Object.keys(props.user.val().Comments).length;
    }

    return(
      <View>
        <Text style={styles.name}>{props.user.val().Name}</Text>
        <Text style={styles.stat}>Proposals: {proposalsCount} </Text>
        <Text style={styles.stat}>Votes: {voteCount} </Text>
        <Text style={styles.stat}>Comments: {commentCount} </Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  name:{
    marginTop:10,
    marginBottom:10,
    marginLeft:10,
    fontSize:20
  },
  stat:{
    marginLeft:10
  }
});
