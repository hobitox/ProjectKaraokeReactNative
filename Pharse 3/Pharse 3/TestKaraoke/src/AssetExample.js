import React, { Component } from 'react';
import {
  Text,
  Button,
  View,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Linking,
} from 'react-native';

import axios from 'axios'; // 0.17.1

// const ds = new ListView.DataSource({
//   rowHasChanged: (r1, r2) => r1 !== r2,
// });

export class AssetExample extends Component {
  constructor(props) {
    super(props);

    var initialListModel = [{ title: 'test' }, { title: 'test2' }];

    this.state = {
      inputValue: 'twice',
      //dataSource: ds.cloneWithRows(initialListModel),
      listModel: initialListModel,
    };
  }

  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };

  searchButtonClicked() {
    var self = this;
    console.log('search', this.state.inputValue);
    var keyword = this.state.inputValue;
    // freemusicdown
    // var url = 'http://story.alltv.am/music/GetJsonListSC.aspx',
    //     'txtSearch=' + this.state.inputValue + '&pageNumber=1&dataCnt=0';
    var url = 'https://api.soundcloud.com/tracks?client_id=5nPOIxNodmiWjvuVLwNZYtaTmEuGVYKy&q=' + keyword;
    axios
      .get(url)
      .then(function(response) {
        console.log(response.data);
        self.setState({ listModel: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  _onPress(item) {
    console.log('press item', item);
    var url = item.stream_url + '?client_id=5nPOIxNodmiWjvuVLwNZYtaTmEuGVYKy';
    Linking.openURL(url);
  }

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this._onPress(item)}>
      <View>
        <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            value={this.state.inputValue}
            onChangeText={this._handleTextChange}
            style={{ width: 200, height: 44, padding: 8 }}
          />
          <Button
            title="Search"
            onPress={this.searchButtonClicked.bind(this)}
          />
        </View>
        <FlatList
          style={styles.list}
          enableEmptySections={true}
          data={this.state.listModel}
          renderItem={this.renderItem}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    // backgroundColor: '#aaa',
    // alignSelf: 'stretch',
  },
});
