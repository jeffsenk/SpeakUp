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
import ProposalBox from './ProposalBox';
import DetailScreen from './DetailScreen';
import CommentScreen from './CommentScreen';
import NavBar from './NavBar';
import FollowingScreen from './FollowingScreen';
import CategoryScreen from './CategoryScreen';
import IconButton from './IconButton';

export default class MainScreen extends Component<{}>{
  constructor(props){
    super(props);
    this.state={
      selectedProposal:{},
      selectedComments:{},
      followingScreen:false,
      categoryScreen:false
    }
    this.selectComments=this.selectComments.bind(this);
    this.selectProposal=this.selectProposal.bind(this);
    this.resetSelections=this.resetSelections.bind(this);
    this.selectFollowingScreen=this.selectFollowingScreen.bind(this);
    this.selectCategoryScreen=this.selectCategoryScreen.bind(this);
  }

  selectFollowingScreen(){
    this.setState({selectedComments:{},selectedProposal:{},followingScreen:true,categoryScreen:false});
  }

  selectCategoryScreen(){
    this.setState({selectedComments:{},selectedProposal:{},followingScreen:false,categoryScreen:true});
  }

  selectComments(){
    this.setState({selectedComments:{key:'abc123'},selectedProposal:{},followingScreen:false,categoryScreen:false});
  }

  selectProposal(proposal){
    this.setState({selectedProposal:proposal,selectedComments:{},followingScreen:false,categoryScreen:false});
  }

  resetSelections(){
    this.setState({selectedProposal:{},selectedComments:{},followingScreen:false,categoryScreen:false});
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress',function(){
      this.resetSelections();
      return true;
    }.bind(this));
  }

  render(){
    var returnIcon = require('../assets/outlineReturn.png');
    var searchIcon = require('../assets/searchIcon.png');

    if(this.state.followingScreen){
      return(
      <View style={styles.main}>
        <FollowingScreen/>
        <NavBar homePress={this.resetSelections} followingPress={this.selectFollowingScreen} categoryPress={this.selectCategoryScreen} />
      </View>
      );
    }
    if(this.state.categoryScreen){
      return(
      <View style={styles.main}>
        <CategoryScreen/>
        <NavBar homePress={this.resetSelections} followingPress={this.selectFollowingScreen} categoryPress={this.selectCategoryScreen} />
      </View>
      );
    }

    if(this.state.selectedProposal.key){
      return(
        <View style={styles.main}>
        <DetailScreen proposal={this.state.selectedProposal} returnIcon={returnIcon} deselectProposal={this.resetSelections}/>
        <NavBar homePress={this.resetSelections} followingPress={this.selectFollowingScreen} categoryPress={this.selectCategoryScreen} />
        </View>
      );
    }
    if(this.state.selectedComments.key){
      return(
       <View style={styles.main}>
       <CommentScreen returnIcon={returnIcon} deselectComments={this.resetSelections}/>
        <NavBar homePress={this.resetSelections} followingPress={this.selectFollowingScreen} categoryPress={this.selectCategoryScreen} />
       </View>
      );
    }

    return(
      <View style={styles.main}>
        <View style={styles.search}>
          <Text style={{marginLeft:150,fontSize:20,color:'lightgray'}}>Search... </Text>
          <IconButton  source={searchIcon}/>
        </View>
        <FlatList data={this.props.proposals} renderItem={({item})=> <ProposalBox followingKeys={this.props.followingKeys}
           proposal={item} name={item.key}
           selectComments={this.selectComments} selectProposal={this.selectProposal}/> }/>
        <NavBar homePress={this.resetSelections} followingPress={this.selectFollowingScreen} categoryPress={this.selectCategoryScreen} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    flex:1,
    justifyContent:'flex-end'
  },
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
