import React, { Component } from "react"
import {
  Map,
  GoogleApiWrapper,
  InfoWindow,
  Marker,
  Circle,
} from "google-maps-react"
import yellowMarker from "./marker_icon/yellow_marker.png"
import redMarker from "./marker_icon/red_marker.png"
import greenMarker from "./marker_icon/green_marker.png"

class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    activeItem: "",
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    })
  }

  onClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      })
    }
  }

  componentDidMount() {
    this.setState({ activeItem: this.props.activeItem })
  }

  // componentWillReceiveProps(props) {
  //   this.setState({ activeItem: props.activeItem });
  // }

  render() {
    const { lat, lng, points, width, height } = this.props
    return (
      <Map
        google={this.props.google}
        zoom={13}
        style={{
          width,
          height,
        }}
        initialCenter={{
          lat,
          lng,
        }}
      >
        <Marker
          onClick={this.onMarkerClick}
          position={{ lat, lng }}
          options={{ icon: `${yellowMarker}` }}
          name="Your Location"
        />

        {this.props.points &&
          points.map((point, id) => {
            if (point.name === this.state.activeItem) {
              return (
                <Marker
                  key={id}
                  options={{ icon: `${redMarker}` }}
                  onClick={this.onMarkerClick}
                  position={{
                    lat: point.location.lat,
                    lng: point.location.lng,
                  }}
                  name={
                    <div>
                      <h3>{point.name}</h3>
                      {point.rating}
                      <p>{point.address}</p>
                    </div>
                  }
                />
              )
            }
            return (
              <Marker
                key={id}
                options={{ icon: `${greenMarker}` }}
                onClick={this.onMarkerClick}
                position={{
                  lat: point.location.lat,
                  lng: point.location.lng,
                }}
                name={
                  <div>
                    <h3>{point.name}</h3>
                    point.rating
                    <p>{point.address}</p>
                  </div>
                }
              />
            )
          })}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        <Circle
          radius={3000}
          center={{ lat, lng }}
          // onMouseover={() => console.log('mouseover')}
          // onClick={() => console.log('click')}
          // onMouseout={() => console.log('mouseout')}
          strokeColor="transparent"
          strokeOpacity={0}
          strokeWeight={5}
          fillColor="#FF0000"
          fillOpacity={0.2}
        />
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAP_API_KEY,
})(MapContainer)
