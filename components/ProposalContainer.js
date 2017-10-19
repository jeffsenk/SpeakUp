import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Alert,
  View
} from 'react-native';

import ProposalBox from './ProposalBox';

export default class ProposalContainer extends Component<{}>{
  constructor(props){
    super(props);
    this.state={
      following:false,
      upVote:false,
      downVote:false
    }
    this.compareFollowing = this.compareFollowing.bind(this);
    this.compareVotes = this.compareVotes.bind(this);
    this.onPressUpVote = this.onPressUpVote.bind(this);
    this.onPressDownVote = this.onPressDownVote.bind(this);
  }

  onPressUpVote(){
    if(this.state.upVote == false && this.state.downVote == false){
      let newKey = this.props.firebase.database().ref('Votes/').push({
        Proposal:this.props.proposal.key,
        User:this.props.user.key,
        UpVote:true
      }).key;
      this.props.firebase.database().ref('Users/'+this.props.user.key+'/Votes/'+newKey).set('true');
    }else{
      Alert.alert('Vote has already been submitted');
    }
  }

  onPressDownVote(){
    if(!this.state.upVote && !this.state.downVote){
      let newKey = this.props.firebase.database().ref('Votes/').push({
        Proposal:this.props.proposal.key,
        User:this.props.user.key,
        UpVote:false
      }).key;
      this.props.firebase.database().ref('Users/'+this.props.user.key+'/Votes/'+newKey).set('true');
    }else{
      Alert.alert('Vote has already been submitted');
    }
  }

  compareFollowing(){
    for(key in this.props.user.val().Following){
      if(key == this.props.proposal.key){
        this.setState({following:true});
      }
    }
  }

  compareVotes(props){
    for(var i=0;i<props.userVotes.length;i++){
      if(props.userVotes[i].val().Proposal == props.proposal.key){
        if(props.userVotes[i].val().UpVote){
          this.setState({upVote:true});
        }else{
          this.setState({downVote:true});
        }
      }
    }
  }

  componentDidMount(){
    console.log('proposal container mounted');
    this.compareFollowing();
    this.compareVotes(this.props);
  }

  componentWillReceiveProps(nextProps){
    console.log('new props in Proposal Container');
    this.compareVotes(nextProps);
  }

  render(){
    return(
      <ProposalBox following={this.state.following} upVote={this.state.upVote} downVote={this.state.downVote}
      user={this.props.user} proposal={this.props.proposal} name={this.props.name} selectComments={this.props.selectComments}
      selectProposal={this.props.selectProposal} onPressUpVote={this.onPressUpVote} onPressDownVote={this.onPressDownVote}/>
    );
  }

}
