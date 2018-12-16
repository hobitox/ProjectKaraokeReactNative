import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput, Button,ScrollView,FlatList,TouchableOpacity,RefreshControl} from 'react-native';
import ListSong from '../component/list_song.js'
import ListSongNgang from '../component/list_song_ngang.js'
import ListVideo from '../component/list_video.js'
import ListVideoNgang from '../component/list_video_ngang.js'

import Helper from '../Helper.js'

import {connect} from 'react-redux'

var Sound = require('react-native-sound');
var whoosh;

class HomeScreen extends Component<Props> {



  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);

    this.state = {
      listNgheGiHomNay:[],
      listAlbumHot:[],
      listBaiHatHot:[],
      refreshing: false,

    };
    this.getNgheGiHomNay=this.getNgheGiHomNay.bind(this);
    this.playPlaylist=this.playPlaylist.bind(this);
    this.getAlbumHot=this.getAlbumHot.bind(this);
    this.getBaiHatHot=this.getBaiHatHot.bind(this);
    this.playSong=this.playSong.bind(this);
    this._onRefresh=this._onRefresh.bind(this);

  }

   _onRefresh = () => {
    this.setState({refreshing: true});
    this.setState({
      listNgheGiHomNay:[],
      listAlbumHot:[],
      listBaiHatHot:[],
    });
    this.getNgheGiHomNay();
    this.getAlbumHot();
    this.getBaiHatHot();
    this.setState({refreshing:false});
  }

  componentWillMount()
  {
    this.getNgheGiHomNay();
    this.getAlbumHot();
    this.getBaiHatHot();
    
  }
  async getBaiHatHot(){

    this.setState({listBaiHatHot:await Helper.getBaiHatHot()});
  }
  async getNgheGiHomNay(){

    this.setState({listNgheGiHomNay:await Helper.getNgheGiHomNay()});
  }
  async getAlbumHot(){

    this.setState({listAlbumHot:await Helper.getAlbumHot()});
  }


  async playPlaylist(item){
    
    await Helper.getSongFromPlaylist(item.link)
    .then(returnResult=> this.props.dispatch({type:'ADD_PLAYLIST',playList:returnResult}));


    this.props.dispatch({type:'LOAD_SONG'});
    //this.props.navigation.navigate('NewPlayer',{'item':item,'mp3Source':await Helper.getMp3Source(item.link),returnWhoosh:this.returnWhoosh.bind(this)});
  }
  async playSong(item){
    
    //console.log('Pressed Play Song',item);
    await Helper.getMp3Source(item.link)
    .then(returnResult=>this.props.dispatch({type:'ADD_SONG_TO_FIRST_PLAYLIST',item:item,mp3Source:returnResult}))
    .then(returnResult=>//console.log('returnResult: ',returnResult));

    //this.props.navigation.navigate('Mp3Player');
    //this.props.dispatch({type:'ADD_SONG_TO_PLAYLIST',item:item,mp3Source:Helper.getMp3Source(item.link)});
    //console.log(this.props.state);
    this.props.dispatch({type:'LOAD_SONG'});

    //console.log('whoosh: ',this.props.whoosh);
    //console.log('state: ',this.props.state);
    //this.props.dispatch({type:'START_PLAY'});


    //this.props.navigation.navigate('NewPlayer',{'item':item,'mp3Source':await Helper.getMp3Source(item.link),returnWhoosh:this.returnWhoosh.bind(this)});
  }

  render() {
    return (
      <View>
        <View>
            <Button
            onPress={()=>{
              this.props.navigation.navigate('Search');

            }}
            title="Tìm kiếm...."
            color="#841584"
            />

        </View>
        {this.props.isShowMiniPlayer&&
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
                this.props.dispatch({type:'NEXT'});
                this.props.dispatch({type:'LOAD_SONG'});
              }}
              title="NEXT"
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
              this.props.navigation.navigate('Mp3Player');

            }}
            title="ZOOM"
            color="#841584"
            />
        </View>
      }

      <TouchableOpacity onPress = {() => {this.props.dispatch({type:'CHANGE_MINI_PLAYER'})}}>
        <View style = {{backgroundColor: '#841584', alignItems: 'center', 
                          justifyContent: 'center',heiht:10}}>

            <Text style = {{color: 'white'}}>...</Text>
        </View>
      </TouchableOpacity>

      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />}>


      <View>

          <Text style={styles.labelText}>Nghe gì hôm nay</Text>
          <FlatList
            horizontal={true}
            data={this.state.listNgheGiHomNay}
            keyExreactor={(x, i)=>i}
            renderItem={({item})=>
              <ListVideoNgang item={item} key={i} onPress={this.playPlaylist}/>
            }>        
          </FlatList>

      </View>
      <View>

          <Text style={styles.labelText}>Album Hot</Text>
          <FlatList
            horizontal={true}
            data={this.state.listAlbumHot}
            keyExreactor={(x, i)=>i}
            renderItem={({item})=>
              <ListVideoNgang item={item} key={i} onPress={this.playPlaylist}/>
            }>        
          </FlatList>

      </View>
      <View>

          <Text style={styles.labelText}>Bài hát trong ngày</Text>
          <FlatList
            horizontal={true}
            data={this.state.listBaiHatHot}
            keyExreactor={(x, i)=>i}
            renderItem={({item})=>
              <ListSongNgang item={item} key={i} onPress={this.playSong}/>
            }>        
          </FlatList>

      </View>
      </ScrollView>
  </View>
  );
  }
}

const styles = StyleSheet.create({
  labelText: {
    color:'red',
    fontWeight: 'bold',

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

export default connect(mapStateToProps)(HomeScreen);