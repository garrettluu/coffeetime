import React, {Component} from 'react'
//TODO Change react-native-maps because it is deprecated?
import MapView from 'react-native-maps'

const Marker = MapView.Marker;

/*
    Wrapper class for react MapView component
    */
export default class MapContainer extends Component {
  constructor() {
    super();
  }

  onRegionChange(region) {
    this.state = {region};
  }

  showMarkers() {
    const {places} = this.props;
    return places.map( (place, i) => {
      return <Marker
        key={i}
        coordinate={{
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
        }}
        title={place.name}
      />
    });
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
