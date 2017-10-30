import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  TouchableHighlight,
  Image,
  FlatList,
  View
} from 'react-native';

import CommentArea from './CommentArea';
import NewCommentContainer from './NewCommentContainer';
import BackHeader from './BackHeader';

export default class CommentScreen extends Component<{}>{
  constructor(props){
    super(props);
    this.state={
      comments:[]
    }
    this.onSend = this.onSend.bind(this);
  }

  onSend(content){
    let newKey = this.props.screenProps.database.ref('Comments').push({
      Author:this.props.screenProps.user.key,
      AuthorName:this.props.screenProps.user.val().Name,
      Proposal:this.props.navigation.state.params.selectedComments.ref.parent.key,
      Content:content
    }).key;
    this.props.navigation.state.params.selectedComments.ref.child(newKey).set(true);
    this.props.screenProps.database.ref('Users/'+this.props.screenProps.user.key+'/Comments/'+newKey).set(true);
  }

  componentDidMount(){
    this.props.navigation.state.params.selectedComments.ref.on('child_added',function(snapShot){
      this.props.screenProps.database.ref('Comments/'+snapShot.key).once('value').then(function(data){
        let newState=this.state.comments;
        newState.push(data);
        this.setState({comments:newState});
      }.bind(this));
    }.bind(this));
  }

  render(){
    var title = "Comments";
    return(
      <View style={{flex:1,justifyContent:'space-between'}}>
        <View>
          <CommentArea comments={this.state.comments} />
        </View>
        <NewCommentContainer onSend={this.onSend}/>
      </View>
    );
  }
}

