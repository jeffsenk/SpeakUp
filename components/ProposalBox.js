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
import IconButton from './IconButton';

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
      this.setState({upVote:true,downVote:false});
    }
  }

  onPressDownVote(){
    if(this.state.downVote){
      this.setState({downVote:false});
    }else{
      this.setState({downVote:true,upVote:false});
    }
  }

  render(){
    var followIcon = this.state.following ? require('../assets/postFollow.png') : require('../assets/preFollow.png');
    var upVoteIcon = this.state.upVote ? require('../assets/postUpVote.jpg') : require('../assets/preUpVote.jpg');
    var downVoteIcon = this.state.downVote ? require('../assets/postDownVote.png') : require('../assets/preDownVote.png');

    return(
      <View style={styles.outer}>
        <View style={styles.topRow}>
          <Text>{this.props.name}</Text>
          <IconButton onPress={this.onPressFollow} source={followIcon}/>
        </View>
        <TouchableHighlight underlayColor="white" onPress={this.props.selectProposal}>
          <Text style={styles.title}>Overturn Net Neutrality</Text>
        </TouchableHighlight>
        <View style={styles.stats}>
          <View>
            <View style={{flexDirection:'row'}}>
              <IconButton onPress={this.onPressUpVote} source={upVoteIcon}/>
              <Text style={{color:'cornflowerblue'}}> 31% </Text>
            </View>
            <Text style={styles.votes}> UpVoted by John Doe</Text>
            <TouchableHighlight underlayColor="white" onPress={this.props.selectComments}>
              <Text style={styles.comments}> View 45 comments </Text>
            </TouchableHighlight>
          </View>
          <View style={{marginRight:10}}>
            <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
              <Text style={{color:'salmon'}}>69% </Text>
              <IconButton onPress={this.onPressDownVote} source={downVoteIcon}/>
            </View>
            <Text style={styles.votes} >DownVoted by Sheila Grant</Text>
            <TouchableHighlight underlayColor="white" onPress={this.props.selectComments}>
              <Text style={styles.comments}> View 14 comments </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  stats:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  topRow:{
    height:30,
    marginRight:10,
    marginBottom:2,
    flexDirection:'row',
    justifyContent:'space-between'
  },
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
  title:{
    height:60,
    marginBottom:5,
    fontSize:25
  },
  details:{
    marginBottom:5
  }
});
