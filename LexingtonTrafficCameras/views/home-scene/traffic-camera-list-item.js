import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
  image: {
    // image are 320x240 from stills
    height: 60,
    width: 80,
    borderRadius: 2,
  },
});

export default function TrafficCameraListItem(props) {
  return (
    <View style = {styles.container}>
      <Text style = {styles.text}>
        {props.description}
      </Text>
      <Image source = {{uri: props.still}} style = {styles.image} />
    </View>
  )
}