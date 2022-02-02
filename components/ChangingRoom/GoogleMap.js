import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '700px',
};

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;
const LIBRARIES = ['places'];

export default function MyComponent({ center, home, setHome }) {
  const [map, setMap] = useState(null);
  const [results, setResults] = useState(null);
  const [initialize, setInitialize] = useState(0);
  const [info, setInfo] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY, // ,
    libraries: LIBRARIES,
    // ...otherOptions
  });

  const initMap = () => {
    const onLoad = mapInstance => {
      setMap(mapInstance);
      let service = new google.maps.places.PlacesService(mapInstance);
      let request = {
        location: center,
        radius: 10000,
        keyword: 'restrooms',
      };
      service.nearbySearch(request, function (results, status) {
        setResults(results);
      });
    };

    const onDragChange = () => {
      let service = new google.maps.places.PlacesService(map);
      let request = {
        location: { lat: map.center.lat(), lng: map.center.lng() },
        radius: 10000,
        keyword: 'restrooms',
      };
      service.nearbySearch(request, function (result, status) {
        setResults(result);
      });
      setHome(false);
    };

    const centerChanged = () => {
      if ((initialize < 2 && map) || home) {
        let service = new google.maps.places.PlacesService(map);
        let request = {
          location: center,
          radius: 10000,
          keyword: 'restrooms',
        };
        service.nearbySearch(request, function (results, status) {
          setResults(results);
        });
        setInitialize(initialize + 1);
      }
    };
    const divStyle = {
      background: `white`,
      padding: 2,
      width: '100px',
    };

    const onMarkerLoad = marker => {
      marker.addListener('click', () => {
        let options = {
          title: marker.title,
          position: { lat: marker.position.lat(), lng: marker.position.lng() },
        };
        setInfo(options);
      });
    };
    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        onDragEnd={onDragChange}
        clickableIcons={true}
        onLoad={onLoad}
        onCenterChanged={centerChanged}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {results
          ? results.map(item => {
              return (
                <Marker
                  key={item.place_id}
                  onLoad={onMarkerLoad}
                  position={{
                    lat: item.geometry.location.lat(),
                    lng: item.geometry.location.lng(),
                  }}
                  title={`Name: ${item.name} \n Location: ${item.vicinity}`}
                />
              );
            })
          : null}

        {info ? (
          <InfoWindow position={info.position} onCloseClick={() => setInfo(null)}>
            <div style={divStyle}>
              <div>{info.title}</div>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }
  return isLoaded ? initMap() : <div>no map</div>;
}
