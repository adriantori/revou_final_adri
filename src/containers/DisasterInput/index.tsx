import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { ImageUploadComponent, MapComponent, Loading } from '../../components';
import { useNotification } from '../../contexts/NotificationContext';
import axios from 'axios';
import { baseUrlDis } from '../../configs/Constants';

interface Location {
  latitude: number;
  longitude: number;
  fullAddress: string;
  province: string;
}

interface FormData {
  disasterTitle: string;
  description: string;
  donationLink: string;
  location: Location | null;
  uploadedImageUrl: string | null;
}


interface DecodedToken {
  email: string;
  id: number;
  role: number;
  iat: number;
  exp: number;
  // Add other fields as needed
}

const DisasterInput = () => {
  const [loading, setLoading] = useState(false); // Initial loading state
  const [formData, setFormData] = useState<FormData>({
    disasterTitle: '',
    description: '',
    donationLink: '',
    location: null,
    uploadedImageUrl: null,
  });

  const navigate = useNavigate();
  const showNotification = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          showNotification('error', 'Login Dulu Yaaa!', 'Login Gagal');
          navigate('/login');
          return;
        }

        const decoded = jwt_decode<DecodedToken>(token);

        // Use a callback to handle the decoded token
        if (decoded.role === 2) {
          showNotification('error', 'Bikin Akun Pelapor Dulu Yaaa!', 'Login Gagal');
          navigate('/register');
        }
      } catch (error) {
        console.error('Error decoding token useEffect:', error);
        showNotification('error', 'Login Dulu Yaaa!', 'Login Gagal');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, showNotification]);

  const handleImageUrlChange = (imageUrl: string | null) => {
    setFormData((prevData) => ({
      ...prevData,
      uploadedImageUrl: imageUrl,
    }));
  };

  const handleLocationChange = (newLocation: Location | null) => {
    if (newLocation) {
      setFormData((prevData) => ({
        ...prevData,
        location: {
          latitude: newLocation.latitude,
          longitude: newLocation.longitude,
          fullAddress: newLocation.fullAddress,
          province: newLocation.province,
        },
      }));
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const decoded = jwt_decode<DecodedToken>(token!);

      // Prepare the request payload
      const requestData = {
        USER_ID: decoded.id, // You need to implement getUserIdFromToken function
        DIS_TITLE: formData.disasterTitle,
        DIS_DESCRIPTION: formData.description,
        DIS_DONATION: formData.donationLink,
        DIS_ADDRESS: formData.location ? formData.location.fullAddress : null,
        DIS_LATITUDE: formData.location ? formData.location.latitude : null,
        DIS_LONGITUDE: formData.location ? formData.location.longitude : null,
        DIS_PROVINCE: formData.location ? formData.location.province : null,
        DIS_IMAGE: formData.uploadedImageUrl,
        DIS_TIME: Date.now()
      };
  
      // Make the Axios POST request
      const response = await axios.post(`${baseUrlDis}/`, requestData,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      // Handle the response, show success message, etc.
      console.log('Server Response:', response.data);
      showNotification('success', 'Laporan berhasil disampaikan!', 'Terima kasih atas laporannya');
    } catch (error) {
      console.error('Error submitting form:', error);
      showNotification('error', 'Gagal mengirim laporan!', 'Terjadi kesalahan saat mengirim data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    // If loading is true, render the Loading component
    return <Loading />;
  } 

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {/* Image Upload */}
        <Typography variant="h6">Upload Gambar</Typography>
        <ImageUploadComponent onImageUrlChange={handleImageUrlChange} />

        {/* Disaster */}
        <Typography variant="h6">Judul Bencana</Typography>
        <TextField label="Bencana" fullWidth onChange={(e) => setFormData((prevData) => ({ ...prevData, disasterTitle: e.target.value }))} />

        {/* Description */}
        <Typography variant="h6">Deskripsi Bencana</Typography>
        <TextField label="Deskripsi" fullWidth onChange={(e) => setFormData((prevData) => ({ ...prevData, description: e.target.value }))} />

        {/* Donation */}
        <Typography variant="h6">Link Donasi (Ayobantu.com / Kitabisa.com)</Typography>
        <TextField label="Link Donasi (Jika Ada)" fullWidth onChange={(e) => setFormData((prevData) => ({ ...prevData, donationLink: e.target.value }))} />

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
