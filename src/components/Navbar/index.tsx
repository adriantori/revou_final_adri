import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useSettings } from '../../contexts/SettingProvider';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

const commonPages = ['Bencana', 'DAMKAR', 'Polisi', 'Medis'];
const mobilePages = ['Dokter', 'Laporkan']; // Additional pages for mobile view


function Navbar() {
  const { settings } = useSettings();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const [pages, setPages] = React.useState([...commonPages]);

  React.useEffect(() => {
    const handleResize = () => {
      setPages([...commonPages, ...(window.innerWidth < 600 ? mobilePages : [])]);
    };

    window.addEventListener('resize', handleResize);

    // Initial setup
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ background: 'white', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'red', // Change text color to black
              textDecoration: 'none',
            }}
          >
            DaruraT!
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="warning" // Set color to "inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                top: '56px', // Adjust the top position as needed
              }}
            >
              {pages.map((page) => (
                <Link
                  key={page}
                  to={`/${page.toLowerCase()}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black', // Change text color to black
              textDecoration: 'none',
            }}
          >
            DaruraT!
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link
                key={page}
                to={`/${page.toLowerCase()}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Button sx={{ my: 2, display: 'block' }}>
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex' }}>
            {/* Avatar (Mobile Only) */}
            <IconButton
              size="large"
              sx={{
                display: { xs: 'flex', md: 'none' },
                p: 0,
              }}
              onClick={handleOpenUserMenu}
            >
              <Avatar />
            </IconButton>

            {/* Dokter and Laporkan Buttons (Desktop Only) */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
              }}
            >
              <IconButton
                component={Link}
                to={`/dokter`}
                size="large"
                aria-label="Dokter"
                sx={{ p: 0 }}
              >
                <Typography
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.1rem',
                    color: 'green',
                    textDecoration: 'none',
                    marginRight: 2
                  }}>
                  DOKTER
                </Typography>
              </IconButton>


              <IconButton
                component={Link}
                to={`/laporkan`}
                size="large"
                aria-label="Laporkan"
                sx={{ p: 0 }}
              >
                <Typography
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.1rem',
                    color: 'red',
                    textDecoration: 'none',
                  }}>
                  LAPORKAN
                </Typography>
              </IconButton>

            </Box>

            {/* Account Button (Desktop Only) */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, display: { xs: 'none', md: 'flex' } }}>
                <Button
                  sx={{
                    mr: 2,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.1rem',
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  Akun
                </Button>
              </IconButton>
            </Tooltip>

            {/* User Menu */}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-accbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link
                  key={setting}
                  to={`/${setting.toLowerCase()}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
