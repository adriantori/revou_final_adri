import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

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
}


interface ModalContentProps {
  doctor: Doctor;
}

// Example array of doctors
const doctors: Doctor[] = [
  {
    DOK_ID: 1,
    DOK_NAME: 'Dr. John Doe',
    DOK_SPEC: '-',
    DOK_EMAIL: 'john.doe@example.com',
    DOK_TELP: '123-456-7890',
    DOK_BIO: '-',
    DOK_NOSTR: '007',
    DOK_LOCATION: 'City, Country',
    DOK_EXP: '10 years',
  },
  {
    DOK_ID: 2,
    DOK_NAME: 'Dr. John Doe2',
    DOK_SPEC: '-2',
    DOK_EMAIL: 'john.doe@example.com',
    DOK_TELP: '123-456-7890',
    DOK_BIO: '-',
    DOK_NOSTR: '007',
    DOK_LOCATION: 'City, Country',
    DOK_EXP: '10 years',
  },
  // Add more doctors as needed
];

function DoctorList() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <Card sx={{ minWidth: 275 }}>
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
