import React from 'react';
import { ScrollView, View } from 'react-native';
import VideoListItem from './VideoListItem';

const VideoList = ({ videos,navigate }) => {
  const videoItems = videos.map(video => (
    <VideoListItem
      navigate1={navigate}
      key={video.etag}
      video={video}
    />
  ));

  return (
    <ScrollView>
      <View style={style.containerStyle}>
        {videoItems}
      </View>
    </ScrollView>
  );
};

const style = {
  containerStyle: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  }
};

export default VideoList;