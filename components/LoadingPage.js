import React from 'react';
import { Circle } from 'better-react-spinkit';

export default function LoadingPage() {
  return (
    <center style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <Circle color='#FF00FF' size={100} />
    </center>
  );
}
