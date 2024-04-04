

export const loadGoogleMaps = (apiKey) => {
    return new Promise((resolve) => {
      // Check if the Google Maps library is already loaded
      if (window.google && window.google.maps) {
        resolve(window.google.maps);
      } else {
        // Create a script element for the Google Maps API
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
  
        // Set a callback function to execute when the script loads
        script.onload = () => {
          resolve(window.google.maps);
        };
  
        // Append the script to the document
        document.head.appendChild(script);
      }
    });
  };
  