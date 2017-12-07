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
  static navigationOptions={
    header:null
  }

  constructor(props){
    super(props);
    this.state={
      userVotes:[],
      following:[],
    }
    this.fetchFollowingProposals = this.fetchFollowingProposals.bind(this);
  }

  fetchFollowingProposals(props){
    props.user.child('Following/Proposals').ref.on('child_added',function(data){
      props.database.ref('Proposals/'+data.key).once('value').then(function(snapShot){
        let newState = this.state.following;
        newState.push(snapShot);
        this.setState({following:newState});
      }.bind(this));
    }.bind(this));
    props.user.child('Following/Proposals').ref.on('child_removed',function(data){
      for(var i =0;i<this.state.following.length;i++){
        if(this.state.following[i].key == data.key){
          let newState = this.state.following;
          newState.splice(i,1);
          this.setState({following:newState});
          break;
        }
      }
    }.bind(this));
  }

  componentWillReceiveProps(nextProps){
    this.setState({userVotes:nextProps.screenProps.user.val().Votes});
  }

  componentDidMount(){
    this.fetchFollowingProposals(this.props.screenProps);
  }

  render(){
    const props = this.props.screenProps;
    const selectProposal = function(proposal){
      this.props.navigation.navigate('FollowingDetail',{proposal:proposal});
    }.bind(this);

    const selectComments = function(comments){
      this.props.navigation.navigate('FollowingComment',{selectedComments:comments});
    }.bind(this);

    if(this.state.following.length ==0 ){
      return(
        <View style={{backgroundColor:'white',flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:15}}> You are not currently following any Proposals </Text>
        </View>
      );
    }

    return(
      <View style={{backgroundColor:'white',flex:1,justifyContent:'flex-start'}}>
        <Text style={styles.title}>Following</Text>
        <FlatList extraData={this.state} data={this.state.following}
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
  },
  title:{
    marginLeft:10,
    marginTop:10,
    fontSize:25,
    marginBottom:20
  }
});
