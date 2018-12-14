import React from 'react';
import { Button } from 'react-native-elements';
import { WebBrowser } from 'expo';

const WatchButton = ({ videoId,navigate2 }) => (
  <Button
    raised
    title="Watch on YouTube"
    icon={{ name: 'play-arrow' }}
    containerViewStyle={{ marginTop: 10 }}
    backgroundColor="#E62117"
    onPress={() => {
    WebBrowser.openBrowserAsync(
      `https://www.youtube.com/embed/${videoId}`
    );
   }   
  }
  />
);

export default WatchButton;