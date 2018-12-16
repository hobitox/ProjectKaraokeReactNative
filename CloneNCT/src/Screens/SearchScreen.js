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

import {connect} from 'react-redux'


var Sound = require('react-native-sound');

var input='';
var whoosh;

class SearchScreen extends Component<Props> {


  
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
  
    this.state = {
      searchSongList:[],
      searchVideoList:[],
      searchKaraokeList:[],
      searchPlaylistList:[],

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
      

      
    };
    this.getSearchSongRespone=this.getSearchSongRespone.bind(this);
    this.playSong=this.playSong.bind(this);
    this.getSearchVideoRespone=this.getSearchVideoRespone.bind(this);
    this.playVideo=this.playVideo.bind(this);
    this.getSearchKaraokeRespone=this.getSearchKaraokeRespone.bind(this);
    this.playKaraoke=this.playKaraoke.bind(this);
    this.getSearchPlaylistRespone=this.getSearchPlaylistRespone.bind(this);
    this.playPlaylist=this.playPlaylist.bind(this);
    this.setCurrentTab=this.setCurrentTab.bind(this);
    
  }


  setCurrentTab(tab){
    this.setState({
      currentTab:{
        'all':false,
        'song':false,
        'video':false,
        'karaoke':false,
        'playlist':false,
      },
    });
    switch (tab) {
      case 'all':
        this.setState({currentTab:
          {
            all:true,
          }});
        break;
      case 'song':
        this.setState({currentTab:{
          song:true,
        }});
        break;
      case 'video':
        this.setState({currentTab:{
          video:true,
        }});
        break;
      case 'karaoke':
        this.setState({currentTab:{
          karaoke:true,
        }});
        break;
      case 'playlist':
        this.setState({currentTab:{
          playlist:true,
        }});
        break;
      default:
        // statements_def
        break;
    }
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
  async getSearchPlaylistRespone() {


    this.setState({searchPlaylistList:[]});
    //console.log('Helper tra ve',Helper.getSearchKaraokeRespone(this.state.input));
    if(input!='')
    {
      this.setState({searchPlaylistList:await Helper.getSearchPlaylistRespone(input)});
    }
    //console.log(this.state.searchPlaylistList);

    
  }


  async playSong(item){
    
    //console.log('Pressed Play Song',item);
    //this.setState({
    //  SongPlayerState:{
    //    item:item,
    //    mp3Source:await Helper.getMp3Source(item.link),
    //}});
    //console.log(this.state.SongPlayerState);
    await Helper.getMp3Source(item.link)
    .then(returnResult=>this.props.dispatch({type:'ADD_SONG_TO_FIRST_PLAYLIST',item:item,mp3Source:returnResult}))
    .then(returnResult=>console.log('returnResult: ',returnResult));

    //this.props.navigation.navigate('Mp3Player');
    //this.props.dispatch({type:'ADD_SONG_TO_PLAYLIST',item:item,mp3Source:Helper.getMp3Source(item.link)});
    //console.log(this.props.state);
    this.props.dispatch({type:'LOAD_SONG'});

    //console.log('whoosh: ',this.props.whoosh);
    //console.log('state: ',this.props.state);
    //this.props.dispatch({type:'START_PLAY'});


    //this.props.navigation.navigate('NewPlayer',{'item':item,'mp3Source':await Helper.getMp3Source(item.link),returnWhoosh:this.returnWhoosh.bind(this)});
  }
  async playPlaylist(item){
    
    await Helper.getSongFromPlaylist(item.link)
    .then(returnResult=> this.props.dispatch({type:'ADD_PLAYLIST',playList:returnResult}));


    this.props.dispatch({type:'LOAD_SONG'});
    //this.props.navigation.navigate('NewPlayer',{'item':item,'mp3Source':await Helper.getMp3Source(item.link),returnWhoosh:this.returnWhoosh.bind(this)});
  }
  async playVideo(item){
    
    //console.log('Pressed Play Video',item.title);
    
    this.props.navigation.navigate('VideoPlayer',{'item':item,'videoSource':await Helper.getVideoSource(item.link)});
  }
  async playKaraoke(item){
    
    //console.log('Pressed Play Karaoke',item.title);
    
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
        'karaoke':false,
        'playlist':false,
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
        'karaoke':false,
        'playlist':false,
        }
      });
    }
    if(this.state.currentTab.karaoke)
    {
      this.setState({
      currentTab:{
        'all':false,
        'song':false,
        'video':true,
        'karaoke':false,
        'playlist':false,
        }
      });
    }
    if(this.state.currentTab.playlist)
    {
      this.setState({
      currentTab:{
        'all':false,
        'song':false,
        'video':false,
        'karaoke':true,
        'playlist':false,
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
        'karaoke':false,
        'playlist':false,
        }
      });
    }
    if(this.state.currentTab.video)
    {
      this.setState({
      currentTab:{
        'all':false,
        'song':false,
        'video':false,
        'karaoke':true,
        'playlist':false,
        }
      });
    }
    if(this.state.currentTab.karaoke)
    {
      this.setState({
      currentTab:{
        'all':false,
        'song':false,
        'video':false,
        'karaoke':false,
        'playlist':true,
        }
      });
    }
    if(this.state.currentTab.playlist)
    {
      this.setState({
      currentTab:{
        'all':true,
        'song':false,
        'video':false,
        'karaoke':false,
        'playlist':false,
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
              flex: 2,
              backgroundColor: this.state.backgroundColor
            }}
            >
            <View>
              <TextInput 
                placehoder="Tìm kiếm..."
                onChangeText={(inputtext) => input=inputtext}
                style={{color:'black',fontWeight: 'bold'}}
                //value={input}
                />
              <Button 
                onPress={()=>{
                  //console.log('Button search pressed');
                  this.getSearchSongRespone();
                  this.getSearchVideoRespone();
                  this.getSearchKaraokeRespone();
                  this.getSearchPlaylistRespone();
                  
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
                    <TouchableOpacity onPress={()=>this.setCurrentTab('all')}>
                      <Text>Tất cả</Text>
                    </TouchableOpacity>
                  </View>
                
                
                  <View style={this.state.currentTab.song?styles.tabViewChosen:styles.tabView}>
                    <TouchableOpacity onPress={()=>this.setCurrentTab('song')}>
                      <Text>Bài hát</Text>
                    </TouchableOpacity>
                  </View>
                
                
                  <View style={this.state.currentTab.video?styles.tabViewChosen:styles.tabView}>
                    <TouchableOpacity onPress={()=>this.setCurrentTab('video')}>
                      <Text>Video</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={this.state.currentTab.karaoke?styles.tabViewChosen:styles.tabView}>
                    <TouchableOpacity onPress={()=>this.setCurrentTab('karaoke')}>
                      <Text>Karaoke</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={this.state.currentTab.playlist?styles.tabViewChosen:styles.tabView}>
                    <TouchableOpacity onPress={()=>this.setCurrentTab('playlist')}>
                      <Text>PlayList</Text>
                    </TouchableOpacity>
                  </View>
                

                </View>
                {this.props.isShowMiniPlayer&&
                <View style={{left:0}}>
                    <View style={{flexDirection:'row'}}>
                      <Button 
                      onPress={()=>{
                        whoosh=this.props.whoosh;
                        //console.log('Button Start pressed');
                        whoosh.play();
                        
                      }}
                      title="Start"
                      color="#841584"
                      />
                      <Button 
                      onPress={()=>{
                        whoosh=this.props.whoosh;
                        //console.log('Button Pause pressed');
                        whoosh.pause();
                        
                      }}
                      title="Pause"
                      color="#841584"
                      />
                      <Button 
                      onPress={()=>{
                        whoosh=this.props.whoosh;
                        //console.log('Button Stop pressed');
                        whoosh.stop();
                        
                      }}
                      title="Stop"
                      color="#841584"
                      />
                      <Button 
                      onPress={()=>{
                        whoosh=this.props.whoosh;
                        //console.log('whoosh: ',whoosh);
                        //console.log('state:', this.props.state);
                        
                        
                      }}
                      title="GET INFO"
                      color="#841584"
                      />
                      <Button 
                      onPress={()=>{
                        this.props.dispatch({type:'NEXT'});
                        this.props.dispatch({type:'LOAD_SONG'});
                      }}
                      title="NEXT"
                      color="#841584"
                      />
                      <Button 
                      onPress={()=>{
                        this.props.navigation.navigate('Mp3Player');
                        
                      }}
                      title="ZOOM"
                      color="#841584"
                      />
                    </View>
                  </View>
                }
                <TouchableOpacity onPress = {() => {this.props.dispatch({type:'CHANGE_MINI_PLAYER'})}}>
                <View style = {{backgroundColor: '#841584', alignItems: 'center', 
                                justifyContent: 'center',heiht:10}}
                       >
                    <Text style = {{color: 'white'}}>...</Text>
                </View>
                </TouchableOpacity>




                 
                {this.state.currentTab.all&&
                  <ScrollView>
                    <View>
                        <Text style={styles.labelText}>Bài hát</Text>
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
                        <Text style={styles.labelText}>Video</Text>
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
                        <Text style={styles.labelText}>Karaoke</Text>
                        <FlatList
                        horizontal={true}
                        data={this.state.searchKaraokeList}
                        keyExreactor={(x, i)=>i}
                        renderItem={({item})=>
                          <ListVideoNgang item={item} key={i} onPress={this.playKaraoke}/>
                        }>        
                        </FlatList>
                    </View>
                    <View>
                        <Text style={styles.labelText}>PlayList</Text>
                        <FlatList
                        horizontal={true}
                        data={this.state.searchPlaylistList}
                        keyExreactor={(x, i)=>i}
                        renderItem={({item})=>
                          <ListVideoNgang item={item} key={i} onPress={this.playPlaylist}/>
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
                {this.state.currentTab.karaoke&&
                  <View>
                    
                    <View>
                      <FlatList
                    data={this.state.searchKaraokeList}
                    keyExreactor={(x, i)=>i}
                    renderItem={({item})=>
                      <ListSong item={item} key={i} onPress={this.playVideo}/>
                    }>        
                    </FlatList>
                    </View>
                    
                  </View>
                  
                }
                {this.state.currentTab.playlist&&
                  <View>
                    
                    <View>
                      <FlatList
                    data={this.state.searchPlaylistList}
                    keyExreactor={(x, i)=>i}
                    renderItem={({item})=>
                      <ListSong item={item} key={i} onPress={this.playPlaylist}/>
                    }>        
                    </FlatList>
                    </View>
                    
                  </View>
                  
                }
              </View>


              

            
          </GestureRecognizer>
        );
    

          
          
      




 
  }
}


function mapStateToProps(state)
{
  return{ 
    playList:state.playList,
    whoosh:state.whoosh,
    isPlaying:state.isPlaying,
    currentSongNum:state.currentSongNum,
    isPaused:state.isPaused,
    state:state,
    isShowMiniPlayer:state.isShowMiniPlayer,
    }
}

export default connect(mapStateToProps)(SearchScreen);
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

  },
  labelText: {
    color:'red',
    fontWeight: 'bold',

  },
});
