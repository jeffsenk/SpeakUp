import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  View,
  TouchableHighlight,
  Alert
} from 'react-native';

export default class ProposalBox extends Component<{}>{
  constructor(props){
    super(props);
    this.state={
      following:false,
    }
    this.onPressFollow = this.onPressFollow.bind(this);
    this.onPressUpVote = this.onPressUpVote.bind(this);
    this.onPressDownVote = this.onPressDownVote.bind(this);
  }

  onPressFollow(){
    if(this.state.following){
      this.setState({following:false});
    }else{
      this.setState({following:true});
    }
  }

  onPressUpVote(){
    if(this.state.upVote){
      this.setState({upVote:false});
    }else{
      this.setState({upVote:true});
    }
  }

  onPressDownVote(){
    if(this.state.downVote){
      this.setState({downVote:false});
    }else{
      this.setState({downVote:true});
    }
  }

  render(){
    var followIcon = this.state.following ? require('../assets/postFollow.png') : require('../assets/preFollow.png');
    var upVoteIcon = this.state.upVote ? require('../assets/postUpVote.jpg') : require('../assets/preUpVote.jpg');
    var downVoteIcon = this.state.downVote ? require('../assets/postDownVote.png') : require('../assets/preDownVote.png');

    return(
      <View style={styles.outer}>
        <View style={{height:30,marginRight:10,marginBottom:2,flexDirection:'row',justifyContent:'space-between'}}>
          <Text>{this.props.name}</Text>
          <TouchableHighlight underlayColor="white" onPress={this.onPressFollow}>
            <Image style={styles.button} source={followIcon}/>
          </TouchableHighlight>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Overturn Net Neutrality</Text>
        </View>
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <View>
            <View style={{flexDirection:'row'}}>
              <TouchableHighlight underlayColor="white" onPress={this.onPressUpVote}>
                <Image style={styles.button} source={upVoteIcon}/>
              </TouchableHighlight>
              <Text style={{color:'cornflowerblue'}}> 31% </Text>
            </View>
            <Text style={styles.votes}> UpVoted by John Doe</Text>
            <Text style={styles.comments}> View 45 comments </Text>
          </View>
          <View style={{marginRight:10}}>
            <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
              <Text style={{color:'salmon'}}>69% </Text>
              <TouchableHighlight underlayColor="white" onPress={this.onPressDownVote}>
                <Image style={styles.button} source={downVoteIcon}/>
              </TouchableHighlight>
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
    marginTop:5,
    marginLeft:10,
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
