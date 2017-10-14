import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';

export default class ProposalBox extends Component<{}>{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style={styles.outer}>
        <Text>{this.props.name}</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  outer:{
    height:600,
    borderBottomColor:'black',
    borderBottomWidth:1
  }
});
