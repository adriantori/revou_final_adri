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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [passwordStrengthError, setPasswordStrengthError] = React.useState('');
    const [emailError, setEmailError] = useState('');
    const [role, setRole] = useState<string | null>(null); // Explicitly define the type
    const [nik, setNIK] = useState('');
    const [telepon, setTelepon] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [nostr, setNostr] = useState('');
    const [lokasi, setLokasi] = useState('');


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
        // Regular expression for a valid email address
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && !emailRegex.test(email)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const renderAdditionalFields = () => {
        if (role === '1') { // Render additional fields for 'Relawan'
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
                            id="nik"
                            label="NIK"
                            name="nik"
                            autoComplete="nik"
                            value={nik}
                            onChange={handleNIKChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="telepon"
                            label="Telepon"
                            type="tel"
                            id="telepon"
                            autoComplete="tel"
                            value={telepon}
                            onChange={handleTeleponChange}
                        />
                    </Grid>
                </>
            );
        } else if (role === '2') { // Render additional fields for 'Dokter'
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
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Untuk Dihubungi"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={validateEmail}
                        error={!!emailError}
                        helperText={emailError}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        fullWidth
                        name="telepon"
                        label="Telepon Untuk Dihubungi"
                        type="tel"
                        id="telepon"
                        autoComplete="tel"
                        value={telepon}
                        onChange={handleTeleponChange}
                    />
                </Grid>
                <Grid item xs={12}>
                <TextField
                        margin="normal"
                        required
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
            </>
            );
        }

        return null; // No additional fields for other roles
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value;
        setPassword(newPassword);

        // Check for password strength (add your own criteria)
        if (newPassword.length < 6) {
            setPasswordStrengthError('Password harus 6 karakter atau lebih.');
        } else {
            setPasswordStrengthError('');
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        validateEmail();

        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            alert('Password and Confirm Password must match.');
            return;
        }

        // Check for password strength
        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }

        // Check if there are any errors before submitting the form
        if (emailError) {
            alert('Please fix the email error before submitting.');
            return;
        }
        
        if (role === '1' && (nik.length !== 16 || !/^\d+$/.test(nik))) {
            alert('NIK harus 16 angka');
            return;
        }

        // Form is valid, proceed with submission
        console.log({
            name,
            email,
            password,
            role,
            ...(role === '1' && { telepon, nik }), // Include telepon and nik if role is 'Pelapor'
            ...(role === '2' && { telepon, bio, nostr, lokasi }), // Include doctor-specific fields if role is 'Dokter'
        });
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

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
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
                                    autoComplete="new-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RadioGroup
                                    aria-label="role"
                                    name="role"
                                    value={role}
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
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
