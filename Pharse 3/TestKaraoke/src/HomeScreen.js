import React from 'react';
import { StyleSheet, Text, View, Button,StatusBar,ListView, ScrollView, SearchBar,ActivityIndicator,Alert,TextInput,TouchableOpacity } from 'react-native';
import {TabNavigator,createBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import YTSearch from 'youtube-api-search';
import AppHeader from './components/AppHeader';
import SearchYoutube from './components/SearchYoutube';
import VideoList from './components/VideoList';
StatusBar.setHidden(true);
const API_KEY="AIzaSyBdbtMyB2J3wjA3SIrpvBTwL4UrCpXs1uc";



export class HomeScreen extends React.Component {

  constructor(props) {
   
      super(props);
   
      this.state = {
   
        isLoading: true,
        text: '',
      
      }
   
      this.arrayholder = [] ;
    }

    componentDidMount() {
 
      return fetch('https://api.myjson.com/bins/1dmh54')
        .then((response) => response.json())
        .then((responseJson) => {
          let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson),
          }, function() {
   
            // In this block you can do something with new state.
            this.arrayholder = responseJson ;
   
          });
        })
        .catch((error) => {
          console.error(error);
        });
        
    }


    GetListViewItem (TENBH) {
    
   Alert.alert(TENBH);
  
  }

SearchFilterFunction(text){
     
     const newData = this.arrayholder.filter(function(item){
         const itemData = item.TENBH.toUpperCase()
         const textData = text.toUpperCase()
         return itemData.indexOf(textData) > -1
     })
     this.setState({
         dataSource: this.state.dataSource.cloneWithRows(newData),
         text: text
     })
 }



ListViewItemSeparator = () => {
  return (
    <View
      style={{
        height: .5,
        width: "100%",
        backgroundColor: "#000",
      }}
    />
  );
}

ListViewItemSeparator = () => {
  return (
    <View
      style={{
        height: .5,
        width: "100%",
        backgroundColor: "#000",
      }}
    />
  );
}

ListViewItemSeparator = () => {
  return (
    <View
      style={{
        height: .5,
        width: "100%",
        backgroundColor: "#000",
      }}
    />
  );
}


  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
 
    return (
 
      <View style={styles.MainContainer}>
      <TextInput 
       style={styles.TextInputStyleClass}
       onChangeText={(text) => this.SearchFilterFunction(text)}
       value={this.state.text}
       underlineColorAndroid='transparent'
       placeholder="Tìm bài hát"
        />
 
        <ListView
 
          dataSource={this.state.dataSource}
 
          renderSeparator= {this.ListViewItemSeparator}
 
          renderRow={(rowData) =>
          <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('YoutubePlayer',{
                videoId:rowData.KEYYOUTUBE
                })
            }}>
           <View style={styles.container}>
            <Text style={{fontWeight:'bold',fontSize: 20,color:'red'}}>Mã bài hát:{rowData.MABH}</Text>
            <Text style={{fontSize: 18}} >{rowData.TENBH}</Text>
            <Text>Tác giả:{rowData.TACGIA}</Text>
          </View>
          </TouchableOpacity>
        }
 
          enableEmptySections={true}
 
          style={{marginTop: 10}}
 
        />
 
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
