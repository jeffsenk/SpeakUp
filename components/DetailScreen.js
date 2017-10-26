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
import BackHeader from './BackHeader';

export default class DetailScreen extends Component<{}>{
  constructor(props){
    super(props);
  }

  render(){
    var title = "Details";
    return(
      <View>
        <BackHeader onPress={this.props.deselectProposal} returnIcon={this.props.returnIcon} title={title}/>
        <View style={styles.detail}>
          <Text style={styles.paragraph}>{this.props.proposal.val().Description}</Text>
          <Text style={styles.paragraph}>{this.props.proposal.val().ArgumentPro}</Text>
          <Text style={styles.paragraph}>{this.props.proposal.val().ArgumentCon}</Text>
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
    height:540,
    marginTop:20,
    marginLeft:15,
    marginRight:15
  },
  paragraph:{
    marginBottom:10
  }
});
