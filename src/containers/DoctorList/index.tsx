import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { baseUrl } from '../../configs/Constants';

interface Doctor {
  DOK_ID: number;
  DOK_NAME: string;
  DOK_SPEC: string;
  DOK_EMAIL: string;
  DOK_TELP: string;
  DOK_BIO: string;
  DOK_NOSTR: string;
  DOK_LOCATION: string;
  DOK_EXP: string;
  DOK_IMAGE: string;
}

interface ModalContentProps {
  doctor: Doctor;
}

function DoctorList() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/doctor/getAll`); // Update the endpoint accordingly
        setDoctors(response.data.doctors);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleOpenModal = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedDoctor(null);
    setIsModalOpen(false);
  };

  const ModalContent: React.FC<ModalContentProps> = ({ doctor }) => (
    <div>
      <Typography variant="h5" component="div">
        {doctor.DOK_NAME}
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Spesialisasi: {doctor.DOK_SPEC}
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Email: {doctor.DOK_EMAIL}
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Telepon: {doctor.DOK_TELP}
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Biodata: {doctor.DOK_BIO}
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Nomor Lisensi: {doctor.DOK_NOSTR}
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Lokasi: {doctor.DOK_LOCATION}
      </Typography>
      <Typography color="text.secondary">
        Pengalaman: {doctor.DOK_EXP}
      </Typography>
    </div>
  );

  return (
    <Grid container spacing={2}>
      {doctors.map((doctor) => (
        <Grid item xs={12} md={6} key={doctor.DOK_ID}>
          <Paper elevation={5}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {doctor.DOK_NAME}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  Email: {doctor.DOK_EMAIL}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  Telepon: {doctor.DOK_TELP}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  Lokasi: {doctor.DOK_LOCATION}
                </Typography>
                <Button
                  onClick={() => handleOpenModal(doctor)}
                  sx={{
                    background: 'blue',
                    color: 'white',
                    ':hover': {
                      bgcolor: 'green',
                      color: 'white',
                    },
                  }}
                >
                  <Typography>Cek Detail</Typography>
                </Button>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      ))}
      {/* Modal for displaying doctor information */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Paper elevation={5} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400 }}>
          {selectedDoctor && (
            <Box sx={{ p: 5 }}>
              <ModalContent doctor={selectedDoctor} />
              <Button onClick={handleCloseModal} style={{ marginTop: '16px' }}>
                Tutup
              </Button>
            </Box>
          )}
        </Paper>
      </Modal>
    </Grid>
  );
}

export default DoctorList;
