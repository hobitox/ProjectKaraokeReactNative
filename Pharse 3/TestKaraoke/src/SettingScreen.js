import React from 'react';
import { StyleSheet, Text, View, Button,StatusBar,ListView, ScrollView, SearchBar,ActivityIndicator,Alert,TextInput } from 'react-native';
import {TabNavigator,createBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import YTSearch from 'youtube-api-search';
import AppHeader from './components/AppHeader';
import SearchYoutube from './components/SearchYoutube';
import VideoList from './components/VideoList';
StatusBar.setHidden(true);
const API_KEY="AIzaSyBdbtMyB2J3wjA3SIrpvBTwL4UrCpXs1uc";

export class SettingScreen extends React.Component {
	
  state = {
    loading: false,
    videos: []
  }
  onPressSearch = term => {
    this.searchYT(term);
  }
  searchYT = term => {
    this.setState({ loading: true });
    YTSearch({ key: API_KEY, term }, videos => {
      console.log(videos);
      this.setState({
        loading: false,
        videos
      });
    });
  }
  render() {
    const { loading, videos } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#ddd' }}>
        <AppHeader headerText="Simple YouTube Search" />
        <SearchYoutube
          loading={loading}
          onPressSearch={this.onPressSearch}
        />
        <VideoList  
        	navigate={this.props.navigation.navigate}
             
            videos={videos} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item:{
    flex:1,
    alignSelf:'stretch',
    margin:10,
    alignItems:'center',
    justifyContent:'center',
    borderBottomWidth:1,
    borderBottomColor:"#eee"
  },
  MainContainer :{
 
    justifyContent: 'center',
    flex:1,
    margin: 7,
   
    },
   
   rowViewContainer: {
     fontSize: 17,
     padding: 10
    },
   
    TextInputStyleClass:{
          
     textAlign: 'center',
     height: 40,
     borderWidth: 1,
     borderColor: '#009688',
     borderRadius: 7 ,
     backgroundColor : "#FFFFFF"
          
     }
});

