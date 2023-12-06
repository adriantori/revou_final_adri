import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <AppBar position="static" style={{ position: 'fixed', bottom: 0 }}>
      <Toolbar style={{ justifyContent: 'center' }}>
        <Typography variant="body2" color="textDark">
          Created by G-Mans ©2023 - RevoU Final Project
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
