import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Grid, useMediaQuery, Box, Button, Card, CardContent, List, ListItem, ListItemText, Chip } from '@mui/material';


const BaseMedical = () => {
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
          <Typography variant="h3" sx={{ color: 'purple' }}>What Is Poliklinik?</Typography>
          <Typography variant={isSmallScreen ? 'body1' : 'h5'}>
            The disaster hotline is a special phone service used during emergencies like floods, storms, or other large-scale disasters. It's a number you can call to get help, information, or report dangerous situations during these tough times. Trained experts are ready on the other end of the line to listen to your concerns and guide you on what to do to stay safe. Whether it's for getting help or sharing important details about the disaster, the hotline is there to assist people affected by these tough situations.
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
          <Typography variant="body1" style={{ color: "#6D107D" }}>SEGERA LAPORKAN BILA TERJADI BENCANA</Typography>
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
                <Chip label="Category 1" style={chipStyle} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Chip label="Category 2" style={chipStyle} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Chip label="Category 3"  style={chipStyle} />
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
