import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  TouchableHighlight,
  Image,
  View,
} from 'react-native';

export default class CommentScreen extends Component<{}>{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <View>
        <View style={styles.topRow}>
          <TouchableHighlight style={styles.returnButton} underlayColor="white" onPress={this.props.deselectComments}>
            <Image style={{height:40,width:50}} source={this.props.returnIcon}/>
          </TouchableHighlight>
        </View>
        <View style={styles.detail}>
          <Text>
            Comments...
          </Text>
        </View>
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
    justifyContent:'center',
    borderBottomColor:'lightgray',
    borderBottomWidth:1,
    height:50
  },
  detail:{
    marginTop:20,
    marginLeft:15,
    marginRight:15
  }
});
