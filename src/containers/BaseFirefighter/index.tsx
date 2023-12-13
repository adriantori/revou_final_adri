import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Grid, useMediaQuery, Box, Button, Card, CardContent, List, ListItem, ListItemText, Chip } from '@mui/material';


const BaseFirefighter = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const chipStyle = {
    backgroundColor: 'white',
    color: '#9C27B0',
    border: '1px solid #9C27B0',
  };

  return (
    <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Grid container>
        {/* Left side (Title and Text) */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
          <Typography variant="h3" sx={{ color: 'purple' }}>Apa Itu DAMKAR?</Typography>
          <Typography variant={isSmallScreen ? 'body1' : 'h5'}>
            DAMKAR, atau Pemadam Kebakaran, adalah lembaga kritis dalam menjaga keselamatan masyarakat dari ancaman kebakaran dan bencana terkait. Dengan fokus pada respons cepat dan pencegahan, DAMKAR memiliki peran utama dalam melindungi nyawa dan harta benda.          
          </Typography>
        </Grid>

        {/* Right side (Image) */}
        <Grid item xs={12} md={6}>
          <Grid container justifyContent="center" alignItems="center" sx={{ p: 2 }}>
            <img
              src="BencanaTitle.png"
              alt="gambar-bencana"
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
          <Typography variant="body1" style={{ color: "#6D107D" }}>SEGERA LAPORKAN BILA TERJADI BENCANA: Hubungi 113</Typography>
          <Typography variant="body2" style={{ color: "#6D107D" }}>Lakukanlah pelaporan bila terjadi kebakaran sesuai dengan prosedurnya, dan petugas akan datang secepatnya.</Typography>
        </Box>
        {!isSmallScreen && (
          <Button variant="contained" style={{ backgroundColor: "#9C27B0" }}>
            Laporkan
          </Button>
        )}
        {/* Render the button underneath texts for mobile */}
        {isSmallScreen && (
          <Button variant="contained" style={{ backgroundColor: "#9C27B0" }}>
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
              src="BencanaCard.png"  // Replace with your image URL
              alt="card-image"
              style={{ width: '100%', height: 'auto' }}
            />
            <CardContent>
              {/* Add content for the card */}
              <Typography variant="body1">Card Content</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Right side - List of Chips */}
        <Grid item xs={12} md={6}>
          <List>
            <Typography variant="h4">Langkah Pelaporan</Typography>
            <ListItem>
              <ListItemText>
                <Chip label="Hubungi Hotline DAMKAR yang tersedia." style={chipStyle} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Chip label="Sampaikan informasi lengkap tentang kejadian, termasuk lokasi dan jenis insiden." style={chipStyle} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Chip label="Koordinasikan dengan otoritas setempat untuk respons yang lebih cepat dan efektif."  style={chipStyle} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Chip label="Ikuti petunjuk DAMKAR untuk tindakan awal sebelum bantuan tiba."  style={chipStyle} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Chip label="Pastikan pelaporan dilakukan dengan cepat dan akurat."  style={chipStyle} />
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
