/* Lexington Traffic Cameras
 * Home Scene
 */

import React from 'react';
import {
  ListView,
  ScrollView
} from 'react-native'

import CameraList from '../../data/cameras.json'
import TrafficCameraListItem from './traffic-camera-list-item'

const Dimensions = require('Dimensions')
let Viewport = Dimensions.get('window')

export default class HomeScene extends React.Component {
  // Initialze the data
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 != row2});
    this.state = {
      dataSource: ds.cloneWithRows(CameraList)
    };
  }
  render() {
    return (
      <ScrollView>
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {(trafficCameraData) => <TrafficCameraListItem {...trafficCameraData} />}
        />
      </ScrollView>
    );
  }
}