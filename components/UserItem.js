import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import IconButton from './IconButton';

export default class UserItem extends Component<{}>{
  constructor(props){
    super(props);
    this.state={
      subscribed:false
    }
    this.onPress = this.onPress.bind(this);
    this.onPressSubscribe = this.onPressSubscribe.bind(this);
    this.compareSubscribed = this.compareSubscribed.bind(this);
  }

  onPress(){
    this.props.selectUser(this.props.user)
  }

  onPressSubscribe(){
    if(!this.state.subscribed){
      this.props.database.ref('Users/'+this.props.thisUser.key+'/Following/Users/'+this.props.user.key).set('true');
    }else{
      this.props.database.ref('Users/'+this.props.thisUser.key+'/Following/Users/'+this.props.user.key).remove();
    }
  }

  compareSubscribed(props){
    var match = false;
    for(key in props.thisUser.child('Following/Users').val()){
      if(key == props.user.key){
        match=true;
        this.setState({subscribed:true});
        break;
      }
    }
    if(!match){
      this.setState({subscribed:false});
    }
  }

  componentDidMount(){
    this.compareSubscribed(this.props);
  }

  componentWillReceiveProps(nextProps){
    this.compareSubscribed(nextProps);
  }

  render(){
    var followIcon = this.state.subscribed ? require('../assets/postFollow.png') : require('../assets/preFollow.png');
    return(
      <View style={styles.user}>
        <TouchableHighlight underlayColor="white" onPress={this.onPress}>
          <Text style={styles.text}>@{this.props.user.val().Name}</Text>
        </TouchableHighlight>
        <IconButton onPress={this.onPressSubscribe} source={followIcon}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  user:{
    flexDirection:'row',
    justifyContent:'space-between',
    height:50,
    alignItems:'center',
    marginRight:10,
    marginLeft:10
  },
  text:{
    color:'blue'
  }
});
