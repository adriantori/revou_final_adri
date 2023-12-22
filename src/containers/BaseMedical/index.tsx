import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Grid, useMediaQuery, Box, Button, Card, CardContent, List, ListItem, ListItemText, Chip, Link } from '@mui/material';


const BaseMedical = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const chipStyle = {
    backgroundColor: 'white',
    color: '#2E7D32',
    border: '1px solid #2E7D32',
  };

  return (
    <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Grid container>
        {/* Left side (Title and Text) */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
          <Typography variant="h3" sx={{ color: 'green' }}>Apa It Medis?</Typography>
          <Typography variant={isSmallScreen ? 'body1' : 'h5'}>
            Medis melibatkan ilmu pengobatan dan perawatan kesehatan, sementara pertolongan pertama adalah serangkaian tindakan darurat untuk menyelamatkan nyawa atau mencegah kondisi memburuk sebelum bantuan medis lebih lanjut. Pertolongan pertama melibatkan keterampilan sederhana seperti pemulihan nafas dan penanganan luka. Kemampuan memberikan pertolongan pertama penting dalam respons cepat terhadap keadaan darurat, memberikan bantuan kritis sebelum bantuan medis profesional tersedia.
          </Typography>
        </Grid>

        {/* Right side (Image) */}
        <Grid item xs={12} md={6}>
          <Grid container justifyContent="center" alignItems="center" sx={{ p: 2 }}>
            <img
              src="MedisTitle.png"
              alt="gambar-medis"
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
          <Typography variant="body1" style={{ color: "#2E7D32" }}>SEGERA LAPORKAN BILA MEMBUTUHKAN BANTUAN MEDIS: Hubungi 118 / 119</Typography>
          <Typography variant="body2" style={{ color: "#2E7D32" }}>Lakukanlah pelaporan bila terjadi hal yang membutuhkan tindakan medis. Petugas akan datang secepatnya.</Typography>
        </Box>
        {!isSmallScreen && (
          <Link href="/dokter">
            <Button variant="contained" style={{ backgroundColor: "#2E7D32" }}>
              Cek Dokter
            </Button>
          </Link>
        )}
        {/* Render the button underneath texts for mobile */}
        {isSmallScreen && (
          <Link href="/dokter">
          <Button variant="contained" style={{ backgroundColor: "#2E7D32" }}>
            Cek Dokter
          </Button>
        </Link>
        )}
      </Box>

      {/* New section with 1:1 split - Card and List of Chips */}
      <Grid container mt={2} spacing={2}>
        {/* Left side - Card */}
        <Grid item xs={12} md={6}>
          <Card>
            {/* Change Card Title into Image */}
            <img
              src="MedisCard.png"  // Replace with your image URL
              alt="card-image"
              style={{ width: '100%', height: 'auto' }}
            />
            <CardContent>
              {/* Add content for the card */}
              <Typography variant="body1">Simulasi Pertolongan Pertama</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Right side - List of Chips */}
        <Grid item xs={12} md={6}>
          <List>
            <Typography variant="h4">Pertolongan Pertama</Typography>
            <ListItem>
              <ListItemText>
                <Chip label="Panggil bantuan medis" style={chipStyle} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Chip label="Evaluasi keadaan korban" style={chipStyle} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Chip label="Berikan CPR jika diperlukan" style={chipStyle} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Chip label="Hentikan pendarahan" style={chipStyle} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Chip label="Berikan pertolongan sesuai kondisi" style={chipStyle} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Chip label="Hubungi dokter yang tersedia" style={chipStyle} />
              </ListItemText>
            </ListItem>
            {/* Add more ListItem components for additional chips */}
          </List>
        </Grid>
      </Grid>



    </Paper>
  );
};

export default BaseMedical;
