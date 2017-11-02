import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import IconButton from './IconButton';

export default class NewCommentContainer extends Component<{}>{
  constructor(props){
    super(props);
    this.state={
      content:''
    }
    this.onSend = this.onSend.bind(this);
  }

  onSend(){
    this.props.onSend(this.state.content);
    this.setState({content:''});
  }

  render(){
    var sendIcon = 'paper-plane-o';
    return(
      <View style={styles.main}>
        <TextInput placeholder="Type a message"  underlineColorAndroid={'transparent'} style={styles.input}
         onChangeText={(text)=>this.setState({content:text})} value={this.state.content}/>
        <View style={{justifyContent:'center',marginRight:10}}>
          <IconButton onPress={this.onSend} source={sendIcon}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    flexDirection:'row',
    justifyContent:'space-between',
    height:50,
    borderTopWidth:1,
    borderTopColor:'lightgray'
  },
  input:{
    marginLeft:10,
    height:50,
    width:200
  }
});
