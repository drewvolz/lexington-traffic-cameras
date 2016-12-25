/* Lexington Traffic Cameras
 * Detail View
 */

import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
})

export default function CamerasDetailView(props) {
  return (
    <View style={styles.container}>
      <Text>{props.item.hls}</Text>
    </View>
  )
}
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
