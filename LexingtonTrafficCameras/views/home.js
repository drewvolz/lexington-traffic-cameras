/* Lexington Traffic Cameras
 * Home Scene
 */

import React from 'react';
import {
  ListView,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native'

import cameraList from '../data/cameras.json'

const Dimensions = require('Dimensions')
let Viewport = Dimensions.get('window')

export default class HomeScene extends React.Component {
  // Initialze the data
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 != row2});
    this.state = {
      dataSource: ds.cloneWithRows(cameraList)
    };
  }
  render() {
    return (
      <View style = {{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {(rowData) => <Text>{rowData.description}</Text>}
        />
      </View>
    );
  }
}