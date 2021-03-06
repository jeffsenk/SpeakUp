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
import Icon from 'react-native-vector-icons/FontAwesome';

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
    var followName = this.props.following ? 'star' : 'star-o';
    var downVoteName = 'arrow-down'
    var upVoteName = 'arrow-up'

    var followColor = this.props.following ? 'gold' : 'gray'
    var downColor = this.props.downVote ? 'salmon' : 'lightgray'
    var upColor = this.props.upVote ? 'cornflowerblue' : 'lightgray'

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

    var submitter = "";
    if(this.props.proposal.val().SubmitterName != 'SpeakUp'){
      submitter = ' - ' + this.props.proposal.val().SubmitterName;
    }
    
    const proPer = pro;
    const conPer = con;
    return(
      <View style={styles.outer}>
        <View style={styles.topRow}>
          <Text>{this.props.proposal.val().Category} {submitter} </Text>
          <IconButton onPress={this.props.onPressFollowing} source={followName} color={followColor}/> 
        </View>
        <TouchableHighlight underlayColor="white" onPress={this.onSelectProposal}>
          <Text style={styles.title}>{this.props.proposal.val().Name}</Text>
        </TouchableHighlight>
        <View style={styles.stats}>
          <View>
            <View style={{marginBottom:5,flexDirection:'row'}}>
              <IconButton onPress={this.props.onPressUpVote} source={upVoteName} color={upColor}/>
              <Text style={{color:'cornflowerblue',marginLeft:5}}>{proPer}% </Text>
            </View>
            <Text style={styles.votes}> {upVotes} UpVotes</Text>
          </View>
          <View style={{marginRight:10}}>
            <View style={{marginBottom:5,flexDirection:'row',justifyContent:'flex-end'}}>
              <Text style={{color:'salmon',marginRight:5}}>{conPer}% </Text>
              <IconButton onPress={this.props.onPressDownVote} source={downVoteName} color={downColor}/>
            </View>
            <Text style={styles.votes} >{downVotes} DownVotes</Text>
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
    textDecorationLine:'underline',
    height:60,
    marginBottom:10,
    fontSize:20
  }
});
