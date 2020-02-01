import React, { Component } from 'react'
import { SafeAreaView, Text } from 'react-native'
//TODO Change react-native-maps because it is deprecated?
import MapView from 'react-native-maps'
import PlaceCard from "./PlaceCard";
import {Overlay} from "react-native-elements";

const Marker = MapView.Marker;

/*
    Wrapper class for react MapView component
    */
export default class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.mapView = React.createRef();
        this.state = {
            selected: false,
            selectedPlace: null,
            region: props.region,
        }
    }

    onRegionChange(region) {
        this.state = {region: region};
        console.log(region);
    }

    markerOnPress(place) {
        this.setState({
            selected: true,
            selectedPlace: place,
            region: {
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        });
    }

    showMarkers() {
        const {places} = this.props;
        return places.map((place, i) => {
            return <Marker
                key={i}
                coordinate={{
                    latitude: place.geometry.location.lat,
                    longitude: place.geometry.location.lng,
                }}
                title={place.name}
                icon={{
                    uri: place.icon
                }}
                onPress={this.markerOnPress.bind(this, place)}
            />
        });
    }

    showPlaceCard() {
        if (this.state.selected) {
            return <PlaceCard title={this.state.selectedPlace.name}/>
        }
    }

    render() {
        const {region} = this.props;
        const {style} = this.props;
        return (
            <SafeAreaView>
                <MapView
                    ref={(el) => (this.mapView = el)}
                    style={style}
                    showsUserLocation
                    onRegionChange={this.onRegionChange.bind(this)}
                    initialRegion={region}
                >
                    {this.showMarkers()}
                </MapView>
                {this.showPlaceCard()}
            </SafeAreaView>
        );
    }
}
