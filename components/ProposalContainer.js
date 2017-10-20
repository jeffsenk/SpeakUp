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
    this.onPressFollowing = this.onPressFollowing.bind(this);
  }

  onPressFollowing(){
    if(!this.state.following){
      this.props.firebase.database().ref('Users/'+this.props.user.key+'/Following/'+this.props.proposal.key).set('true');
    }else{
      this.props.firebase.database().ref('Users/'+this.props.user.key+'/Following/'+this.props.proposal.key).remove();
    }
  }

  onPressUpVote(){
    if(!this.state.upVote && !this.state.downVote){
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

  compareFollowing(props){
    var match = false;
    for(key in props.user.val().Following){
      if(key == props.proposal.key){
        match = true;
        this.setState({following:true});
      }
    }
    if(!match){
      this.setState({following:false});
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
    this.compareFollowing(this.props);
    this.compareVotes(this.props);
  }

  componentWillReceiveProps(nextProps){
    console.log('new props in Proposal Container');
    this.compareFollowing(nextProps);
    this.compareVotes(nextProps);
  }

  render(){
    return(
      <ProposalBox following={this.state.following} upVote={this.state.upVote} downVote={this.state.downVote}
      user={this.props.user} proposal={this.props.proposal} name={this.props.name} selectComments={this.props.selectComments}
      selectProposal={this.props.selectProposal} onPressUpVote={this.onPressUpVote} onPressDownVote={this.onPressDownVote}
      onPressFollowing={this.onPressFollowing}/>
    );
  }

}
