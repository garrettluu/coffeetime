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
import MapContainer from "./app/components/MapContainer";
import Geolocation from "react-native-geolocation-service";

import Qs from 'qs';
import axios from 'axios';

//Importing API key -- see README for details
import mapApiKey from "./mapApiKey";

import placeholderShops from "./placeholderShops";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      coffeeShops: [],
    };
  }
  componentDidMount() {
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
    await this.getCoffeeShops(this.state.region, 10000);
  }

  async getCoffeeShops(region, radius) {
    axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + Qs.stringify({
      key: mapApiKey.key,
      location: "33.7742,-117.9024",
      radius: radius,
      type: 'cafe',
    })).then(async (response) => {
        this.state.coffeeShops = response.data.results;
    });
  }

  render() {
    return (
        <Fragment>
          <StatusBar barStyle="dark-content"/>
          <SafeAreaView>
            <MapContainer
                region={this.state.region}
                style={styles.container}
                places={this.state.coffeeShops}
            />
          </SafeAreaView>
        </Fragment>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
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
});
