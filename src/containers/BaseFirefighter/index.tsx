import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Grid, useMediaQuery, Box, Button, Card, CardContent, List, ListItem, ListItemText, Chip } from '@mui/material';


const BaseFirefighter = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const chipStyle = {
    backgroundColor: 'white',
    color: '#D32F2F',
    border: '1px solid #D32F2F',
  };

  return (
    <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Grid container>
        {/* Left side (Title and Text) */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
          <Typography variant="h3" sx={{ color: 'red' }}>Apa Itu DAMKAR?</Typography>
          <Typography variant={isSmallScreen ? 'body1' : 'h5'}>
            DAMKAR, atau Pemadam Kebakaran, adalah lembaga kritis dalam menjaga keselamatan masyarakat dari ancaman kebakaran dan bencana terkait. Dengan fokus pada respons cepat dan pencegahan, DAMKAR memiliki peran utama dalam melindungi nyawa dan harta benda.          
          </Typography>
        </Grid>

        {/* Right side (Image) */}
        <Grid item xs={12} md={6}>
          <Grid container justifyContent="center" alignItems="center" sx={{ p: 2 }}>
            <img
              src="DamkarTitle.png"
              alt="gambar-damkar"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* New section with purple background */}
      <Box
        sx={{
          backgroundColor: '#FBE5FF',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: isSmallScreen ? 'flex-start' : 'center', // Adjust alignment for mobile
          color: 'white',
          p: 2,
          mt: 2,
          flexDirection: isSmallScreen ? 'column' : 'row',  // Change to column for mobile
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isSmallScreen ? 'flex-start' : 'flex-start', marginRight: isSmallScreen ? 0 : 'auto', mb: isSmallScreen ? 1 : 0 }}>
          <Typography variant="body1" style={{ color: "#5f2120" }}>SEGERA LAPORKAN BILA TERJADI BENCANA: Hubungi 113</Typography>
          <Typography variant="body2" style={{ color: "#5f2120" }}>Lakukanlah pelaporan bila terjadi kebakaran sesuai dengan prosedurnya, dan petugas akan datang secepatnya.</Typography>
        </Box>
        {!isSmallScreen && (
          <Button variant="contained" style={{ backgroundColor: "#D32F2F" }}>
            Laporkan
          </Button>
        )}
        {/* Render the button underneath texts for mobile */}
        {isSmallScreen && (
          <Button variant="contained" style={{ backgroundColor: "#D32F2F" }}>
            Laporkan
          </Button>
        )}
      </Box>

      {/* New section with 1:1 split - Card and List of Chips */}
      <Grid container mt={2} spacing={2}>
        {/* Left side - Card */}
        <Grid item xs={12} md={6}>
          <Card>
            {/* Change Card Title into Image */}
            <img
              src="DamkarCard.png"  // Replace with your image URL
              alt="card-image"
              style={{ width: '100%', height: 'auto' }}
            />
            <CardContent>
              {/* Add content for the card */}
              <Typography variant="body1">Pemadaman Api</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Right side - List of Chips */}
        <Grid item xs={12} md={6}>
          <List>
            <Typography variant="h4">Langkah Pelaporan</Typography>
            <ListItem>
              <ListItemText>
                <Chip label="Panggil bantuan pemadam kebakaran" style={chipStyle} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Chip label="Hindari api dan asap" style={chipStyle} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Chip label="Gunakan alat pemadam api"  style={chipStyle} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Chip label="Identifikasi rute evakuasi"  style={chipStyle} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Chip label="Ikuti instruksi petugas"  style={chipStyle} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Chip label="Laporkan menggunakan aplikasi"  style={chipStyle} />
              </ListItemText>
            </ListItem>
            {/* Add more ListItem components for additional chips */}
          </List>
        </Grid>
      </Grid>



    </Paper>
  );
};

export default BaseFirefighter;
