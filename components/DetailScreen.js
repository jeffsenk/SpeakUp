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

export default class DetailScreen extends Component<{}>{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <View>
        <View style={styles.topRow}>
          <TouchableHighlight style={styles.returnButton} underlayColor="white" onPress={this.props.deselectProposal}>
            <Image style={{height:40,width:50}} source={this.props.returnIcon}/>
          </TouchableHighlight>
          <Text style={{fontSize:20,fontWeight:'bold',marginLeft:20}}> Details </Text>
        </View>
        <View style={styles.detail}>
          <Text>{this.props.proposal.val().Description}</Text>
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
    flexDirection:'row',
    alignItems:'center',
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
