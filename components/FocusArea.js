import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Alert,
  BackHandler,
  View
} from 'react-native';
import FollowingScreen from './FollowingScreen';
import CategoryScreen from './CategoryScreen';
import IconButton from './IconButton';
import FeedScreen from './FeedScreen';

export default class FocusArea extends Component<{}>{
  constructor(props){
    super(props);
  }

  render(){
    if(this.props.followingScreen){
      return(
        <FollowingScreen userVotes={this.props.userVotes} user={this.props.user} database={this.props.database}
       resetSelections={this.props.resetSelections}
       selectProposal={this.props.selectProposal} selectComments={this.props.selectComments} selectedProposal={this.props.selectedProposal}
       userVotes={this.props.userVotes} selectedComments={this.props.selectedComments} proposals={this.props.proposals} />
      );
    }
    if(this.props.categoryScreen){
      return(
        <CategoryScreen database={this.props.database} user={this.props.user}/>
      );
    }
    return(
      <FeedScreen userVotes={this.props.userVotes} database={this.props.database} resetSelections={this.props.resetSelections}
       selectProposal={this.props.selectProposal} selectComments={this.props.selectComments} selectedProposal={this.props.selectedProposal}
       selectedComments={this.props.selectedComments} proposals={this.props.proposals} user={this.props.user}/>
    );
  }
}

