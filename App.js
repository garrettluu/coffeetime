/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, PermissionsAndroid,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MapView from "react-native-maps";
import MapContainer from "./app/components/MapContainer";
import Geolocation from "react-native-geolocation-service";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
    };
  }
  componentDidMount(): void {
    this.getLocationAsync();
  }

  async getLocationAsync() {
    const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (permission === PermissionsAndroid.RESULTS.GRANTED) {
      await Geolocation.getCurrentPosition((position) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        this.setState({region});
      });
    } else {
      //TODO Permission denied
    }
  }
  render() {
    return (
        <Fragment>
          <StatusBar barStyle="dark-content"/>
          <SafeAreaView>
            <MapContainer
                region={this.state.region}
            />
          </SafeAreaView>
        </Fragment>
    );
  }
}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
