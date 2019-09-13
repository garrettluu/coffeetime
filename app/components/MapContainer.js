import React, {Component} from 'react'
import {PermissionsAndroid} from 'react-native'
import MapView from 'react-native-maps'
import Geolocation from "react-native-geolocation-service";

export default class MapContainer extends Component {
    constructor(props) {
        super(props);
    }

    onRegionChange(region) {
        this.state = {region};
    }

    render() {
        const { region } = this.props;
        return (
            <MapView
                style={mapStyle.container}
                showsUserLocation
                region={region}
            />
        );
    }
}

const mapStyle = {
    container: {
        width: '100%',
        height: '80%',
    }
};

