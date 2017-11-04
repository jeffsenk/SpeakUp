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
import Icon from 'react-native-vector-icons/FontAwesome'

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
      simplifiedProposals:[],
      displayData:[]
    }
    this.handleSearchResults = this.handleSearchResults.bind(this);
    this.simplifyProposals = this.simplifyProposals.bind(this);
    this.getDisplayData = this.getDisplayData.bind(this);
  }

  simplifyProposals(props){
    let searchData =[];
    for(var i =0;i<props.proposals.length;i++){
      searchData.push({Name:props.proposals[i].val().Name,Key:props.proposals[i].key});
    }
    this.setState({simplifiedProposals:searchData});
  }

  getDisplayData(props){
    if(this.state.filteredProposals.length >0){
      let displayData =[];
      for(var j=0;j<props.proposals.length;j++){
        for(var k =0;k<this.state.filteredProposals.length;k++){
          if(props.proposals[j].key == this.state.filteredProposals[k].Key){
            displayData.push(props.proposals[j]);
          }
        }
      }
      this.setState({displayData:displayData});
    }else{
      this.setState({displayData:props.proposals});
    }
  }

  componentDidMount(){
    this.simplifyProposals(this.props.screenProps);
    this.getDisplayData(this.props.screenProps);
  }

  componentWillReceiveProps(nextProps){
    this.setState({userVotes:nextProps.screenProps.userVotes});
    this.setState({following:nextProps.screenProps.user.val().Following});
    this.simplifyProposals(nextProps.screenProps);
    this.getDisplayData(nextProps.screenProps);
  }

  handleSearchResults(data){
    this.setState({filteredProposals:data});
    this.getDisplayData(this.props.screenProps);
  }


  render(){
    const props = this.props.screenProps;
    const selectProposal = function(proposal){
      this.props.navigation.navigate('FeedDetail',{proposal:proposal});
    }.bind(this);

    const selectComments = function(comments){
      this.props.navigation.navigate('FeedComment',{selectedComments:comments});
    }.bind(this);
if(this.state.displayData.length>0){
    return(
      <View style={{flex:1,justifyContent:'flex-start'}}>
        <View style={styles.search}>
          <SearchBar focusOnLayout={false} hideBack={true}  data={this.state.simplifiedProposals} handleResults={this.handleSearchResults} showOnLoad={true} />
        </View>
        <FlatList extraData={this.state} data={this.state.displayData}
         renderItem={({item})=> <ProposalContainer userVotes={props.userVotes} database={props.database}
         user={props.user} proposal={item} selectProposal={selectProposal} selectComments={selectComments} /> }/>
      </View>
    );
}
    return(
      <View style={{flex:1,justifyContent:'flex-start'}}>
        <View style={styles.search}>
          <SearchBar focusOnLayout={false}  hideBack={true}  data={this.state.simplifiedProposals} handleResults={this.handleSearchResults} showOnLoad={true} />
        </View>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Icon name='bullhorn' size={70} color='salmon'/>
        </View>
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
