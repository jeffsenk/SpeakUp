import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  View
} from 'react-native';

import IconButton from './IconButton';
import ProposalBox from './ProposalBox';
import DetailScreen from './DetailScreen';
import CommentScreen from './CommentScreen';

export default class FeedScreen extends Component<{}>{
  constructor(props){
    super(props);
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
      <View>
        <View style={styles.search}>
          <Text style={{marginLeft:150,fontSize:20,color:'lightgray'}}>Search... </Text>
          <IconButton  source={searchIcon}/>
        </View>
        <FlatList data={this.props.proposals} renderItem={({item})=> <ProposalBox followingKeys={this.props.followingKeys}
           proposal={item} name={item.key}
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
