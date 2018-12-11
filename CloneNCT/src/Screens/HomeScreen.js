import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput, Button,ScrollView,FlatList} from 'react-native';
const cheerio = require('cheerio-without-node-native')
import ListSong from '../component/list_song.js'
import ListVideo from '../component/list_video.js'


import Helper from '../Helper.js'


export default class HomeScreen extends Component<Props> {


  
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
  
    this.state = {
      listNgheGiHomNay:[],

    };
    this.getNgheGiHomNay=this.getNgheGiHomNay.bind(this);
    this.playSong=this.playSong.bind(this);

    this.playVideo=this.playVideo.bind(this);
    
  }

  
  async getNgheGiHomNay()
  {
    console.log(await Helper.getNgheGiHomNay());
    
  }

  
  async playSong(item){
    
    console.log('Pressed Play Song',item.title);
    
    this.props.navigation.navigate('NewPlayer',{'item':item,'mp3Source':await Helper.getMp3Source(item.link)});
  }
  async playVideo(item){
    
    console.log('Pressed Play Video',item.title);
    
    this.props.navigation.navigate('VideoPlayer',{'item':item,'videoSource':await Helper.getVideoSource(item.link)});
  }
  componentWillMount()
  { 
    
    //console.log('blabla4');
    //this.getSearchSongRespone();
    //this.getXmlUrl();
  }
  render() {
    return (
      <View>
        <View>
          
          <Button 
            onPress={()=>{
              console.log('Button search pressed');
              this.getSearchSongRespone();
              this.getSearchVideoRespone();
              
            }}
            title="Tìm kiếm"
            color="#841584"
            />
        </View>

        <View>
          <Text>Nghe gì hôm nay</Text>

        </View>




        <View style={{flexDirection:'row'}}>
          <View style={{flex:1}}>

          <Text>Danh sach Video</Text>

          <FlatList
          data={this.state.searchVideoList}
          keyExreactor={(x, i)=>i}
          renderItem={({item})=>
            <ListVideo item={item} key={i} onPress={this.playVideo}/>
          }>        
          </FlatList>

        </View>

        <View style={{flex:1}}>

          <Text>Danh sach Bai hat</Text>

          <FlatList
          
          data={this.state.searchSongList}
          keyExreactor={(x, i)=>i}
          renderItem={({item})=>
            <ListSong item={item} key={i} onPress={this.playSong}/>
          }>        
          </FlatList>

        </View>
        </View>
        
        


      </View>
    );
  }
}

