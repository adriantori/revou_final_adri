import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface GeoapifyComponent {
  name: string;
  // Add other properties if needed based on the API response
}

interface Location {
  latitude: number;
  longitude: number;
  fullAddress: string;
  province: string;
}

const LocationButton: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);

  const handleClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Fetch location information using Geoapify Geocoding API
          const geoapifyResponse = await fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=129f4bd37070475d9084f2d990f031a1`
          );
          const geoapifyData = await geoapifyResponse.json();

          // Extract full address and province information
          const addressComponents: GeoapifyComponent[] = geoapifyData.features[0]?.properties?.address?.components || [];
          const fullAddress = addressComponents.map((component) => component.name).join(', ');
          const province = geoapifyData.features[0]?.properties?.state || 'Unknown Province';

          setLocation({ latitude, longitude, fullAddress, province });
          console.log('Current Location:', { latitude, longitude, fullAddress, province });
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Get Current Location
      </Button>

      {location && (
        <div>
          <p>Full Address: {location.fullAddress}</p>
          <p>Province: {location.province}</p>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>

          <Box style={{ height: '400px', width: '400px', position: 'relative', overflow: 'hidden' }}>
            <img
              src={`https://maps.geoapify.com/v1/staticmap?style=carto&width=400&height=400&center=lonlat:${location.longitude},${location.latitude}&zoom=13&apiKey=129f4bd37070475d9084f2d990f031a1`}
              alt="Map"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Location App</h1>
        <LocationButton />
      </header>
    </div>
  );
}

export default App;
