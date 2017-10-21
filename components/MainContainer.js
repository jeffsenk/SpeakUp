import React, { Component } from 'react';
import {
  Platform,
  View,
  Image,
  Text
} from 'react-native';
import MainScreen from './MainScreen';

export default class MainContainer extends Component<{}>{
  constructor(props){
    super(props);
    this.state={
      proposals:[],
      userVotes:[]
    }
    this.fetchProposals = this.fetchProposals.bind(this);
    this.fetchUserVotes = this.fetchUserVotes.bind(this);
    this.listenForVote = this.listenForVote.bind(this);
  }


  fetchProposals(database){
    let proposals = database.ref('Proposals');
    proposals.on('value',function(snapshot){
      snapshot.forEach(function(child){
        var match = false;
        for(var i =0;i<this.state.proposals.length;i++){
          if(this.state.proposals[i].key == child.key){
            let newState = this.state.proposals;
            newState[i] = child;
            this.setState({proposals:newState});
            match = true;
            break;
          }
        }
        if(!match){
          let newState = this.state.proposals;
          newState.push(child);
          this.setState({proposals:newState});
        }
      }.bind(this));
    }.bind(this));
  }

  fetchUserVotes(database){
    for(key in this.props.user.val().Votes){
      let voteRef = database.ref('Votes/'+key);
      voteRef.once('value').then(function(snapShot){
        let newState = this.state.userVotes;
        newState.push(snapShot);
        this.setState({userVotes:newState});
      }.bind(this));
    }
  }

  listenForVote(database){
    let userVotesRef = database.ref('Users/'+this.props.user.key+'/Votes');
    userVotesRef.on('child_added',function(data){
      database.ref('Votes/'+data.key).once('value').then(function(snapShot){
        let newState = this.state.userVotes;
        newState.push(snapShot);
        this.setState({userVotes:newState});
      }.bind(this));
    }.bind(this));
  }

  componentDidMount(){
    this.fetchProposals(this.props.database);
    this.fetchUserVotes(this.props.database);
    this.listenForVote(this.props.database);
  }

  render(){
    if(this.state.proposals.length>0){
      return(
        <MainScreen userFollowing={this.props.user.val().Following} userVotes={this.state.userVotes}
         database={this.props.database} userKey={this.props.user.key} proposals={this.state.proposals}
         userSubscribed={this.props.user.val().Subscribed}/>
      );
    }

    var megaphoneIcon = require('../assets/megaphoneIcon.png');

    return(
      <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
       <Image style={{height:100,width:100}} source={megaphoneIcon}/>
      </View>
    );
  }

}
