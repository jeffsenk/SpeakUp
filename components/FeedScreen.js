import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  View
} from 'react-native';

import IconButton from './IconButton';
import ProposalContainer from './ProposalContainer';
import DetailScreen from './DetailScreen';
import CommentScreen from './CommentScreen';

export default class FeedScreen extends Component<{}>{
  constructor(props){
    super(props);
    this.state={
      userVotes:[],
      following:{}
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({userVotes:nextProps.userVotes});
    this.setState({following:nextProps.userFollowing});
  }

  render(){
    var returnIcon = require('../assets/outlineReturn.png');
    var searchIcon = require('../assets/searchIcon.png');

    if(this.props.selectedProposal.key){
      return(
        <DetailScreen proposal={this.props.selectedProposal} returnIcon={returnIcon} deselectProposal={this.props.resetSelections}/>
      );
    }
    if(this.props.selectedComments.key){
      return(
       <CommentScreen returnIcon={returnIcon} deselectComments={this.props.resetSelections}/>
      );
    }
    return(
      <View style={{flex:1,justifyContent:'flex-start'}}>
        <View style={styles.search}>
          <Text style={{marginLeft:150,fontSize:20,color:'lightgray'}}>Search... </Text>
          <IconButton  source={searchIcon}/>
        </View>
        <FlatList extraData={this.state} data={this.props.proposals}
         renderItem={({item})=> <ProposalContainer userVotes={this.props.userVotes} database={this.props.database}
         userKey={this.props.userKey} proposal={item} userFollowing={this.props.userFollowing}
         selectComments={this.props.selectComments} selectProposal={this.props.selectProposal}/> }/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  search:{
    marginLeft:10,
    marginRight:10,
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    height:50,
    borderBottomWidth:1,
    borderBottomColor:'lightgray'
  }
});
