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
      filteredUsers:[],
      simplifiedUsers:[],
      displayData:[]
    }
    this.handleSearchResults = this.handleSearchResults.bind(this);
    this.simplifyUsers = this.simplifyUsers.bind(this);
    this.getDisplayData = this.getDisplayData.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
  }

  fetchUsers(database){
    database.ref('Users').on('child_added',function(user){
      let newState = this.state.users;
      newState.push(user);
      this.setState({users:newState});
    }.bind(this));
  }

  componentWillReceiveProps(nextProps){
    this.simplifyUsers(nextProps.screenProps);
    this.getDisplayData(nextProps.screenProps);
  }

  componentDidMount(){
    this.fetchUsers(this.props.screenProps.database);
    this.simplifyUsers(this.props.screenProps);
    this.getDisplayData(this.props.screenProps);
  }

  handleSearchResults(data){
    this.setState({filteredUsers:data});
    this.getDisplayData(this.props.screenProps);
  }

  simplifyUsers(props){
    var searchData = [];
    for(var i =0;i<this.state.users.length;i++){
      searchData.push({Name:this.state.users[i].val().Name,Key:this.state.users[i].key});
    }
    this.setState({simplifiedUsers:searchData});
  }

  getDisplayData(props){
    if(this.state.filteredUsers.length >0){
      var displayData =[];
      for(var j=0;j<this.state.users.length;j++){
        for(var k =0;k<this.state.filteredUsers.length;k++){
          if(this.state.users[j].key == this.state.filteredUsers[k].Key){
            displayData.push(this.state.users[j]);
          }
        }
      }
      this.setState({displayData:displayData});
    }else{
      this.setState({displayData:this.state.users});
    }
  }

  render(){
    const props = this.props.screenProps;
    const selectUser = function(user){
      this.props.navigation.navigate('UserDetail',{user:user});
    }.bind(this);

    return(
      <View style={{flex:1,justifyContent:'flex-start'}}>
        <View style={styles.search}>
          <SearchBar hideBack={true}  data={this.state.simplifiedUsers} handleResults={this.handleSearchResults} showOnLoad={true}  />
        </View>
        <Text style={styles.title}>Users</Text>
        <FlatList extraData={this.state} data={this.state.displayData}
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
