/**
 * Lexington Traffic Cameras
 * Index view
 */

import React from 'react'
import {
  Navigator,
  BackAndroid,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native'

import CamerasListView from './views/cameras/list'
import CamerasDetailView from './views/cameras/detail'

import NoRoute from './views/components/no-route'

// Render a given scene
function renderScene(route, navigator) {
  let props = {route, navigator, ...(route.props || {})}
  switch (route.id) {
    case 'CamerasListView': return <CamerasListView {...props} />
    case 'CamerasDetailView': return <CamerasDetailView {...props} />
    default: return <NoRoute {...props} />
  }
}

import Icon from 'react-native-vector-icons/Ionicons'
import * as c from './views/components/colors'

const navbarShadows = Platform.OS === 'ios'
  ? {
    shadowOffset: { width: 0, height: StyleSheet.hairlineWidth },
    shadowColor: 'rgb(100, 100, 100)',
    shadowOpacity: 0.5,
    shadowRadius: StyleSheet.hairlineWidth,
  }
  : {
    elevation: 4,
  }

import {Dimensions} from 'react-native'
const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 64 : 56,
    flex: 1,
    backgroundColor: Platform.OS === 'ios' ? c.iosLightBackground : c.androidLightBackground,
  },
  navigationBar: {
    backgroundColor: c.infoBlue,
    ...navbarShadows,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 17,
    color: 'white',
  },
  backButtonIcon: {
    color: 'white',
    fontSize: Platform.OS === 'ios' ? 36 : 24,
    paddingVertical: Platform.OS === 'ios' ? 4 : 16,
    paddingLeft: Platform.OS === 'ios' ? 8 : 16,
    paddingRight: 6,
  },
  backButtonClose: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Platform.OS === 'ios' ? 10 : 16,
    paddingHorizontal: Platform.OS === 'ios' ? 18 : 16,
  },
  backButtonCloseText: {
    fontSize: 17,
    color: 'white',
  },
  titleText: {
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-light',
    fontSize: Platform.OS === 'ios' ? 17 : 20,
    fontWeight: Platform.OS === 'ios' ? '600' : '500',
    marginVertical: Platform.OS === 'ios' ? 12 : 14,
  },
})

function LeftButton(route, navigator, index, navState) {
  if (route.onDismiss) {
    return null
  }

  if (index <= 0) {
    return null
  }
  let backTitle = navState.routeStack[index].backButtonTitle || navState.routeStack[index-1].title
  if (index === 1) {
    backTitle = 'Cameras'
  }
  if (Platform.OS === 'android') {
    return (
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigator.pop()}
      >
          <Icon style={styles.backButtonIcon} name='md-arrow-back' />
      </TouchableOpacity>
    )
  } else {
    return (
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigator.pop()}
      >
        <Icon style={styles.backButtonIcon} name='ios-arrow-back' />
        <Text style={styles.backButtonText}>{backTitle}</Text>
      </TouchableOpacity>
    )
  }
}

function RightButton(route, navigator, index, navState) {
  return null
}

function Title(route) {
  let divideBy = route.id !== 'CamerasListView' ? 2.5 : 1
  return (
    <Text
      style={[styles.titleText, {maxWidth: Dimensions.get('window').width / divideBy }]}
      numberOfLines={1}
      ellipsizeMode='tail'
    >
      {route.title}
    </Text>
  )
}

class App extends React.Component {
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.registerAndroidBackButton)
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.registerAndroidBackButton)
  }

  registerAndroidBackButton = () => {
    if (this._navigator && this._navigator.getCurrentRoutes().length > 1) {
      this._navigator.pop()
      return true
    }
    return false
  }

  render() {
    return (
      <Navigator
        ref={nav => this._navigator = nav}
        navigationBar={
          <Navigator.NavigationBar
            style={styles.navigationBar}
            routeMapper={{
              LeftButton,
              RightButton,
              Title,
            }}
          />
        }
        initialRoute={{
          id: 'CamerasListView',
          title: 'Lexington Traffic Cameras',
          index: 0,
        }}
        renderScene={renderScene}
        sceneStyle={styles.container}
        configureScene={route => {
          if (route.sceneConfig) {
            return route.sceneConfig
          }
          return Navigator.SceneConfigs.PushFromRight
        }}
      />
    )
  }
}

 export default () => <App/>
