import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import IconButton from './IconButton';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    var followIcon = this.state.subscribed ? 'check' : 'square-o';
    var followColor = this.state.subscribed ? '#2196f3' : 'white';
    return(
        <TouchableHighlight style={styles.main} underlayColor='white' onPress={this.onPressSubscribe}>
          <View style={{flexDirection:'row'}}>
            <View style={{width:40}}>
	      <Icon name={followIcon} size={32} color={followColor}/>
            </View>
	    <Text style={styles.label} >{this.props.category.key}</Text>
          </View>
        </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    marginBottom:20,
  },
  label:{
    marginLeft:10,
    fontSize:18
  }
});
