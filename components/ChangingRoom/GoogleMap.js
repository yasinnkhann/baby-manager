import React, { Component, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  StandaloneSearchBox,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;
const libraries = ['places'];

function MyComponents({ center, zoom }) {
  const [searchBox, setSearchBox] = useState(null);
  const onLoad = ref => {
    searchBox = ref;
  };
  const onPlacesChanged = () => setSearchBox(searchBox.getPlaces());

  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={libraries}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onCenterChanged
        onZoomChanged
        clickableIcons={true}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {searchBox
          ? searchBox.map(item => {
              console.log(item.geometry.location.lat());
              return (
                <Marker
                  key={item.place_id}
                  position={{
                    lat: item.geometry.location.lat(),
                    lng: item.geometry.location.lng(),
                  }}
                />
              );
            })
          : null}

        <InfoWindow position={{ lat: 47.5, lng: -122.644 }}>
          <div>
            <h1>InfoWindow</h1>
          </div>
        </InfoWindow>
        <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
          <input
            type='text'
            placeholder='Search Bathrooms here'
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: 'absolute',
              left: '50%',
              marginLeft: '-120px',
            }}
          />
        </StandaloneSearchBox>
      </GoogleMap>
    </LoadScript>
  );
}

export default MyComponents;
