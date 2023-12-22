import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Grid, useMediaQuery, Box, Button, Card, CardContent, List, ListItem, ListItemText, Chip, Link } from '@mui/material';


const BasePolice = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const chipStyle = {
    backgroundColor: 'white',
    color: '#014361',
    border: '1px solid #014361',
  };

  return (
    <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Grid container>
        {/* Left side (Title and Text) */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
          <Typography variant="h3" sx={{ color: 'blue' }}>Apa Itu Kepolisian?</Typography>
          <Typography variant={isSmallScreen ? 'body1' : 'h5'}>
            Meskipun peran utama kepolisian adalah menjaga keamanan, ada hubungan penting dengan kesehatan manusia. Upaya pencegahan kejahatan dan pemeliharaan ketertiban oleh kepolisian dapat menciptakan lingkungan yang aman, mendukung kesejahteraan mental, dan mengurangi faktor stres yang berdampak negatif pada kesehatan masyarakat secara keseluruhan. Keberadaan polisi juga dapat memfasilitasi respons cepat terhadap keadaan darurat kesehatan dan membantu penanganan situasi krisis yang dapat memengaruhi kesehatan individu dan komunitas.
          </Typography>
        </Grid>

        {/* Right side (Image) */}
        <Grid item xs={12} md={6}>
          <Grid container justifyContent="center" alignItems="center" sx={{ p: 2 }}>
            <img
              src="PolisiTitle.png"
              alt="gambar-polisi"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* New section with purple background */}
      <Box
        sx={{
          backgroundColor: '#E5F6FD',
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
          <Typography variant="body1" style={{ color: "#014361" }}>SEGERA LAPORKAN BILA TERJADI BENCANA</Typography>
          <Typography variant="body2" style={{ color: "#014361" }}>Lakukanlah pelaporan bila terjadi kebakaran sesuai dengan prosedurnya, dan petugas akan datang secepatnya.</Typography>
        </Box>
        {!isSmallScreen && (
          <Link href="/laporkan">
            <Button variant="contained" style={{ backgroundColor: "#2196F3" }}>
              Laporkan
            </Button>
          </Link>
        )}
        {/* Render the button underneath texts for mobile */}
        {isSmallScreen && (
          <Link href="/laporkan">
            <Button variant="contained" style={{ backgroundColor: "#2196F3" }}>
              Laporkan
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
              src="PolisiCard.png"  // Replace with your image URL
              alt="card-image"
              style={{ width: '100%', height: 'auto' }}
            />
            <CardContent>
              {/* Add content for the card */}
              <Typography variant="body1">Polisi Membantu Kecelakaan</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Right side - List of Chips */}
        <Grid item xs={12} md={6}>
          <List>
            <Typography variant="h4">Langkah Pelaporan</Typography>
            <ListItem>
              <ListItemText>
                <Chip label="Panggil bantuan polisi" style={chipStyle} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Chip label="Jelaskan kejadian secara singkat" style={chipStyle} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Chip label="Berikan detail lokasi dan waktu" style={chipStyle} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Chip label="Identifikasi diri dan saksi" style={chipStyle} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Chip label="Kooperatif saat diwawancara" style={chipStyle} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Chip label="Laporkan melalui aplikasi" style={chipStyle} />
              </ListItemText>
            </ListItem>
            {/* Add more ListItem components for additional chips */}
          </List>
        </Grid>
      </Grid>



    </Paper>
  );
};

export default BasePolice;
