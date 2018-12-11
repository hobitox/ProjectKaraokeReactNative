import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput, Button,ScrollView,FlatList,Dimensions,TouchableOpacity} from 'react-native';
const cheerio = require('cheerio-without-node-native')
import ListSong from '../component/list_song.js'
import ListSongNgang from '../component/list_song_ngang.js'
import ListVideo from '../component/list_video.js'
import ListVideoNgang from '../component/list_video_ngang.js'
import Helper from '../Helper.js'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import SongPlayer from '../component/SongPlayer.js'
var Sound = require('react-native-sound');

var input='';
var whoosh;

export default class SearchScreen extends Component<Props> {


  
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
  
    this.state = {
      searchSongList:[],
      searchVideoList:[],
      searchKaraokeList:[],
      searchPlayListList:[],

      myText: 'I\'m ready to get swiped!',
      gestureName: 'none',
      backgroundColor: '#fff',

      currentTab:{
        'all':true,
        'song':false,
        'video':false,
        'karaoke':false,
        'playlist':false,
      },



      SongPlayerState:{
        item:{
          avatar:'',
          title:'',
          singer_name:'',
        },
        mp3Source:'',
      },
      


      
    };
    this.getSearchSongRespone=this.getSearchSongRespone.bind(this);
    this.playSong=this.playSong.bind(this);
    this.getSearchVideoRespone=this.getSearchVideoRespone.bind(this);
    this.playVideo=this.playVideo.bind(this);
    this.getSearchKaraokeRespone=this.getSearchKaraokeRespone.bind(this);
    this.playKaraoke=this.playKaraoke.bind(this);
    
  }

  async getSearchSongRespone() {

    //console.log('input: ',input);
    this.setState({searchSongList:[]});
    //console.log('Helper tra ve',Helper.getSearchSongRespone(this.state.input));
    if(input!='')
    {
      this.setState({searchSongList:await Helper.getSearchSongRespone(input)});
    }
    
  }
  async getSearchVideoRespone() {


    this.setState({searchVideoList:[]});
    //console.log('Helper tra ve',Helper.getSearchSongRespone(this.state.input));
    if(input!='')
    {
      this.setState({searchVideoList:await Helper.getSearchVideoRespone(input)});
    }
    
  }
  async getSearchKaraokeRespone() {


    this.setState({searchKaraokeList:[]});
    //console.log('Helper tra ve',Helper.getSearchKaraokeRespone(this.state.input));
    if(input!='')
    {
      this.setState({searchKaraokeList:await Helper.getSearchKaraokeRespone(input)});
    }

    
  }

  returnWhoosh(whooshreturn)
  {
    whoosh=whooshreturn;
    console.log('already get whoosh:',whoosh);
  }
  async playSong(item){
    
    console.log('Pressed Play Song',item.title);
    //this.setState({
    //  SongPlayerState:{
    //    item:item,
    //    mp3Source:await Helper.getMp3Source(item.link),
    //}});
    //console.log(this.state.SongPlayerState);
    this.props.navigation.navigate('NewPlayer',{'item':item,'mp3Source':await Helper.getMp3Source(item.link),returnWhoosh:this.returnWhoosh.bind(this)});
  }
  async playVideo(item){
    
    console.log('Pressed Play Video',item.title);
    
    this.props.navigation.navigate('VideoPlayer',{'item':item,'videoSource':await Helper.getVideoSource(item.link)});
  }
  async playKaraoke(item){
    
    console.log('Pressed Play Karaoke',item.title);
    
    this.props.navigation.navigate('VideoPlayer',{'item':item,'videoSource':await Helper.getVideoSource(item.link)});
  }
  componentWillMount()
  { 
    
    //console.log('blabla4');
    //this.getSearchSongRespone();
    //this.getXmlUrl();
  }


  onSwipeUp(gestureState) {
    this.setState({myText: 'You swiped up!'});
  }
 
  onSwipeDown(gestureState) {
    this.setState({myText: 'You swiped down!'});
  }
 
  onSwipeRight(gestureState) {
    this.setState({myText: 'You swiped left!'});
    if(this.state.currentTab.song)
    {
      this.setState({
      currentTab:{
        'all':true,
        'song':false,
        'video':false,
        }
      });
    }
    if(this.state.currentTab.video)
    {
      this.setState({
      currentTab:{
        'all':false,
        'song':true,
        'video':false,
        }
      });
    }
  }
 
  onSwipeLeft(gestureState) {
    this.setState({myText: 'You swiped Right!'});
    if(this.state.currentTab.all)
    {
      
    }
    if(this.state.currentTab.song)
    {
      this.setState({
      currentTab:{
        'all':false,
        'song':false,
        'video':true,
        }
      });
    }
    
  }
 
  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({backgroundColor: 'red'});
        break;
      case SWIPE_DOWN:
        this.setState({backgroundColor: 'green'});
        break;
      case SWIPE_LEFT:
        this.setState({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        this.setState({backgroundColor: 'yellow'});
        break;
    }
  }

  render() {

        const config = {
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80
        };
        return (



          

          <GestureRecognizer
            
            onSwipeLeft={(state) => this.onSwipeLeft(state)}
            onSwipeRight={(state) => this.onSwipeRight(state)}

            config={config}
            style={{
              flex: 1,
              backgroundColor: this.state.backgroundColor
            }}
            >
            <View>
              <TextInput 
                onChangeText={(inputtext) => input=inputtext}
                //value={input}
                />
              <Button 
                onPress={()=>{
                  console.log('Button search pressed');
                  this.getSearchSongRespone();
                  this.getSearchVideoRespone();
                  this.getSearchKaraokeRespone();
                  
                }}
                title="Search"
                color="#841584"
                />
            </View>
              

              

              <View>
                <View 
                style={{
                  flexDirection:'row',
                  }}>
                
                  <View style={this.state.currentTab.all?styles.tabViewChosen:styles.tabView}>
                    <TouchableOpacity onPress={()=>this.setState({currentTab:{all:true}})}>
                      <Text>Tất cả</Text>
                    </TouchableOpacity>
                  </View>
                
                
                  <View style={this.state.currentTab.song?styles.tabViewChosen:styles.tabView}>
                    <TouchableOpacity onPress={()=>this.setState({currentTab:{song:true}})}>
                      <Text>Bài hát</Text>
                    </TouchableOpacity>
                  </View>
                
                
                  <View style={this.state.currentTab.video?styles.tabViewChosen:styles.tabView}>
                    <TouchableOpacity onPress={()=>this.setState({currentTab:{video:true}})}>
                      <Text>Video</Text>
                    </TouchableOpacity>
                  </View>
                

                </View>

                {this.state.currentTab.all&&
                  <ScrollView>
                    <View>
                        <Text>Bài hát</Text>
                        <FlatList
                        horizontal={true}
                        data={this.state.searchSongList}
                        keyExreactor={(x, i)=>i}
                        renderItem={({item})=>
                          <ListSongNgang item={item} key={i} onPress={this.playSong}/>
                        }>        
                        </FlatList>
                    </View>
                    <View>
                        <Text>Video</Text>
                        <FlatList
                        horizontal={true}
                        data={this.state.searchVideoList}
                        keyExreactor={(x, i)=>i}
                        renderItem={({item})=>
                          <ListVideoNgang item={item} key={i} onPress={this.playVideo}/>
                        }>        
                        </FlatList>
                    </View>
                    <View>
                        <Text>Karaoke</Text>
                        <FlatList
                        horizontal={true}
                        data={this.state.searchKaraokeList}
                        keyExreactor={(x, i)=>i}
                        renderItem={({item})=>
                          <ListVideoNgang item={item} key={i} onPress={this.playKaraoke}/>
                        }>        
                        </FlatList>
                    </View>
                  </ScrollView>
                } 
                {this.state.currentTab.song&&
                  <View>
                    
                    <View>
                      <FlatList
                      data={this.state.searchSongList}
                      keyExreactor={(x, i)=>i}
                      renderItem={({item})=>
                        <ListSong item={item} key={i} onPress={this.playSong}/>
                      }>        
                      </FlatList>
                      </View>
                    
                  </View>
                } 
                {this.state.currentTab.video&&
                  <View>
                    
                    <View>
                      <FlatList
                    data={this.state.searchVideoList}
                    keyExreactor={(x, i)=>i}
                    renderItem={({item})=>
                      <ListSong item={item} key={i} onPress={this.playVideo}/>
                    }>        
                    </FlatList>
                    </View>
                    
                  </View>
                  
                }
              </View>


              <View style={{bottom:0}}>
                <View style={{flexDirection:'row'}}>
                  <Button 
                  onPress={()=>{
                    console.log('Button Start pressed');
                    whoosh.play();
                    
                  }}
                  title="Start"
                  color="#841584"
                  />
                  <Button 
                  onPress={()=>{
                    console.log('Button Pause pressed');
                    whoosh.pause();
                    
                  }}
                  title="Pause"
                  color="#841584"
                  />
                  <Button 
                  onPress={()=>{
                    console.log('Button Stop pressed');
                    whoosh.stop();
                    
                  }}
                  title="Stop"
                  color="#841584"
                  />
                </View>
              </View> 

            
          </GestureRecognizer>
        );
    

          
          
      




 
  }
}
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabView:{
    flex: 1,
    borderWidth:5,

  },
  tabViewChosen:{
    flex: 1,
    borderWidth:5,
    backgroundColor: 'blue',

  }
});
