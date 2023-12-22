// InformerProfileForm.tsx
import React, { useState } from 'react';
import { TextField, Typography, Button } from '@mui/material';
import { Loading } from '../../components';
import { baseUrl } from '../../configs/Constants';
import { useNotification } from '../../contexts/NotificationContext';

interface InformerData {
  INF_ID: number;
  USER_ID: number;
  INF_NAME: string;
  INF_NIK: string;
  INF_TELP: string;
}

interface InformerProfileFormProps {
  informerData: InformerData;
  onUpdateProfile: (updatedData: Partial<InformerData>) => void;
}

const InformerProfileForm: React.FC<InformerProfileFormProps> = ({ informerData, onUpdateProfile }) => {
  const [loading, setLoading] = useState(false);
  const showNotification = useNotification();
  const [formState, setFormState] = useState({
    name: informerData.INF_NAME || '',
    nik: informerData.INF_NIK || '',
    phone: informerData.INF_TELP || '',
  });

  const handleFieldChange = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updatedData: Partial<InformerData> = {
        INF_NAME: formState.name,
        INF_NIK: formState.nik,
        INF_TELP: formState.phone,
      };

      console.log(updatedData)
      // Perform the PUT request to update the data on the backend
      const response = await fetch(`${baseUrl}/informer/update/${informerData.INF_ID}`, {
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
        const updatedResponse = await fetch(`${baseUrl}/informer/getById/${informerData.USER_ID}`, {});
        const updatedData = await updatedResponse.json();
        console.log(updatedData)

        // Pass the updated data to the parent component
        onUpdateProfile(updatedData.informer);
        showNotification('success', 'Data tersimpan!', 'Data tersimpan!');

      } else {
        // Handle error scenarios, show a notification, etc.
        console.error('Error updating data:', response.text);
        showNotification('error', 'Data Gagal Disimpan!', 'Data Gagal Disimpan!');

      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    // If loading is true, render the Loading component
    return <Loading />;
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {informerData.INF_NAME}'s Profile:
      </Typography>
      {Object.entries(formState).map(([field, value]) => (
        <TextField
          key={field}
          label={field.slice(0, 1).toUpperCase() + field.slice(1).toLowerCase()} // Convert INF_NAME to Name
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
          backgroundColor: 'lightgreen',
          color: 'black',
          '&:hover': {
            backgroundColor: 'green',
            color: 'white'
          },
        }}
      >
        Save
      </Button>
    </>
  );
};

export default InformerProfileForm;
