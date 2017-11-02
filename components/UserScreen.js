import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  Image,
  View
} from 'react-native';

import UserItem from './UserItem';
import SearchBar from 'react-native-searchbar';

export default class UserScreen extends Component<{}>{
  static navigationOptions={
    header:null
  }

  constructor(props){
    super(props);
    this.state={
      users:[],
      filteredUsers:[]
    }
    this.handleSearchResults = this.handleSearchResults.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({users:nextProps.screenProps.users});
  }

  handleSearchResults(data){
    this.setState({filteredUsers:data});
  }

  render(){
    const props = this.props.screenProps;

    const selectUser = function(user){
      this.props.navigation.navigate('UserDetail',{user:user});
    }.bind(this);

    var searchData = [];
    for(var i =0;i<props.users.length;i++){
      searchData.push({Name:props.users[i].val().Name,Key:props.users[i].key});
    }

    var displayData =[];
    if(this.state.filteredUsers.length >0){
    for(var j=0;j<props.users.length;j++){
      for(var k =0;k<this.state.filteredUsers.length;k++){
        if(props.users[j].key == this.state.filteredUsers[k].Key){
          displayData.push(props.users[j]);
        }
      }
    }
    }else{
      displayData = props.users;
    }

    return(
      <View style={{flex:1,justifyContent:'flex-start'}}>
        <View style={styles.search}>
          <SearchBar hideBack={true}  data={searchData} handleResults={this.handleSearchResults} showOnLoad={true} allDataOnEmptySearch={true} />
        </View>
        <Text style={styles.title}>Users</Text>
        <FlatList extraData={this.state} data={displayData}
         renderItem={({item})=> <UserItem database={props.database}
         thisUser={props.user} user={item} selectUser={selectUser} /> }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search:{
    marginLeft:10,
    marginRight:10,
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    height:50,
    borderBottomWidth:1,
    borderBottomColor:'lightgray'
  },
  title:{
    marginLeft:10,
    fontSize:25,
    marginTop:10,
    marginBottom:20
  }
});
