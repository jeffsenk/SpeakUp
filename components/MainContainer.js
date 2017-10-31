import React, { Component } from 'react';
import {
  Platform,
  View,
  Image,
  Text
} from 'react-native';
import MainSelector from './MainSelector';
import {TabContainer} from './TabContainer';

export default class MainContainer extends Component<{}>{
  constructor(props){
    super(props);
    this.state={
      proposals:[],
      userVotes:[],
      categories:[],
      following:[],
      users:[]
    }
    this.listenForVote = this.listenForVote.bind(this);
    this.assignCategories = this.assignCategories.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.fetchFollowing = this.fetchFollowing.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
  }

  fetchUsers(database){
    database.ref('Users').on('child_added',function(user){
      let newState = this.state.users;
      newState.push(user);
      this.setState({users:newState});
    }.bind(this));
  }

  fetchFollowing(database){
    this.props.user.child('Following').ref.on('child_added',function(data){
      database.ref('Proposals/'+data.key).once('value').then(function(snapShot){
        let newState = this.state.following;
        newState.push(snapShot);
        this.setState({following:newState});
      }.bind(this));
    }.bind(this));
    this.props.user.child('Following').ref.on('child_removed',function(data){
      for(var i =0;i<this.state.following.length;i++){
        if(this.state.following[i].key == data.key){
          let newState = this.state.following;
          newState.splice(i,1);
          this.setState({following:newState});
          break;
        }
      }
    }.bind(this));
  }

  fetchCategories(database){
    database.ref('Categories').once('value').then(function(snapShot){
      snapShot.forEach(function(category){
        let newState = this.state.categories;
        newState.push(category);
        this.setState({categories:newState});
      }.bind(this));
    }.bind(this));
  }

  assignCategories(database){
    let subscribed = this.props.user.child('Subscribed').ref;
    subscribed.on('child_added',function(snapShot){
      database.ref('Categories/'+snapShot.key+'/Proposals').once('value').then(function(proposals){
        proposals.forEach(function(proposal){
          database.ref('Proposals/'+proposal.key).on('value',function(data){
            let match = false;
            for(var i = 0;i<this.state.proposals.length;i++){
              if(this.state.proposals[i].key == data.key){
                let newState = this.state.proposals;
                newState[i] = data;
                this.setState({proposals:newState});
                match = true;
                break;
              }
            }
            if(!match){
              let newState = this.state.proposals;
              newState.push(data);
              this.setState({proposals:newState});
            }
          }.bind(this));
        }.bind(this));
      }.bind(this));      
    }.bind(this));
    subscribed.on('child_removed',function(snapShot){
      database.ref('Categories/'+snapShot.key+'/Proposals').once('value').then(function(proposals){
        proposals.forEach(function(proposal){
          for(var i=0;i<this.state.proposals.length;i++){
            if(this.state.proposals[i].key == proposal.key){
              var newState = this.state.proposals;
              newState.splice(i,1);
              this.setState({proposals:newState});
              break;
            }
          }
        }.bind(this)); 
      }.bind(this));
    }.bind(this));

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
    this.assignCategories(this.props.database);
    this.listenForVote(this.props.database);
    this.fetchCategories(this.props.database);
    this.fetchFollowing(this.props.database);
    this.fetchUsers(this.props.database);
  }

  render(){
      return(
        <TabContainer screenProps={{userVotes:this.state.userVotes,database:this.props.database,proposals:this.state.proposals,user:this.props.user,
         categories:this.state.categories,following:this.state.following,users:this.state.users}}/>
      );
  }
}
