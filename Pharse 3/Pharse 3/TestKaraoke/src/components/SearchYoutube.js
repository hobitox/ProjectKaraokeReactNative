import React, { Component } from 'react';
import { View, TextInput,Button } from 'react-native';

class SearchYoutube extends Component {
  state = { term: '' };

  render() {
    const {
      containerStyle,
      searchTextStyle,
      buttonStyle
    } = styles;

    return (
      <View style={containerStyle}>
        <TextInput
          style={searchTextStyle}
          onChangeText={term => this.setState({ term })}
          value={this.state.term}
        />
        <Button
          buttonStyle={buttonStyle}
          title={this.props.loading ? 'Loading...' : 'Search'}
          onPress={() => this.props.onPressSearch(this.state.term +' karaoke')} 
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    marginTop: 75,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row'
  },
  searchTextStyle: {
    flex: 1,
    backgroundColor: 'white'
  },
  buttonStyle: {
    height: 30,
    marginBottom: 8
  }
};


export default SearchYoutube;