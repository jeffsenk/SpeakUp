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

export default class CommentScreen extends Component<{}>{
  constructor(props){
    super(props);
    this.state={
      comments:[]
    }
  }

  componentDidMount(){
    this.props.selectedComments.forEach(function(child){
      this.props.database.ref('Comments/'+child.key).once('value').then(function(snapShot){
        let newState = this.state.comments;
        newState.push(snapShot);
        this.setState({comments:newState});
      }.bind(this));
    }.bind(this));
  }

  render(){
    return(
      <View style={{justifyContent:'space-around'}}>
        <View style={styles.topRow}>
          <TouchableHighlight style={styles.returnButton} underlayColor="white" onPress={this.props.deselectComments}>
            <Image style={{height:40,width:50}} source={this.props.returnIcon}/>
          </TouchableHighlight>
          <Text style={{fontSize:20,fontWeight:'bold',marginLeft:20}}>Comments</Text>
        </View>
        <View style={styles.detail}>

        <CommentArea comments={this.state.comments} userKey={this.props.userKey} database={this.props.database} />

        </View>
        <View style={{height:50,borderTopWidth:1,borderTopColor:'lightgray'}}><Text>Add Comment...</Text></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  returnButton:{
    marginLeft:10,
    height:40,
    width:50,
  },
  topRow:{
    flexDirection:'row',
    alignItems:'center',
    borderBottomColor:'lightgray',
    borderBottomWidth:1,
    height:50
  },
  detail:{
    height:490,
    marginTop:20,
    marginLeft:15,
    marginRight:15
  }
});
