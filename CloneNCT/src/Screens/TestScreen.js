import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput, Button,ScrollView,FlatList} from 'react-native';
import Helper from '../Helper.js'


export default class TestScreen extends Component<Props> {

	async getVideo()
	{
		var temp=await Helper.getVideoSource('https://www.nhaccuatui.com/video/chac-ai-do-se-ve-son-tung-m-tp.UCmZyEiaNKmbb.html');
		console.log(temp);
	}
	componentWillMount()
	{
		this.getVideo();
	}



	render(){
		return(
				<View>
					<Text>TestScreen</Text>

				</View>

			)
	}

}
