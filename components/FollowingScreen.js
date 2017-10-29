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

export default class FollowingScreen extends Component<{}>{
  constructor(props){
    super(props);
    this.state={
      userVotes:[],
      following:{},
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({userVotes:nextProps.screenProps.user.val().Votes});
    this.setState({following:nextProps.screenProps.user.val().Following});
  }

  componentDidMount(){
    for(key in this.props.user.val().Following){
      this.props.database.ref('Proposals/'+key).once('value').then(function(snapShot){
        let newState = this.state.proposals;
        newState.push(snapShot);
        this.setState({proposals:newState});
      }.bind(this));
    }
  }

  render(){
    var searchIcon = require('../assets/searchIcon.png');
    const props = this.props.screenProps;
    const selectProposal = this.props.navigate('DetailScreen');
    const selectComments = this.props.navigate('CommentScreen');

    if(props.following.length ==0 ){
      return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:15}}> You are not currently following any Proposals </Text>
        </View>
      );
    }

    return(
      <View style={{flex:1,justifyContent:'flex-start'}}>
        <View style={styles.search}>
          <Text style={{marginLeft:150,fontSize:20,color:'lightgray'}}>Search... </Text>
          <IconButton  source={searchIcon}/>
        </View>
        <FlatList extraData={this.state} data={props.following}
         renderItem={({item})=> <ProposalContainer userVotes={props.userVotes} user={props.user} database={props.database}
         proposal={item} selectProposal={selectProposal} selectComments={selectComments}/> }/>
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
