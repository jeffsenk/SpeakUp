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
        </View>
        <View style={styles.detail}>
          <Text>
            The FCC voted 2-1, along political party lines Thursday, to begin a rule-making process to replace the Open Internet order, or net neutrality rules, adopted in 2015 by the agency, then headed by Chairman Tom Wheeler, a Democrat.
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
