import React, {Component} from 'react'
//TODO Change react-native-maps because it is deprecated?
import MapView, {Marker} from 'react-native-maps'

/*
    Wrapper class for react MapView component
 */
export default class MapContainer extends Component {
    constructor(props) {
        super(props);
    }

    onRegionChange(region) {
        this.state = {region};
    }

    showMarkers() {
        return this.props.places.map((place) => (
            <Marker
                coordinate={place.latlng}
                title={place.title}
            />
        ));
    }

    render() {
        const { region } = this.props;
        const { style } = this.props;
        return (
            <MapView
                style={style}
                showsUserLocation
                onRegionChange={this.onRegionChange}
                region={region}
            >
                {this.showMarkers()}
            </MapView>
        );
    }
}
