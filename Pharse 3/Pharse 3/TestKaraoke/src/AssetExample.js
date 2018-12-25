import React, { Component } from 'react';
import {
  Text,
  Button,
  View,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import {Card} from 'react-native-elements'
import { WebBrowser } from 'expo';
import axios from 'axios'; // 0.17.1
import AppHeader from './components/AppHeader';

// const ds = new ListView.DataSource({
//   rowHasChanged: (r1, r2) => r1 !== r2,
// });

export class AssetExample extends Component {
  constructor(props) {
    super(props);

    var initialListModel = [{ title: 'test',avatar_url: '' }, { title: 'test2',avatar_url: '' }];

    this.state = {
      inputValue: '',
      //dataSource: ds.cloneWithRows(initialListModel),
      listModel: [],
    };
    this.searchButtonClicked=this.searchButtonClicked.bind(this);
  }

  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };

  searchButtonClicked() {
    var self = this;
    //console.log('search', this.state.inputValue);
    var keyword = this.state.inputValue;
    // freemusicdown
    // var url = 'http://story.alltv.am/music/GetJsonListSC.aspx',
    //     'txtSearch=' + this.state.inputValue + '&pageNumber=1&dataCnt=0';
    var url = 'https://api.soundcloud.com/tracks?client_id=5nPOIxNodmiWjvuVLwNZYtaTmEuGVYKy&q=' + keyword;
    axios
      .get(url)
      .then(function(response) {
        console.log('json: ', response.data[0]);
        var temp=response.data;
        var list=[];
        //self.setState({ listModel: response.data });
        //console.log(this.state.listModel);
        for(i=0;i<temp.length;i++)
        {
          list=[...list,{
            title:temp[i].title,
            avatar_url:temp[i].user.avatar_url,
            stream_url:temp[i].stream_url,
          }];
        }
        self.setState({listModel:list});
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  _onPress(item) {
    console.log('press item', item);
    var url = item.stream_url + '?client_id=5nPOIxNodmiWjvuVLwNZYtaTmEuGVYKy';
    this.props.navigation.navigate('Mp3Player', {
      item: item,
      mp3Source: url,
    });
  }

  renderItem = ({ item }) => (
    <View>
      <Card title={null} style={styles.cardStyle}>
        <Image 
          style={{ width: 200, height: 150, alignSelf: 'center' }}
          source={{uri: item.avatar_url}}
          />

        <View style={styles.contentStyle}>
          <Text style={styles.titleStyle}>
            {item.title}
          </Text>
          <Button
            raised
            title="Play music"
            icon={{ name: 'play-arrow' }}
            containerViewStyle={{ marginTop: 10 }}
            backgroundColor="#E62117"
            onPress={() => this._onPress(item)}
          />
        </View>
      </Card>
    </View>   
    
    
  );

  render() {
    console.log(this.state);
    return (
      <View style={styles.container} >
          <TextInput
            style={styles.TextInputStyleClass}
            value={this.state.inputValue}
            
            onChangeText={this._handleTextChange}
            underlineColorAndroid='transparent'
            placeholder="Tìm bài hát"
          />
          <Button
            title="Search"
            onPress={this.searchButtonClicked.bind(this)}
          />
          
          <FlatList
          //style={styles.list}
          enableEmptySections={true}
          data={this.state.listModel}
          renderItem={this.renderItem}
          />        
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInputStyleClass:{          
    textAlign: 'center',
    height: 40,
    width: 350,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 7 ,
    backgroundColor : "#FFFFFF"        
    },
    cardStyle: {
      padding: 5
    },
    imageStyle: {
      alignSelf: 'repeat',
      height: 180
    },
    contentStyle: {
      flex: 1,
      padding: 5
    },
    titleStyle: {
      fontSize: 12,
      marginBottom: 5
    },
    channelTitleStyle: {
      fontSize: 11,
      color: '#777',
      marginBottom: 5,
      alignSelf: 'flex-end'
    },
    descriptionStyle: {
      fontSize: 11,
      alignSelf: 'center'
    }
});
