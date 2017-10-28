import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  BackHandler,
  View
} from 'react-native';
import FocusArea from './FocusArea';
import NavBar from './NavBar';
import {TabNavigator} from 'react-navigation';

export default class HomeScreen extends Component<{}>{
  constructor(props){
    super(props);
    this.state={
      followingScreen:false,
      categoryScreen:false,
      selectedProposal:{},
      selectedComments:{}
    }
    this.resetSelections=this.resetSelections.bind(this);
    this.selectComments=this.selectComments.bind(this);
    this.selectProposal=this.selectProposal.bind(this);
    this.selectFollowingScreen=this.selectFollowingScreen.bind(this);
    this.selectCategoryScreen=this.selectCategoryScreen.bind(this);
  }

  resetSelections(){
    this.setState({followingScreen:false,categoryScreen:false,selectedProposal:{},selectedComments:{}});
  }

  selectComments(comments){
    this.resetSelections();
    this.setState({selectedComments:comments});
  }

  selectProposal(proposal){
    this.resetSelections();
    this.setState({selectedProposal:proposal});
  }

  selectFollowingScreen(){
    this.resetSelections();
    this.setState({followingScreen:true});
  }

  selectCategoryScreen(){
    this.resetSelections();
    this.setState({categoryScreen:true});
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress',function(){
      this.resetSelections();
      return true;
    }.bind(this));
  }

  render(){
    return(
      <View style={styles.main}>
        <FocusArea userVotes={this.props.userVotes} user={this.props.user} database={this.props.database} resetSelections={this.resetSelections}
         selectProposal={this.selectProposal} selectComments={this.selectComments} selectedProposal={this.state.selectedProposal}
         selectedComments={this.state.selectedComments} followingScreen={this.state.followingScreen} categoryScreen={this.state.categoryScreen}
         proposals={this.props.proposals} />
        <NavBar homePress={this.resetSelections} followingPress={this.selectFollowingScreen} categoryPress={this.selectCategoryScreen} />
      </View>
    );
  }

}
const styles = StyleSheet.create({
  main:{
    flex:1,
    justifyContent:'flex-end'
  }
});

export const MainSelector = TabNavigator({
  Home:{screen:HomeScreen},
});
