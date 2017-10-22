import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View
} from 'react-native';

export default class BackHeader extends Component<{}>{
  constructor(props){
    super(props);
  }

  render(){
    return(
        <View style={styles.topRow}>
          <TouchableHighlight style={styles.returnButton} underlayColor="white" onPress={this.props.onPress}>
            <Image style={{height:40,width:50}} source={this.props.returnIcon}/>
          </TouchableHighlight>
          <Text style={{fontSize:20,fontWeight:'bold',marginLeft:20}}>{this.props.title}</Text>
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
  }
});
