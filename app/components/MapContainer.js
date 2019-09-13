import React, {Component} from 'react'
//TODO Change react-native-maps because it is deprecated?
import MapView from 'react-native-maps'

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
            </MapView>
        );
    }
}
