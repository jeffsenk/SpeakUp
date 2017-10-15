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

export default class MainScreen extends Component<{}>{
  constructor(props){
    super(props);
    this.state={
      selectedProposal:{}
    }
    this.selectProposal=this.selectProposal.bind(this);
    this.deselectProposal=this.deselectProposal.bind(this);
  }

  selectProposal(){
    this.setState({selectedProposal:{key:'abc123'}});
  }

  deselectProposal(){
    this.setState({selectedProposal:{}});
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress',function(){
      if(this.state.selectedProposal.key){
        this.deselectProposal();
      }
      return true;
    }.bind(this));
  }

  render(){
    var returnIcon = require('../assets/returnArrow.png');
    if(this.state.selectedProposal.key){
      return(
        <DetailScreen returnIcon={returnIcon} deselectProposal={this.deselectProposal}/>
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
          renderItem={({item})=> <ProposalBox name={item.key} selectProposal={this.selectProposal}/> }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    flex:1
  }
});
