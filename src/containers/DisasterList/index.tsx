import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

import { baseUrlDis } from '../../configs/Constants';

interface Disaster {
    BEN_ID: string;
    BEN_DISASTER: string;
    BEN_LOCATION: string;
    BEN_TIME: string; // Assuming BEN_TIME is a string in ISO format, adjust as needed
    BEN_DESCRIPTION: string;
    BEN_IMAGE: string;
    BEN_DONATION: string;
}

function DisasterList() {
    const [disasters, setDisasters] = useState<Disaster[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrlDis}/`); // Update the endpoint accordingly
                setDisasters(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    const formatDateTime = (dateTimeString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
        };
        return new Intl.DateTimeFormat('id-US', options).format(new Date(dateTimeString));
    };

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
                <Grid item xs={12} md={6} key={disaster.BEN_ID}>
                    <Paper elevation={5}>
                        <Card sx={{ maxWidth: '100%' }}>
                            <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                                <img
                                    src={disaster.BEN_IMAGE}
                                    alt="Disaster Image"
                                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                />
                            </div>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {disaster.BEN_DISASTER}
                                </Typography>
                                <Typography color="text.secondary" gutterBottom>
                                    Lokasi: {disaster.BEN_LOCATION}
                                </Typography>
                                <Typography color="text.secondary" gutterBottom>
                                    Jam: {formatDateTime(disaster.BEN_TIME)}
                                </Typography>
                                <Link
                                    to={`/laporkan/${disaster.BEN_ID}`}
                                >
                                    <Button
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
                                </Link>
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}

export default DisasterList;
