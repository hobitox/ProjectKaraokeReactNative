import React from 'react';
import { StyleSheet, Text, View, Button,StatusBar,ListView, ScrollView, SearchBar,ActivityIndicator,Alert,TextInput } from 'react-native';
import {TabNavigator,createBottomTabNavigator} from 'react-navigation';
import {AppNavigator} from "./src/Router.js"
StatusBar.setHidden(true);



class App extends React.Component {


    render() {

    return (
      <AppNavigator/>
      

    );
  }

  }

export default App;

