/* Lexington Traffic Cameras
 * List View
 */

import React from 'react'
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import AlphabetListView from 'react-native-alphabetlistview'
import groupBy from 'lodash/groupBy'
import head from 'lodash/head'
import sortBy from 'lodash/sortBy'
import * as c from '../components/colors'

import cameras from '../../data/cameras.json'
let sortedCameras = sortBy(cameras, 'description')

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: c.white,
  },
  listView: {
    paddingRight: 16,
  },
  textRows: {
    paddingTop: 8,
    paddingBottom: 8,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  notLastRow: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#c8c7cc',
  },
  itemTitle: {
    color: c.black,
    fontWeight: '500',
    paddingBottom: 1,
    fontSize: 14,
    paddingLeft: 10,
    textAlign: 'left',
  },
  image: {
    // images are 320x240 from stills
    height: 71,
    width: 80,
  },
  rowSectionHeader: {
    backgroundColor: c.iosListSectionHeader,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    height: 27,
    borderBottomWidth: 1,
    borderColor: '#ebebeb',
  },
  rowSectionHeaderText: {
    color: 'black',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  arrowIcon: {
    color: c.iosDisabledText,
    fontSize: 20,
    marginRight: 6,
    marginLeft: 4,
    marginTop: 8,
  },
})

export default class CamerasListView extends React.Component {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    route: React.PropTypes.object.isRequired,
  };

  onPressRow = data => {
    this.props.navigator.push({
      id: 'CamerasDetailView',
      index: this.props.route.index + 1,
      title: data.description,
      backButtonTitle: 'Cameras',
      props: {item: data},
    })
  }

  renderRow = ({isLast, item}) => {
    return (
      <TouchableHighlight underlayColor={'#ebebeb'} onPress={() => this.onPressRow(item)}>
        <View style={[styles.row, !isLast && styles.notLastRow]}>
          <View style={[styles.textRows]}>
            <Image source = {{uri: item.still}} style = {styles.image} />
            <Text style={styles.itemTitle} numberOfLines={1}>{item.description}</Text>
          </View>
          <Icon style={[styles.arrowIcon]} name='ios-arrow-forward' />
        </View>
      </TouchableHighlight>
    )
  }

  renderHeader = ({title}) => {
    return (
      <View style={styles.rowSectionHeader}>
        <Text style={styles.rowSectionHeaderText}>{title}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <AlphabetListView
          contentContainerStyle={styles.listView}
          data={groupBy(sortedCameras, item => head(item.description))}
          cell={this.renderRow}
          sectionHeader={this.renderHeader}
          sectionHeaderHeight={28}
          cellHeight={70}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }
}
