import React from 'react';
import {Platform, StyleSheet, Text, View,TextInput, Button,ScrollView,FlatList,Image,Slider} from 'react-native';
import { BackHandler } from 'react-native';

const soundObject = new Expo.Audio.Sound();

var refresh;
export class Mp3PlayerScreen extends React.Component {
	
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	mp3Source:'',
	  	avatar:'',
	  	title:'',
	  	singer_name:'',
	  	currentTime:'0',
	  	duration:0,
	  	sliderValue:0,

	  	};
	  	this.getInfo=this.getInfo.bind(this);
	  	this.onPressStart=this.onPressStart.bind(this);	
	  	this.loadMp3=this.loadMp3.bind(this);
	}
	componentWillMount()
	{	

		console.log('getParam tu Home');
		this.setState({
			mp3Source:this.props.navigation.getParam('mp3Source'),
		  	avatar:this.props.navigation.getParam('item').avatar_url,
		  	title:this.props.navigation.getParam('item').title,
		  	singer_name:this.props.navigation.getParam('item').singer_name,
		  	currentTime:0,
		  	duration:0,
		});
		
	}
	render(){
		return(
				<View style={styles.container}>
					<Text>{this.state.title}</Text>
					<Image 
          				style={{ width: 200, height: 150, alignSelf: 'center' }}
          				source={{uri: this.state.avatar}}
          				/>
					<Text>{this.state.singer_name}</Text>
					
			   		<Text>Time {this.state.currentTime}/{this.secondToTime(Math.round(this.state.duration))}</Text>
			   		<Slider 
			   			style={{width:300}}
			   			step={1}
			   			value={this.state.sliderValue}
			   			minimumValue={0}
			   			maximumValue={this.state.duration}
			   			onValueChange={val=>this.seekTo(val)}
			   			/>


			   		<View style={styles.ButtonContainer}>
			   			<Button title="Stop"
		    				color="#841584"
		    				onPress={this.onPressStop}
		    			/>
			    		<Button title="Pause"
			    				color="#841584"
			    				onPress={this.onPressPause}
			    			/>
			    		<Button title="Start"
			    				color="#841584"
			    				onPress={this.onPressStart}
			    			/>
						<Button title="Back"
			    				color="#841584"
			    				onPress={() => this.props.navigation.goBack()}
			    			/>
			   		</View>
					
		    		
				</View>

			)
	}
	componentDidMount()
	{
		this.loadMp3();
		//this.onPressStart();
	}
	componentWillUnmount(){
		clearInterval(refresh);
		soundObject.unloadAsync();
	}

	async loadMp3()
	{	
		console.log('load file',this.state.mp3Source);
		try {
			await soundObject.loadAsync({uri:this.state.mp3Source});
			await soundObject.playAsync();
			// Your sound is playing!
		  } catch (error) {
			  console.log('error playing',error);
``		  }
		this.TimerTest();
		
		
	}
	seekTo(value)
	{
		soundObject.setPositionAsync(value);

	}
	onPressPause()
	{
		console.log('Pause Pressed');
		
		soundObject.pauseAsync()
		.then(Response=>console.log(Response));

		
	}

	onPressStop()
	{	
		soundObject.stopAsync()

	}
	onPressStart()
	{	
		
		soundObject.playAsync();

	}
	TimerTest()
	{	
		refresh= setInterval(()=>
			{
				this.getInfo();
			}
			, 1000);
	}
	getInfo() {
		try {
			soundObject.getStatusAsync()
			.then(respone=>{ 
				this.setState({
					currentTime: respone.positionMillis,
					duration: respone.durationMillis,
					sliderValue: respone.positionMillis,

				});
			});

			    	
			    
		} catch(e) {
			// statements
			console.log('There is no song playing', e)
		}
	}
	secondToTime(seconds)
	{
		var time=seconds%1000;
		time=(seconds-time)/1000+':'+time%1000;
		return time;
	}
	
	
}
const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	  },
  Avatar: {
    width: 120,
    height: 120
  },
  ButtonContainer:{
  	flexDirection:'row'
  },
  TextContent:{
  	flexDirection:'column'
  }
});
