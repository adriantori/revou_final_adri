import * as React from 'react';
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
import { useState } from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import axios, { AxiosError } from 'axios';

import { baseUrl } from '../../configs/Constants'
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../contexts/NotificationContext';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
    const [user_email, setEmail] = useState('');
    const [user_pass, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [passwordStrengthError, setPasswordStrengthError] = React.useState('');
    const [emailError, setEmailError] = useState('');
    const [role_id, setRole] = useState<string | null>(null); // Explicitly define the type
    const [inf_nik, setNIK] = useState('');
    const [inf_telp, setTelepon] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [nostr, setNostr] = useState('');
    const [lokasi, setLokasi] = useState('');
    const [spec, setSpec] = useState('');
    const [emailContact, setEmailContact] = useState('');
    const [experience, setExperience] = useState('');
    const showNotification = useNotification();
    const navigate = useNavigate();

    const handleChange = (event: { target: { value: React.SetStateAction<string | null>; }; }) => {
        setRole(event.target.value);
    };

    const handleNIKChange = (event: { target: { value: string }; }) => {
        const newNIK = event.target.value;
        setNIK(newNIK);
    };

    const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBio(event.target.value);
    };

    const handleExperienceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExperience(event.target.value);
    };

    const handleNostrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNostr(event.target.value);
    };

    const handleLokasiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLokasi(event.target.value);
    };

    const handleTeleponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTelepon: string = event.target.value;

        // Validate phone number (add your own criteria)
        const phoneRegex = /^[0-9\b]+$/;
        if (phoneRegex.test(newTelepon) || newTelepon === '') {
            setTelepon(newTelepon);
        }
    };

    const handleEmailChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setEmail(event.target.value);
    };

    const validateEmail = () => {
        // Regular expression for a valid user_email address
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (user_email && !emailRegex.test(user_email)) {
            setEmailError('Invalid user_email format');
        } else {
            setEmailError('');
        }
    };

    const renderAdditionalFields = () => {
        if (role_id === '1') { // Render additional fields for 'Relawan'
            return (
                <>
                    <Grid item xs={12}>
                        {/* Additional fields for 'Relawan' */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Nama"
                            name="name"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="inf_nik"
                            label="NIK"
                            name="inf_nik"
                            autoComplete="inf_nik"
                            value={inf_nik}
                            onChange={handleNIKChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="inf_telp"
                            label="Telepon"
                            type="tel"
                            id="inf_telp"
                            autoComplete="tel"
                            value={inf_telp}
                            onChange={handleTeleponChange}
                        />
                    </Grid>
                </>
            );
        } else if (role_id === '2') { // Render additional fields for 'Dokter'
            return (
                <>
                    <Grid item xs={12}>
                        {/* Additional fields for 'Dokter' */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Nama"
                            name="name"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {/* Additional fields for 'Dokter' */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="spec"
                            label="Spesialisasi"
                            name="spec"
                            autoComplete="spec"
                            value={spec}
                            onChange={(e) => setSpec(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="emailContact"
                            label="Email Untuk Dihubungi"
                            name="emailContact"
                            autoComplete="emailContact"
                            value={emailContact}
                            onChange={(e) => setEmailContact(e.target.value)}
                            onBlur={validateEmail}
                            error={!!emailError}
                            helperText={emailError}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            fullWidth
                            name="inf_telp"
                            label="Telepon Untuk Dihubungi"
                            type="tel"
                            id="inf_telp"
                            autoComplete="tel"
                            value={inf_telp}
                            onChange={handleTeleponChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            fullWidth
                            name="bio"
                            label="Bio"
                            type="text"
                            id="bio"
                            autoComplete="bio"
                            value={bio}
                            onChange={handleBioChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="nostr"
                            label="No. STR"
                            type="text"
                            id="nostr"
                            autoComplete="nostr"
                            value={nostr}
                            onChange={handleNostrChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="lokasi"
                            label="Lokasi Praktek"
                            type="text"
                            id="lokasi"
                            autoComplete="lokasi"
                            value={lokasi}
                            onChange={handleLokasiChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="experience"
                            label="Pengalaman Praktek (tahun)"
                            type="number"
                            id="experience"
                            autoComplete="experience"
                            value={experience}
                            onChange={handleExperienceChange}
                        />
                    </Grid>
                </>
            );
        }

        return null; // No additional fields for other roles
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value;
        setPassword(newPassword);

        // Check for user_pass strength (add your own criteria)
        if (newPassword.length < 6) {
            setPasswordStrengthError('Password harus 6 karakter atau lebih.');
        } else {
            setPasswordStrengthError('');
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        validateEmail();

        // Check if user_pass and confirmPassword match
        if (user_pass !== confirmPassword) {
            alert('Password and Confirm Password must match.');
            return;
        }

        // Check for user_pass strength
        if (user_pass.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }

        // Check if there are any errors before submitting the form
        if (emailError) {
            alert('Please fix the user_email error before submitting.');
            return;
        }

        try {
            if (role_id === '1') {
                try {
                    // Role 1 API call and data
                    if (inf_nik.length !== 16 || !/^\d+$/.test(inf_nik)) {
                        alert('NIK harus 16 angka');
                        return;
                    }

                    const url = `${baseUrl}/informer/register`; // Replace with your actual API endpoint for role_id 1
                    const inf_name = name
                    const data = [{
                        user_email,
                        user_pass,
                        role_id,
                    },
                    {
                        inf_name,
                        inf_nik,
                        inf_telp,
                    }];
                    console.log(url, data)
                    await axios.post(url, data);
                    showNotification('success', 'Register Sukses! Login langsung yuk', 'Login Sukses');
                    navigate('/login')
                } catch (error: unknown) {
                    const err = error as AxiosError
                    showNotification('error', err.message, 'Login Sukses');
                }

            } else if (role_id === '2') {
                // Role 2 API call and data
                try {
                    const url = `${baseUrl}/doctor/register`; // Replace with your actual API endpoint for role_id 2
                    const data = {
                        user_email,
                        user_pass,
                        role_id,
                        name,
                        spec,
                        emailContact,
                        inf_telp,
                        bio,
                        nostr,
                        lokasi,
                        experience,
                    };

                    await axios.post(url, data);
                    showNotification('success', 'Register Sukses! Login langsung yuk', 'Login Sukses');
                    navigate('/login')
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: unknown) {
                    const err = error as AxiosError
                    showNotification('error', err.message, 'Login Sukses');
                }

            }

        } catch (error: unknown) {
            const err = error as AxiosError
            showNotification('error', err.message, 'Login Sukses');
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="user_email"
                                    label="Email Address"
                                    name="user_email"
                                    autoComplete="user_email"
                                    autoFocus
                                    value={user_email}
                                    onChange={handleEmailChange}
                                    onBlur={validateEmail}  // Trigger validation on blur
                                    error={!!emailError}
                                    helperText={emailError}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="user_pass"
                                    label="Password"
                                    type="password"
                                    id="user_pass"
                                    autoComplete="new-user_pass"
                                    value={user_pass}
                                    onChange={handlePasswordChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="new-user_pass"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RadioGroup
                                    aria-label="role_id"
                                    name="role_id"
                                    value={role_id}
                                    onChange={handleChange}
                                    row
                                >
                                    <FormControlLabel value="1" control={<Radio />} label="Pelapor" />
                                    <FormControlLabel value="2" control={<Radio />} label="Dokter" />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12}>
                                {renderAdditionalFields()}
                            </Grid>
                        </Grid>
                        {passwordStrengthError && (
                            <Typography color="error" variant="caption">
                                {passwordStrengthError}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Daftar Akun
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Sudah ada akun? login yuk!
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
