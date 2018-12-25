import {HomeScreen} from "./HomeScreen.js" 
import {SettingScreen} from "./SettingScreen.js" 
import {AssetExample} from "./AssetExample.js"
import {IntroScreen} from "./IntroScreen.js" 
import {Mp3PlayerScreen} from "./mp3Player.js" 

import {YoutubePlayerScreen} from "./YoutubePlayerScreen.js"
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {createStackNavigator,createBottomTabNavigator, HeaderBackButton} from "react-navigation";


export const AppNavigator = createStackNavigator(
  {
    
    MainScreen: { 
        screen: createBottomTabNavigator(
             {
            	Home:{screen:HomeScreen,
  				navigationOptions:{
    			tabBarLabel:'Home',
    			tabBarIcon:({tintcolor})=>(
      			<Icon name="ios-home" color={tintcolor} size={24}></Icon>
    			)
  				}},
            	Setting:{screen:SettingScreen,
    			navigationOptions:{
			    tabBarLabel:'Search Online',
			    tabBarIcon:({tintcolor})=>(
        		<Icon name="ios-search" color={tintcolor} size={24}></Icon>
      			)
          }},
            AssetExample:{screen:AssetExample,
              navigationOptions:{
              tabBarLabel:'Sound Cloud',
              tabBarIcon:({tintcolor})=>(
              <Icon name="ios-play" color={tintcolor} size={24}></Icon>
              )             
          }}
          
          
			}
             ,{
                tabBarPosition: "bottom",
              
             }),

    }, 
    YoutubePlayer: YoutubePlayerScreen,
    Mp3Player: Mp3PlayerScreen,
    Intro: IntroScreen,
  },
   
  { 
    initialRouteName: "MainScreen",
    headerMode: "none"
  }
);
