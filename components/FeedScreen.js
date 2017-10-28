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
    this.setState({following:nextProps.user.val().Following});
  }

  render(){
    var returnIcon = require('../assets/outlineReturn.png');
    var searchIcon = require('../assets/searchIcon.png');
    const props = this.props.screenProps;
console.log(props);
    if(props.selectedProposal.key){
      return(
        <DetailScreen proposal={props.selectedProposal} returnIcon={returnIcon} deselectProposal={props.resetSelections}/>
      );
    }
    if(props.selectedComments.key){
      return(
       <CommentScreen user={props.user} database={props.database} selectedComments={props.selectedComments} returnIcon={returnIcon} deselectComments={props.resetSelections}/>
      );
    }
    return(
      <View style={{flex:1,justifyContent:'flex-start'}}>
        <View style={styles.search}>
          <Text style={{marginLeft:150,fontSize:20,color:'lightgray'}}>Search... </Text>
          <IconButton  source={searchIcon}/>
        </View>
        <FlatList extraData={this.state} data={props.proposals}
         renderItem={({item})=> <ProposalContainer userVotes={props.userVotes} database={props.database}
         user={props.user} proposal={item} selectComments={props.selectComments} selectProposal={props.selectProposal}/> }/>
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
