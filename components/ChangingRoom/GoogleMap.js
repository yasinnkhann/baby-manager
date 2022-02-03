import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const containerStyle = {
  width: '100%',
  height: '85.5vh',
};

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;
const LIBRARIES = ['places'];

export default function MyComponent({ center }) {
  const [map, setMap] = useState(null);
  const [results, setResults] = useState(null);
  const [initialize, setInitialize] = useState(0);
  const [info, setInfo] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: LIBRARIES,
  });

  const initMap = () => {
    const fetchBathroom = (mapInstance, location) => {
      map = map || mapInstance;
      let service = new google.maps.places.PlacesService(map);
      let request = {
        location: location,
        radius: 5000,
        keyword: 'restrooms',
      };
      service.nearbySearch(request, function (results, status) {
        if (map) {
          setResults(results);
        }
      });
    };

    const onLoad = mapInstance => {
      setMap(mapInstance);
      // fetchBathroom(mapInstance, center);
    };

    const onDragChange = () => {
      let location = { lat: map.center.lat(), lng: map.center.lng() };
      fetchBathroom(null, location);
    };

    const centerChanged = () => {
      if (initialize < 2 && map) {
        fetchBathroom(null, center);
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

    const onUnmount = map => {
      setMap(null);
    };

    let buttonStyle = {
      padding: '7px',
      backgroundColor: 'white',
      borderRadius: '2px',
      fontFamily: 'Roboto, Arial, sans-serif',
      boxShadow: 'rgb(0 0 0 / 30%) 0px 1px 4px -1px',
      zIndex: '30',
      position: 'absolute',
      top: '80px',
      right: '60px',
      height: '40px',
    };

    const buttonClickHandler = () => {
      map.setCenter(center);
      fetchBathroom(null, center);
    };

    return (
      <>
        <button style={buttonStyle} onClick={buttonClickHandler}>
          <MyLocationIcon /> <div className='hidden md:inline'>Current Location</div>
        </button>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onDragEnd={onDragChange}
          clickableIcons={true}
          onLoad={onLoad}
          onCenterChanged={centerChanged}
          onUnmount={onUnmount}
        >
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
                    title={JSON.stringify({
                      name: item.name,
                      location: item.vicinity,
                      url: item.geometry.location.toUrlValue(),
                    })}
                  />
                );
              })
            : null}

          {info ? (
            <InfoWindow position={info.position} onCloseClick={() => setInfo(null)}>
              <div style={divStyle}>
                <div>
                  <b>Name: </b>
                  {JSON.parse(info.title).name}
                </div>
                <div>
                  <b>Location: </b>
                  {JSON.parse(info.title).location}
                </div>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }
  return isLoaded ? initMap() : <div>Google Maps is Loading</div>;
}
