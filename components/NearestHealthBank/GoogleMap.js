import React, { useState, useEffect } from "react"
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  Circle,
} from "@react-google-maps/api"
import * as parkData from "./data/skateboard-parks.json"
// import mapStyles from "./mapStyles";

function Map() {
  const [selectedPark, setSelectedPark] = useState(null)

  // useEffect(() => {
  //   const listener = (e) => {
  //     if (e.key === "Escape") {
  //       setSelectedPark(null);
  //     }
  //   };
  //   window.addEventListener("keydown", listener);

  //   return () => {
  //     window.removeEventListener("keydown", listener);
  //   };
  // }, []);

  return (
    <div style={{ width: "100%", height: "80vh" }}>
      <LoadScript
        id="script-loader"
        googleMapsApiKey={`${process.env.GOOGLE_MAP_API_KEY}`}
        style={{ width: "100%", height: "80vh" }}
      >
        <GoogleMap
          id="example-map"
          defaultZoom={10}
          defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
        >
          {parkData.features.map((park) => (
            <Marker
              key={park.properties.PARK_ID}
              position={{
                lat: park.geometry.coordinates[1],
                lng: park.geometry.coordinates[0],
              }}
              onClick={() => {
                setSelectedPark(park)
              }}
              //   icon={{
              //     url: `/skateboarding.svg`,
              //     scaledSize: new window.google.maps.Size(25, 25)
              //   }}
            />
          ))}

          {selectedPark && (
            <InfoWindow
              onCloseClick={() => {
                setSelectedPark(null)
              }}
              position={{
                lat: selectedPark.geometry.coordinates[1],
                lng: selectedPark.geometry.coordinates[0],
              }}
            >
              <div>
                <h2>{selectedPark.properties.NAME}</h2>
                <p>{selectedPark.properties.DESCRIPTIO}</p>
              </div>
            </InfoWindow>
          )}
          <Circle
            radius={3000}
            center={{ lat: 45.4211, lng: -75.6903 }}
            // onMouseover={() => console.log('mouseover')}
            // onClick={() => console.log('click')}
            // onMouseout={() => console.log('mouseout')}
            fillColor="#FF0000"
            fillOpacity={0.2}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default Map
// const MapWrapped = withScriptjs(withGoogleMap(Map));

// export default function App() {
//   return (
//     <div style={{ width: "100vw", height: "100vh" }}>
//       <MapWrapped
//         googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.GOOGLE_MAP_API_KEY}`}
//         loadingElement={<div style={{ height: `100%` }} />}
//         containerElement={<div style={{ height: `100%` }} />}
//         mapElement={<div style={{ height: `100%` }} />}
//       />
//     </div>
//   );
// }
