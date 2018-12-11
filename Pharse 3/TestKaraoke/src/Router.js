import {HomeScreen} from "./HomeScreen.js" 
import {SettingScreen} from "./SettingScreen.js" 
import {YoutubePlayerScreen} from "./YoutubePlayerScreen.js"
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {createStackNavigator,createBottomTabNavigator} from "react-navigation";


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
			    tabBarLabel:'Settings',
			    tabBarIcon:({tintcolor})=>(
        		<Icon name="ios-settings" color={tintcolor} size={24}></Icon>
      			)
    			}}
			}
             ,{
                tabBarPosition: "bottom"
             })
    }, 
    YoutubePlayer: YoutubePlayerScreen ,
  },
  {
    initialRouteName: "MainScreen",
    headerMode: "none"
  }
);
