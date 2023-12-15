import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

import { ImageUploadComponent, MapComponent, TokenDecoder } from '../../components';
import { useNotification } from '../../contexts/NotificationContext';


interface Location {
    latitude: number;
    longitude: number;
    fullAddress: string;
    province: string;
  }

const DisasterInput = () => {
    const [disasterTitle, setDisasterTitle] = useState('');
    const [description, setDescription] = useState('');
    const [donationLink, setDonationLink] = useState('');
    const [location, setLocation] = useState<{ latitude: number; longitude: number; fullAddress: string; province: string } | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const navigate = useNavigate();
    const showNotification = useNotification();

    useEffect(() => {
      const token = localStorage.getItem('token');
  
      const fetchData = async () => {
        try {
          if (token) {
            const decoded = await TokenDecoder(token);
  
            // The decodedToken will contain the decoded information
            if (decoded?.role === 2) {
              showNotification('error', 'Bikin Akun Pelapor Dulu Yaaa!', 'Login Gagal');
              navigate('/register');
            }
          } else {
            showNotification('error', 'Login Dulu Yaaa!', 'Login Gagal');
            navigate('/login');
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          showNotification('error', 'Login Dulu Yaaa!', 'Login Gagal');
          navigate('/login');
        }
      };
  
      fetchData();
    }, [navigate, showNotification]);
    
  
    const handleImageUrlChange = (imageUrl: string | null) => {
        setUploadedImageUrl(imageUrl);
    };

    const handleLocationChange = (newLocation: Location) => {
        setLocation(newLocation);
      };

    const handleSubmit = () => {
      console.log('Form Data:', {
        disasterTitle,
        description,
        donationLink,
        location,
        uploadedImageUrl,
      });
      // You can add logic here to send the data to your backend or perform further actions
    };
  
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          {/* Image Upload */}
          <Typography variant="h6">Upload Gambar</Typography>
          <ImageUploadComponent onImageUrlChange={handleImageUrlChange} />
  
          {/* Disaster */}
          <Typography variant="h6">Judul Bencana</Typography>
          <TextField label="Bencana" fullWidth onChange={(e) => setDisasterTitle(e.target.value)} />
  
          {/* Description */}
          <Typography variant="h6">Deskripsi Bencana</Typography>
          <TextField label="Deskripsi" fullWidth onChange={(e) => setDescription(e.target.value)} />
  
          {/* Donation */}
          <Typography variant="h6">Link Donasi (Ayobantu.com / Kitabisa.com)</Typography>
          <TextField label="Link Donasi (Jika Ada)" fullWidth onChange={(e) => setDonationLink(e.target.value)} />
  
          {/* Location Detection */}
          <Typography variant="h6">Deteksi Lokasi (izinkan lokasi)</Typography>
          <MapComponent onLocationChange={handleLocationChange} />
  
          {/* Submit Button */}
          <Button variant="contained" color="error" onClick={handleSubmit}>
            LAPORKAN
          </Button>
        </CardContent>
      </Card>
    );
  };
  
  export default DisasterInput;
