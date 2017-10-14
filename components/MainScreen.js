import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  View
} from 'react-native';
import ProposalBox from './ProposalBox';

export default class MainScreen extends Component<{}>{
  constructor(props){
    super(props);
  }

  render(){

    return(
      <View style={styles.outer}>
        <FlatList data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item})=> <ProposalBox name={item.key}/> }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outer:{
    flex:1
  }
});
