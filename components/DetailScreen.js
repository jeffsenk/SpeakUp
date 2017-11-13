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
    var props = this.props.navigation.state.params;
    return(
      <ScrollView>
        <View style={styles.detail}>
          <Text style={styles.title}>{props.proposal.val().Name}</Text>
          <Text style={styles.paragraph}>{props.proposal.val().Description}</Text>
          <Text style={styles.label}>Pro</Text>
          <Text style={styles.paragraph}>{props.proposal.val().ArgumentPro}</Text>
          <Text style={styles.label}>Con</Text>
          <Text style={styles.paragraph}>{props.proposal.val().ArgumentCon}</Text>
        </View>
      </ScrollView>
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
  },
  paragraph:{
    marginBottom:10
  },
  title:{
    marginBottom:10,
    fontSize:25
  },
  label:{
    marginBottom:10,
    fontSize:20
  }
});
