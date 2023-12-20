import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import { baseUrlDis } from '../../configs/Constants';
import { Box, Modal } from '@mui/material';

interface Disaster {
    DIS_ID: string;
    DIS_TITLE: string;
    DIS_ADDRESS: string;
    DIS_TIME: string; // Assuming DIS_TIME is a string in ISO format, adjust as needed
    DIS_DESCRIPTION: string;
    DIS_IMAGE: string;
    DIS_DONATION: string;
    DIS_LONGITUDE: number;
    DIS_LATITUDE: number;
}
interface ModalContentProps {
    disaster: Disaster;
}

const formatDateTime = (dateTimeString: string) => {
    const reportDateTime = new Date(dateTimeString);

    return format(reportDateTime, 'dd-MM-yy : HH/mm');
};

function DisasterList() {
    const [disasters, setDisasters] = useState<Disaster[]>([]);
    const [selectedDisaster, setSelectedDisaster] = useState<Disaster | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrlDis}/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setDisasters(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    const handleOpenModal = (disaster: Disaster) => {
        setSelectedDisaster(disaster);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedDisaster(null);
        setIsModalOpen(false);
    };

    const ModalContent: React.FC<ModalContentProps> = ({ disaster }) => (
        <div>
            <img
                src={disaster.DIS_IMAGE}
                alt="Disaster Image"
                style={{
                    maxWidth: '300px',
                    maxHeight: '300px',
                    width: '100%', // Ensure the image takes up the available width
                    height: 'auto', // Maintain the aspect ratio
                    objectFit: 'cover', // Cover the container while maintaining the aspect ratio
                }}
            />
            <Typography variant="h5" component="div">
                Nama Bencana: {disaster.DIS_TITLE}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
                Deskripsi: {disaster.DIS_DESCRIPTION}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
                Waktu Pelaporan: {disaster.DIS_TIME}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
                Link Donasi: {disaster.DIS_DONATION}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
                Alamat: {disaster.DIS_ADDRESS}
            </Typography>
            <img
                src={`https://maps.geoapify.com/v1/staticmap?style=carto&width=400&height=400&center=lonlat:${disaster.DIS_LONGITUDE},${disaster.DIS_LATITUDE}&zoom=13&apiKey=129f4bd37070475d9084f2d990f031a1&marker=lonlat:${disaster.DIS_LONGITUDE},${disaster.DIS_LATITUDE};type:awesome;color:red`}
                alt="Map"
                style={{
                    maxWidth: '300px',
                    maxHeight: '300px',
                    width: '100%', // Ensure the image takes up the available width
                    height: 'auto', // Maintain the aspect ratio
                    objectFit: 'cover', // Cover the container while maintaining the aspect ratio
                }}
            />
        </div>
    );

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Link to="/laporan">
                    <Button variant="contained" color="error" style={{ marginBottom: '16px', width: '100%', height: '10vh' }}>
                        LAPORKAN
                    </Button>
                </Link>
            </Grid>
            {disasters.map((disaster) => (
                <Grid item xs={12} md={6} key={disaster.DIS_ID}>
                    <Paper elevation={5}>
                        <Card sx={{ maxWidth: '100%' }}>
                            <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                                <img
                                    src={disaster.DIS_IMAGE}
                                    alt="Disaster Image"
                                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                />
                            </div>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {disaster.DIS_TITLE}
                                </Typography>
                                <Typography color="text.secondary" gutterBottom>
                                    Lokasi: {disaster.DIS_ADDRESS}
                                </Typography>
                                <Typography color="text.secondary" gutterBottom>
                                    Jam: {formatDateTime(disaster.DIS_TIME)}
                                </Typography>
                                <Button
                                    onClick={() => handleOpenModal(disaster)}

                                    sx={{

                                        background: 'blue',
                                        color: 'white',
                                        ':hover': {
                                            bgcolor: 'red',
                                            color: 'white',
                                        },
                                    }}
                                >
                                    <Typography>View Details</Typography>
                                </Button>
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
            ))}
            {/* Modal for displaying doctor information */}
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Paper
                    elevation={5}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        maxHeight: '80vh', // Set the maximum height to 80% of the viewport height
                        overflowY: 'auto', // Enable vertical scrolling when content exceeds the maxHeight
                    }}
                >
                    {selectedDisaster && (
                        <Box sx={{ p: 5 }}>
                            <ModalContent disaster={selectedDisaster} />
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

export default DisasterList;
