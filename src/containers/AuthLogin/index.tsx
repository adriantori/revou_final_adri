import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRef, useState } from 'react';

import { baseUrl } from '../../configs/Constants'
import { useNotification } from '../../contexts/NotificationContext';
import { useSettings } from '../../contexts/SettingProvider';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AuthLogin() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const formRef = useRef<HTMLFormElement | null>(null);
    const showNotification = useNotification();
    const { updateSettings } = useSettings();
    const navigate = useNavigate();



    const handleEmailChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setEmail(event.target.value);
    };

    const validateEmail = () => {
        // Regular expression for a valid email address
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && !emailRegex.test(email)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        validateEmail();

        // Wait for email validation before proceeding
        await new Promise((resolve) => setTimeout(resolve, 0));

        // Check if there are any errors before submitting the form
        if (!emailError) {
            const formData = new FormData(formRef.current as HTMLFormElement);
            console.log({
                email: formData.get('email'),
                password: formData.get('password'),
            });
            // Add your form submission logic here
            try {
                const response = await axios.post(`${baseUrl}/auth/login`, {
                    user_email: formData.get('email'),
                    user_pass: formData.get('password'),
                });

                const token = response.data?.data?.token;

                if (token) {
                    // Store the token in localStorage
                    localStorage.setItem('token', token);
                    const newSettings = ['Home', 'Profile', 'Logout'];
                    updateSettings(newSettings);
                }
                // Add your additional logic here
                showNotification('success','Login Sukses!', 'Login Sukses');
                navigate('/');

            } catch (error) {
                console.error('Error submitting form:', error);
                showNotification('error','Login Gagal!', 'Login Gagal');
                // Handle error as needed
            }
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} ref={formRef} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={validateEmail}  // Trigger validation on blur
                            error={!!emailError}
                            helperText={emailError}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
