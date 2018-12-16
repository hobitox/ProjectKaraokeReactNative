import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput, Button,ScrollView,FlatList} from 'react-native';
import Helper from '../Helper.js'
export default class TestScreen extends Component<Props> {

	componentWillMount()
	{
		this.test();	
	}
	async test()
	{
		await Helper.getBaiHatHot();
	}
	render(){
		return(
				<View>
					<Text>TestScreen</Text>
					
				</View>

			)
		}

}
