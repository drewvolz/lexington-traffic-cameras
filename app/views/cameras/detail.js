/* Lexington Traffic Cameras
 * Detail View
 */

import React, {Component} from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import Video from 'react-native-video'

export default class CamerasDetailView extends Component {
  constructor(props) {
    super(props)
    this.onLoad = this.onLoad.bind(this)
    this.hls = props.item.hls
  }
  state = {
    rate: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
  }

  onLoad(data) {
    this.setState({duration: data.duration})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.fullScreen}>
          <Video
            source={{uri: this.hls}}
            style={styles.nativeVideoControls}
            rate={this.state.rate}
            paused={this.state.paused}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            repeat={true}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  nativeVideoControls: {
    top: 184,
    height: 300
  }
})

CamerasDetailView.propTypes = {
  item: React.PropTypes.shape({
    camera: React.PropTypes.string.isRequired,
    lat: React.PropTypes.string.isRequired,
    lng: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    still: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
    hls: React.PropTypes.string.isRequired,
    dash: React.PropTypes.string.isRequired,
  }).isRequired,
}
