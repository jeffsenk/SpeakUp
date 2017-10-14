import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';

export default class ProposalBox extends Component<{}>{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style={styles.outer}>
        <Text style={styles.category}>{this.props.name}</Text>
        <View style={styles.content}>
          <Text style={styles.title}>Overturn Net Neutrality</Text>
          <Text style={styles.details}>View Details</Text>
        </View>
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <View>
            <Text style={{color:'teal'}}> UP 31% </Text>
            <Text style={styles.votes}> UpVoted by John Doe</Text>
            <Text style={styles.comments}> View 45 comments </Text>
          </View>
          <View>
            <Text style={{color:'salmon'}}> DN 69% </Text>
            <Text style={styles.votes} >DownVoted by Sheila Grant</Text>
            <Text style={styles.comments}> View 14 comments </Text>
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  comments:{
    color:'grey'
  },
  votes:{
    fontWeight:'bold'
  },
  outer:{
    height:200,
    borderBottomColor:'lightgray',
    borderBottomWidth:1
  },
  category:{
    marginBottom:5
  },
  content:{
    height:100,
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
