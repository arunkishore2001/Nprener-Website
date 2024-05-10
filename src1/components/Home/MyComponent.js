import React, { useEffect, useState } from 'react';
import { loadGoogleMaps } from './googleMaps'; // Import the utility function

function MyComponent() {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Load Google Maps and wait for it to become ready
    loadGoogleMaps('AIzaSyCzc7wybEn0IuRjlV0dvC2U-jC9LpBCegM')
      .then(() => {
        // Google Maps is ready; you can now use it
        setMapLoaded(true); // Set a state variable to indicate it's ready
      })
      .catch((error) => {
        console.error('Error loading Google Maps:', error);
      });
  }, []); // Empty dependency array means this effect runs once on component mount

  if (!mapLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  // Now you can render components that depend on Google Maps
  return (
    <div>
      {/* Your Google Maps-dependent components */}
    </div>
  );
}

export default MyComponent;
