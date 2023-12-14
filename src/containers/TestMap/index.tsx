import { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface Location {
  latitude: number;
  longitude: number;
  fullAddress: string;
  province: string;
}

function TestMap() {
  const [location, setLocation] = useState<Location | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Fetch location information using Geoapify Geocoding API
          const geoapifyResponse = await fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=129f4bd37070475d9084f2d990f031a1&lang=id`
          );
          const geoapifyData = await geoapifyResponse.json();

          console.log('Geoapify API Response:', geoapifyData);

          // Extract full address and province information
          const fullAddress = geoapifyData.features[0]?.properties?.formatted || 'Unknown Address';
          const province = geoapifyData.features[0]?.properties?.state || 'Unknown Province';

          setLocation({ latitude, longitude, fullAddress, province });
          console.log('Current Location:', { latitude, longitude, fullAddress, province });

          // Additional code to clear the file input value
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleImageUpload = async (image: string | Blob | null) => {
    if (!image) {
      console.error('No image selected for upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('https://api.imgbb.com/1/upload?key=ca9a8952b2316d8ae0114df21f591cf2', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Image uploaded successfully:', data);
        setUploadedImageUrl(data.data.url); // ImgBB response has a "url" property
      } else {
        console.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Location App</h1>
        <div>
          {/* File input and upload button */}
          <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files && e.target.files[0])}
              style={{ display: 'none' }}
            />
            <Button variant="contained" color="primary" onClick={() => fileInputRef.current?.click()}>
              Upload Image
            </Button>
            {uploadedImageUrl && (
                <img
                  src={uploadedImageUrl}
                  alt="Uploaded Map"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
        </div>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Get Current Location
        </Button>

        {location && (
          <div>
            <p>Full Address: {location.fullAddress}</p>
            <p>Province: {location.province}</p>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>

            <Box style={{ position: 'relative', overflow: 'hidden', width: '300px', height: '300px' }}>
              

              {/* Marker */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '20px',
                  height: '20px',
                  background: 'red',
                  borderRadius: '50%',
                  border: '2px solid white',
                }}
              ></div>
            </Box>

            
          </div>
        )}
      </header>
    </div>
  );
}

export default TestMap;
