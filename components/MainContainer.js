import React, { Component } from 'react';
import {
  Platform,
  View,
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

  fetchUserVotes(database,props){
    for(key in props.user.val().Votes){
      let voteRef = database.ref('Votes/'+key);
      voteRef.on('value',function(snapShot){
        var match=false;
        for(var i =0;i<this.state.userVotes.length;i++){
          if(this.state.userVotes[i].key == snapShot.key){
            match = true;
            break;
          }
        }
        if(!match){
console.log(snapShot.key);
          let newState = this.state.userVotes;
          newState.push(snapShot);
          this.setState({userVotes:newState});
        }
      }.bind(this));
    }
  }

  componentDidMount(){
    let database = this.props.firebase.database();
    this.fetchProposals(database);
    this.fetchUserVotes(database,this.props);
  }

  componentWillReceiveProps(nextProps){
    let database = this.props.firebase.database();
    this.fetchUserVotes(database,nextProps);
  }

  render(){
    if(this.state.proposals.length>0){
      return(
        <MainScreen userVotes={this.state.userVotes} firebase={this.props.firebase} user={this.props.user} proposals={this.state.proposals}/>
      );
    }
    return(
      <View>
       <Text>Loading</Text>
      </View>
    );
  }

}
