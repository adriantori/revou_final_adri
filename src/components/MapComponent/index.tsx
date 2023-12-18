import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Loading } from "../"
import { useNotification } from '../../contexts/NotificationContext';


interface Location {
  latitude: number;
  longitude: number;
  fullAddress: string;
  province: string;
}

interface MapComponentProps {
  onLocationChange: (location: Location) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onLocationChange }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false); // Initial loading state

  const showNotification = useNotification();

  const handleClick = async () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Fetch location information using Geoapify Geocoding API
          const geoapifyResponse = await fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=129f4bd37070475d9084f2d990f031a1&lang=id`
          );
          const geoapifyData = await geoapifyResponse.json();

          // Extract full address and province information
          const fullAddress = geoapifyData.features[0]?.properties?.formatted || 'Unknown Address';
          const province = geoapifyData.features[0]?.properties?.state || 'Unknown Province';

          const newLocation: Location = { latitude, longitude, fullAddress, province };
          setLocation(newLocation);

          // Callback to parent component with location details
          onLocationChange(newLocation);
          setLoading(false);
        },
        (error) => {
          showNotification('error', `Lokasi Error: ${error.message}`, 'Gagal mendapatkan lokasi');
        }
      );
    } else {
      showNotification('error', `Perangkat tidak didukung untuk pencarian lokasi`, 'Gagal mendapatkan lokasi');
    }
  };

  if (loading) {
    // If loading is true, render the Loading component
    return <Loading />;
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Deteksi Lokasi Saat Ini
      </Button>

      {location && (
        <div>
          <p>Full Address: {location.fullAddress}</p>
          <p>Province: {location.province}</p>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>

          <Box style={{ height: '300px', width: '300px', position: 'relative', overflow: 'hidden' }}>
            <img
              src={`https://maps.geoapify.com/v1/staticmap?style=carto&width=400&height=400&center=lonlat:${location.longitude},${location.latitude}&zoom=13&apiKey=129f4bd37070475d9084f2d990f031a1&marker=lonlat:${location.longitude},${location.latitude};type:awesome;color:red`}
              alt="Map"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
