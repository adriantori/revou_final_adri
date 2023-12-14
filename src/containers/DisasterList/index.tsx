import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

interface Disaster {
    BEN_ID: string;
    BEN_DISASTER: string;
    BEN_LOCATION: string;
    BEN_TIME: string; // Assuming BEN_TIME is a string in ISO format, adjust as needed
    BEN_DESCRIPTION: string;
    BEN_IMAGE: string;
    BEN_DONATION: string;
}

// Example array of disasters
const disasters: Disaster[] = [
    {
        BEN_ID: '1',
        BEN_DISASTER: 'Disaster 1',
        BEN_LOCATION: 'Location 1',
        BEN_TIME: '2023-01-01T12:00:00', // Replace with the actual date and time
        BEN_DESCRIPTION: 'Description 1',
        BEN_IMAGE: 'https://i.ibb.co/4Z24wRQ/KAITO-01-st-ayaka-one.png',
        BEN_DONATION: 'Donation Information 1',
    },
    {
        BEN_ID: '2',
        BEN_DISASTER: 'Disaster 2',
        BEN_LOCATION: 'Location 2',
        BEN_TIME: '2023-02-01T14:30:00', // Replace with the actual date and time
        BEN_DESCRIPTION: 'Description 2',
        BEN_IMAGE: 'https://i.ibb.co/RhkMYH4/Diagram-fitur-v2-1-2-drawio.png',
        BEN_DONATION: 'Donation Information 2',
    },
    // Add more disasters as needed
];

function DisasterList() {
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
        </Grid >
    );
}

export default DisasterList;
