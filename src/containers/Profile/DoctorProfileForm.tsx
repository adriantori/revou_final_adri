// DoctorProfileForm.tsx
import React, { useState } from 'react';
import { TextField, Typography, Button } from '@mui/material';
import { Loading } from '../../components';
import { baseUrl } from '../../configs/Constants';
import { useNotification } from '../../contexts/NotificationContext';

interface DoctorData {
  DOK_ID: number;
  USER_ID: number;
  DOK_NAME: string;
  DOK_SPEC: string;
  DOK_EMAIL: string;
  DOK_TELP: string;
  DOK_BIO: string;
  DOK_NOSTR: string;
  DOK_LOCATION: string;
  DOK_EXP: string;
}

interface DoctorProfileFormProps {
  doctorData: DoctorData;
  onUpdateProfile: (updatedData: Partial<DoctorData>) => void;
}

const DoctorProfileForm: React.FC<DoctorProfileFormProps> = ({ doctorData, onUpdateProfile }) => {
  const [loading, setLoading] = useState(false);
  const showNotification = useNotification();
  const [formState, setFormState] = useState({
    name: doctorData.DOK_NAME || '',
    email: doctorData.DOK_EMAIL || '',
    phone: doctorData.DOK_TELP || '',
    bio: doctorData.DOK_BIO || '',
    location: doctorData.DOK_LOCATION || '',
    experience: doctorData.DOK_EXP || '',
  });

  const handleFieldChange = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updatedData: Partial<DoctorData> = {
        DOK_NAME: formState.name,
        DOK_EMAIL: formState.email,
        DOK_TELP: formState.phone,
        DOK_BIO: formState.bio,
        DOK_LOCATION: formState.location,
        DOK_EXP: formState.experience,
      };

      // Perform the PUT request to update the data on the backend
      const response = await fetch(`${baseUrl}/doctor/update/${doctorData.USER_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${localStorage.getItem('token')}`
          // Add any other headers as needed, including authentication headers
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        // If the update is successful, you might want to fetch the updated data again
        // This depends on your backend API behavior
        const updatedResponse = await fetch(`${baseUrl}/doctor/getById/${doctorData.USER_ID}`);
        const updatedData = await updatedResponse.json();

        // Pass the updated data to the parent component
        onUpdateProfile(updatedData.doctor);
      } else {
        // Handle error scenarios, show a notification, etc.
        console.error('Error updating data:', response.statusText);
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
      showNotification('success', 'Data tersimpan!', 'Data tersimpan!');
    }
  };

  if (loading) {
    // If loading is true, render the Loading component
    return <Loading />;
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {doctorData.DOK_NAME}'s Profile:
      </Typography>
      {Object.entries(formState).map(([field, value]) => (
        <TextField
          key={field}
          label={field.slice(0, 1).toUpperCase() + field.slice(1).toLowerCase()} // Convert DOK_NAME to Name
          fullWidth
          value={value}
          onChange={(e) => handleFieldChange(field as keyof typeof formState, e.target.value)}
          sx={{ marginTop: 2 }}
        />
      ))}
      <Button
        onClick={handleSave}
        sx={{
          marginTop: 2,
          backgroundColor: 'lightblue',
          color: 'black',
          '&:hover': {
            backgroundColor: 'blue',
            color: 'white'
          },
        }}
      >
        Save
      </Button>
    </>
  );
};

export default DoctorProfileForm;
