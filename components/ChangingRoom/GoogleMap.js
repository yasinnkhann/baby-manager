import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { compose, withProps } from 'recompose';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;

export const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px` }} />,
    mapElement: <div style={{ height: `100%`, width: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={props.location}
    center={props.location}
    clickableIcons={true}
  >
    {props.isMarkerShown && <Marker position={{ lat: 47.397, lng: -120.644 }} />}
    <Marker position={{ lat: 47.397, lng: -121.644 }} />
  </GoogleMap>
));
