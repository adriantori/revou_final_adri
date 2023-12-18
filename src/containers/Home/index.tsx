import React, { createRef, useState, useEffect } from 'react';
import { Grid, Paper, Typography, useMediaQuery, Box, IconButton, Card, CardContent, Button } from '@mui/material';
import { CustomDivider } from '../../components';
import Slider from 'react-slick';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const Home: React.FC = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const sliderRef = createRef<Slider>();
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i: number) => (
      <Box
        key={i}
        style={{
          width: '20px',  // Set the width of the dots
          height: '20px', // Set the height of the dots
          background: i === currentSlide ? 'black' : 'rgba(0,0,0,0.6)', // Customize the active and inactive dot color
          borderRadius: '50%',
        }}
      />
    ),
    beforeChange: (oldIndex: number, newIndex: number) => {
      setCurrentSlide(newIndex);
    },
  };


  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setCurrentSlide((slider.innerSlider as any).state.currentSlide);
    }
  }, [sliderRef]);

  return (
    <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      {/* Image Carousel */}
      <Box sx={{ position: 'relative' }}>
        <Slider {...sliderSettings} ref={sliderRef}>
          <div>
            <img src="https://placehold.co/600x400/EEE/31343C" alt="Image 1" style={{ width: '100%', height: 'auto' }} />
          </div>
          <div>
            <img src="https://placehold.co/600x400/EEE/31343C" alt="Image 2" style={{ width: '100%', height: 'auto' }} />
          </div>
          <div>
            <img src="https://placehold.co/600x400/EEE/31343C" alt="Image 3" style={{ width: '100%', height: 'auto' }} />
          </div>
          {/* Add more slides as needed */}
        </Slider>
        <IconButton
          onClick={() => sliderRef?.current?.slickPrev()}  // Adjust the ref based on your actual implementation
          style={{
            width: isSmallScreen ? 32 : 64,
            height: isSmallScreen ? 32 : 64,
            position: 'absolute',
            top: '50%',
            left: isSmallScreen ? 16 : 64,
            transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            padding: '10px',
            borderRadius: '50%',
            pointerEvents: 'auto', // Allow click events
          }}
        >
          <NavigateBefore style={{ fontSize: isSmallScreen ? 32 : 64 }}/>
        </IconButton>

        <IconButton
          onClick={() => sliderRef?.current?.slickNext()}  // Adjust the ref based on your actual implementation
          style={{
            width: isSmallScreen ? 32 : 64,
            height: isSmallScreen ? 32 : 64,
            position: 'absolute',
            top: '50%',
            right: isSmallScreen ? 16 : 64,
            transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            padding: '10px',
            borderRadius: '50%',
            pointerEvents: 'auto', // Allow click events
          }}
        >
          <NavigateNext style={{ fontSize: isSmallScreen ? 32 : 64 }}/>
        </IconButton>
        
      </Box>



      {/* Full-width box with Lorem Ipsum text */}
      <Box sx={{ p: 2, mt: 2, textAlign: 'center' }}>
        <Typography variant={isSmallScreen ? 'h3' : 'h1'}>
          Apa Itu Bencanamu?
        </Typography>
        <Typography variant="body1">
          Aplikasi ini dirancang sebagai solusi terpadu untuk menghadapi situasi darurat dengan memberikan akses cepat dan mudah kepada pengguna. Fitur pelaporan bencana memungkinkan masyarakat untuk dengan cepat dan efisien memberikan informasi tentang kejadian darurat, memungkinkan otoritas setempat untuk merespons dengan lebih cepat. Hotline relawan dokter umum membantu mendekatkan layanan kesehatan ke masyarakat, memfasilitasi konsultasi medis di masa-masa darurat. Selain itu, aplikasi menyediakan informasi dasar tentang keamanan, seperti pelaporan kebakaran, kepolisian, rumah sakit, dan pemadam kebakaran, sehingga pengguna dapat dengan mudah mengakses bantuan dan informasi yang diperlukan dalam situasi darurat. Dengan berbagai fitur ini, aplikasi ini bertujuan untuk meningkatkan kesiapsiagaan masyarakat dan memastikan penanganan darurat yang lebih efektif dan efisien.
        </Typography>
      </Box>

      <CustomDivider />

      {/* Left side (Title and Text) */}
      <Grid container>
        {/* Right side (Image) */}
        {!isSmallScreen && (
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
        )}

        <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', marginLeft: 'auto' }}>
          <Typography variant="h3" sx={{ color: 'red' }}>Apa Itu DAMKAR?</Typography>
          <Typography variant={isSmallScreen ? 'body1' : 'h5'}>
            DAMKAR, atau Pemadam Kebakaran, adalah lembaga kritis dalam menjaga keselamatan masyarakat dari ancaman kebakaran dan bencana terkait. Dengan fokus pada respons cepat dan pencegahan, DAMKAR memiliki peran utama dalam melindungi nyawa dan harta benda.
          </Typography>
          <Box sx={{ marginTop: 'auto' }}>
            <Button
              fullWidth
              variant="contained"
              style={{ backgroundColor: 'red', color: 'white' }}
            >
              <Typography>
                Ke halaman DAMKAR {'>'}
              </Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>

      <CustomDivider />

      {/* Left side (Title and Text) */}
      <Grid container>
        <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h3" sx={{ color: 'red' }}>Apa Itu DAMKAR?</Typography>
          <Typography variant={isSmallScreen ? 'body1' : 'h5'}>
            DAMKAR, atau Pemadam Kebakaran, adalah lembaga kritis dalam menjaga keselamatan masyarakat dari ancaman kebakaran dan bencana terkait. Dengan fokus pada respons cepat dan pencegahan, DAMKAR memiliki peran utama dalam melindungi nyawa dan harta benda.
          </Typography>
          <Box sx={{ marginTop: 'auto' }}>
            <Button
              fullWidth
              variant="contained"
              style={{ backgroundColor: 'red', color: 'white' }}
            >
              <Typography>
                Ke halaman DAMKAR {'>'}
              </Typography>
            </Button>
          </Box>
        </Grid>
        {/* Right side (Image) */}
        {!isSmallScreen && (
          <Grid item xs={12} md={6} sx={{ marginLeft: 'auto' }}>
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
        )}
      </Grid>

      <CustomDivider />

      {/* Left side (Title and Text) */}
      <Grid container>
        {/* Right side (Image) */}
        {!isSmallScreen && (
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
        )}
        <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', marginLeft: 'auto' }}>
          <Typography variant="h3" sx={{ color: 'red' }}>Apa Itu DAMKAR?</Typography>
          <Typography variant={isSmallScreen ? 'body1' : 'h5'}>
            DAMKAR, atau Pemadam Kebakaran, adalah lembaga kritis dalam menjaga keselamatan masyarakat dari ancaman kebakaran dan bencana terkait. Dengan fokus pada respons cepat dan pencegahan, DAMKAR memiliki peran utama dalam melindungi nyawa dan harta benda.
          </Typography>
          <Box sx={{ marginTop: 'auto' }}>
            <Button
              fullWidth
              variant="contained"
              style={{ backgroundColor: 'red', color: 'white' }}
            >
              <Typography>
                Ke halaman DAMKAR {'>'}
              </Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>

      <CustomDivider />

      {/* Left side (Title and Text) */}
      <Grid container>
        <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h3" sx={{ color: 'red' }}>Apa Itu DAMKAR?</Typography>
          <Typography variant={isSmallScreen ? 'body1' : 'h5'}>
            DAMKAR, atau Pemadam Kebakaran, adalah lembaga kritis dalam menjaga keselamatan masyarakat dari ancaman kebakaran dan bencana terkait. Dengan fokus pada respons cepat dan pencegahan, DAMKAR memiliki peran utama dalam melindungi nyawa dan harta benda.
          </Typography>
          <Box sx={{ marginTop: 'auto' }}>
            <Button
              fullWidth
              variant="contained"
              style={{ backgroundColor: 'red', color: 'white' }}
            >
              <Typography>
                Ke halaman DAMKAR {'>'}
              </Typography>
            </Button>
          </Box>
        </Grid>
        {/* Right side (Image) */}
        {!isSmallScreen && (
          <Grid item xs={12} md={6} sx={{ marginLeft: 'auto' }}>
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
        )}
      </Grid>
    </Paper>
  );
};

export default Home;
