import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  Image,
  View
} from 'react-native';

import IconButton from './IconButton';
import ProposalContainer from './ProposalContainer';
import DetailScreen from './DetailScreen';
import CommentScreen from './CommentScreen';
import SearchBar from 'react-native-searchbar';

export default class FeedScreen extends Component<{}>{
  static navigationOptions={
    header:null
  }

  constructor(props){
    super(props);
    this.state={
      userVotes:[],
      following:{},
      filteredProposals:[],
    }
    this.handleSearchResults = this.handleSearchResults.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({userVotes:nextProps.screenProps.userVotes});
    this.setState({following:nextProps.screenProps.user.val().Following});
  }

  handleSearchResults(data){
    this.setState({filteredProposals:data});
  }

  render(){
    var searchIcon = require('../assets/searchIcon.png');
    const props = this.props.screenProps;
    const selectProposal = function(proposal){
      this.props.navigation.navigate('Detail',{proposal:proposal});
    }.bind(this);

    const selectComments = function(comments){
      this.props.navigation.navigate('Comment',{selectedComments:comments});
    }.bind(this);

    var searchData = [];
    for(var i =0;i<props.proposals.length;i++){
      searchData.push({Name:props.proposals[i].val().Name,Key:props.proposals[i].key});
    }

    var displayData =[];
    if(this.state.filteredProposals.length >0){
    for(var j=0;j<props.proposals.length;j++){
      for(var k =0;k<this.state.filteredProposals.length;k++){
        if(props.proposals[j].key == this.state.filteredProposals[k].Key){
          displayData.push(props.proposals[j]);
        }
      }
    }
    }else{
      displayData = props.proposals;
    }

    return(
      <View style={{flex:1,justifyContent:'flex-start'}}>
        <View style={styles.search}>
          <SearchBar hideBack={true}  data={searchData} handleResults={this.handleSearchResults} showOnLoad={true} allDataOnEmptySearch={true} />
        </View>
        <FlatList extraData={this.state} data={displayData}
         renderItem={({item})=> <ProposalContainer userVotes={props.userVotes} database={props.database}
         user={props.user} proposal={item} selectProposal={selectProposal} selectComments={selectComments} /> }/>
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
