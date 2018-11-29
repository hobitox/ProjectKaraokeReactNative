import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export class YoutubePlayerScreen extends React.Component {
  render() {
  	const videoId = this.props.navigation.getParam('videoId', 'NO-ID');

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Youtube Player Video ID= {videoId}</Text>

      </View>
    );
  }
}
