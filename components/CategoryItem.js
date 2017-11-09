import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import IconButton from './IconButton';

export default class CategoryItem extends Component<{}>{
  constructor(props){
    super(props);
    this.state={
      subscribed:false
    }
    this.onPressSubscribe = this.onPressSubscribe.bind(this);
    this.compareSubscribed = this.compareSubscribed.bind(this);
  }

  onPressSubscribe(){
    if(!this.state.subscribed){
      this.props.database.ref('Users/'+this.props.user.key+'/Following/Categories/'+this.props.category.key).set('true');
    }else{
      this.props.database.ref('Users/'+this.props.user.key+'/Following/Categories/'+this.props.category.key).remove();
    }
  }

  compareSubscribed(props){
    var match = false;
    for(key in props.user.child('Following/Categories').val()){
      if(key == props.category.key){
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
    var followIcon = this.state.subscribed ? 'check-square' : 'square-o';
    var followColor = 'black';
    return(
      <View style={styles.main}>
        <IconButton onPress={this.onPressSubscribe} source={followIcon} color={followColor}/>
        <Text style={styles.label} >{this.props.category.key}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    flexDirection:'row',
    marginBottom:20,
    alignItems:'center'
  },
  label:{
    marginLeft:10,
    fontSize:18
  }
});
