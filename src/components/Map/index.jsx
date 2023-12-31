import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api"

const containerStyle = {
  width: "100%",
  height: "86vh",
};

const center = {
  lat: 34.7293466708865,
  lng: 135.49939605607292,
};

const zoom = 13;

export default function Map() {
  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLEMAPS}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
      ></GoogleMap>
    </LoadScript>
  );
}
