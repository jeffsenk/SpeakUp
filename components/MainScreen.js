import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  BackHandler,
  View
} from 'react-native';
import ProposalBox from './ProposalBox';
import DetailScreen from './DetailScreen';
import CommentScreen from './CommentScreen';

export default class MainScreen extends Component<{}>{
  constructor(props){
    super(props);
    this.state={
      selectedProposal:{},
      selectedComments:{}
    }
    this.selectComments=this.selectComments.bind(this);
    this.selectProposal=this.selectProposal.bind(this);
    this.resetSelections=this.resetSelections.bind(this);
  }

  selectComments(){
    this.setState({selectedComments:{key:'abc123'},selectedProposal:{}});
  }

  selectProposal(){
    this.setState({selectedProposal:{key:'abc123'},selectedComments:{}});
  }

  resetSelections(){
    this.setState({selectedProposal:{},selectedComments:{}});
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress',function(){
      this.resetSelections();
      return true;
    }.bind(this));
  }

  render(){
    var returnIcon = require('../assets/returnArrow.png');
    if(this.state.selectedProposal.key){
      return(
        <DetailScreen returnIcon={returnIcon} deselectProposal={this.resetSelections}/>
      );
    }
    if(this.state.selectedComments.key){
      return(
       <CommentScreen returnIcon={returnIcon} deselectComments={this.resetSelections}/>
      );
    }

    return(
      <View style={styles.main}>
        <FlatList data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item})=> <ProposalBox name={item.key} selectComments={this.selectComments} selectProposal={this.selectProposal}/> }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    flex:1
  }
});
