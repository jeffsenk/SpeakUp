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
        <FollowingScreen/>
      );
    }
    if(this.props.categoryScreen){
      return(
        <CategoryScreen/>
      );
    }
    return(
      <FeedScreen resetSelections={this.props.resetSelections} selectProposal={this.props.selectProposal} selectComments={this.props.selectComments} selectedProposal={this.props.selectedProposal} selectedComments={this.props.selectedComments} proposals={this.props.proposals} followingKeys={this.props.followingKeys}/>
    );
  }
}

