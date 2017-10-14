import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  View
} from 'react-native';

export default class ProposalBox extends Component<{}>{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style={styles.outer}>
        <View style={{height:30,marginBottom:2,flexDirection:'row',justifyContent:'space-between'}}>
          <Text>{this.props.name}</Text>
          <Image style={styles.button} source={require('../assets/preFollow.png')}/>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Overturn Net Neutrality</Text>
        </View>
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <View>
            <View style={{flexDirection:'row'}}>
              <Image style={styles.button} source={require('../assets/preUpVote.jpg')}/>
              <Text style={{color:'cornflowerblue'}}> 31% </Text>
            </View>
            <Text style={styles.votes}> UpVoted by John Doe</Text>
            <Text style={styles.comments}> View 45 comments </Text>
          </View>
          <View>
            <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
              <Text style={{color:'salmon'}}>69% </Text>
              <Image style={styles.button} source={require('../assets/preDownVote.png')}/>
            </View>
            <Text style={styles.votes} >DownVoted by Sheila Grant</Text>
            <Text style={styles.comments}> View 14 comments </Text>
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  button:{
    height:30,
    width:30,
  },
  comments:{
    color:'grey'
  },
  votes:{
    fontWeight:'bold'
  },
  outer:{
    height:190,
    borderBottomColor:'lightgray',
    borderBottomWidth:1
  },
  content:{
    height:80,
  },
  title:{
    height:50,
    marginBottom:5,
    fontSize:25
  },
  details:{
    marginBottom:5
  }
});
