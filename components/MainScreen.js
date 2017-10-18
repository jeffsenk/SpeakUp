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
    var returnIcon = require('../assets/outlineReturn.png');
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
        <View style={{height:50,borderBottomWidth:1,borderBottomColor:'lightgray'}}></View>
          <FlatList data={this.props.proposals}
          renderItem={({item})=> <ProposalBox name={item.key} selectComments={this.selectComments} selectProposal={this.selectProposal}/> }/>
        <View style={{height:50,borderTopWidth:1,borderTopColor:'lightgray'}}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    flex:1
  }
});
