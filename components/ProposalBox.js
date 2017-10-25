import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  Alert
} from 'react-native';
import IconButton from './IconButton';

export default class ProposalBox extends Component<{}>{
  constructor(props){
    super(props);
    this.onSelectProposal = this.onSelectProposal.bind(this);
    this.onSelectProComments = this.onSelectProComments.bind(this);
    this.onSelectConComments = this.onSelectConComments.bind(this);
  }

  onSelectProposal(){
    this.props.selectProposal(this.props.proposal);
  }

  onSelectProComments(){
    this.props.selectComments(this.props.proposal.child('CommentsPro'));
  }

  onSelectConComments(){
    this.props.selectComments(this.props.proposal.child('CommentsCon'));
  }

  render(){
    var followIcon = this.props.following ? require('../assets/postFollow.png') : require('../assets/preFollow.png');
    var upVoteIcon = this.props.upVote ? require('../assets/postUpVote.png') : require('../assets/preUpVote.jpg');
    var downVoteIcon = this.props.downVote ? require('../assets/postDownVote.png') : require('../assets/preDownVote.png');


    var upVotes = 0;
    var downVotes = 0;
    var pro = 0;
    var con = 0;
    var commentProCount = 0;
    var commentConCount = 0;

    if(this.props.proposal.val().UpVotes){
      upVotes = Object.keys(this.props.proposal.val().UpVotes).length;
    }
    if(this.props.proposal.val().DownVotes){
      downVotes = Object.keys(this.props.proposal.val().DownVotes).length;
    }
    
    if(this.props.proposal.val().CommentsPro){
      commentProCount = Object.keys(this.props.proposal.val().CommentsPro).length;
    }
    if(this.props.proposal.val().CommentsCon){
      commentConCount = Object.keys(this.props.proposal.val().CommentsCon).length;
    }

    var total = upVotes + downVotes;
    if(total>0){
     pro= ((upVotes/total)*100).toFixed(0);
     con= ((downVotes/total)*100).toFixed(0);
    }
    
    const proPer = pro;
    const conPer = con;

    return(
      <View style={styles.outer}>
        <View style={styles.topRow}>
          <Text style={[styles.base,this.props.proposal.val().Category=='Politics' && styles.politics,
            this.props.proposal.val().Category=='Sports' && styles.sports,this.props.proposal.val().Category=='Tech' && styles.tech,] 
            }>{this.props.proposal.val().Category} - {this.props.proposal.val().GroupName}</Text>
          <IconButton onPress={this.props.onPressFollowing} source={followIcon}/>
        </View>
        <TouchableHighlight underlayColor="white" onPress={this.onSelectProposal}>
          <Text style={styles.title}>{this.props.proposal.val().Name}</Text>
        </TouchableHighlight>
        <View style={styles.stats}>
          <View>
            <View style={{marginBottom:5,flexDirection:'row'}}>
              <IconButton onPress={this.props.onPressUpVote} source={upVoteIcon}/>
              <Text style={{color:'cornflowerblue'}}>{proPer}% </Text>
            </View>
            <Text style={styles.votes}> {upVotes} UpVotes</Text>
            <TouchableHighlight underlayColor="white" onPress={this.onSelectProComments}>
              <Text style={styles.comments}> View {commentProCount} Pro comments </Text>
            </TouchableHighlight>
          </View>
          <View style={{marginRight:10}}>
            <View style={{marginBottom:5,flexDirection:'row',justifyContent:'flex-end'}}>
              <Text style={{color:'salmon'}}>{conPer}% </Text>
              <IconButton onPress={this.props.onPressDownVote} source={downVoteIcon}/>
            </View>
            <Text style={styles.votes} >{downVotes} DownVotes</Text>
            <TouchableHighlight underlayColor="white" onPress={this.onSelectConComments}>
              <Text style={styles.comments}> View {commentConCount} Con comments </Text>
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
  base:{
    color:'black'
  },
  politics:{
    color:'salmon'
  },
  sports:{
    color:'green'
  },
  tech:{
    color:'cornflowerblue'
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
    marginBottom:5,
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
    fontSize:20
  }
});
