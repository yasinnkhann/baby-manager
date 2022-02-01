import React from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

const options = {
  zoomControlOptions: {
    position: 7, // ,
    // ...otherOptions
  },
};
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;

export default function MyComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY, // ,
    // ...otherOptions
  });

  const renderMap = () => {
    // wrapping to a function is useful in case you want to access `window.google`
    // to eg. setup options or create latLng object, it won't be available otherwise
    // feel free to render directly if you don't need that
    // const onLoad = React.useCallback(
    //   function onLoad (mapInstance) {
    //     // do something with map Instance
    //   }
    // )
    return (
      <GoogleMap
        options={options}
        // onLoad={onLoad}
      >
        {
          // ...Your map components
        }
      </GoogleMap>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <div>no map</div>;
}
