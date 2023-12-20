import React, { useEffect, useState } from 'react';
import { TextField, Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useNotification } from '../../contexts/NotificationContext';
import { baseUrl } from '../../configs/Constants';
import { Loading } from '../../components';

interface DecodedToken {
    email: string;
    id: number;
    role: number;
    iat: number;
    exp: number;
    // Add other fields as needed
}

interface DoctorData {
    DOK_ID: number;
    USER_ID: number;
    DOK_NAME: string;
    DOK_SPEC: string;
    DOK_EMAIL: string;
    DOK_TELP: string;
    DOK_BIO: string;
    DOK_NOSTR: string;
    DOK_LOCATION: string;
    DOK_EXP: string;
}

interface DoctorProfileProps {
    doctorData: DoctorData;
    onUpdateProfile: (updatedData: Partial<DoctorData>) => void;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({ doctorData, onUpdateProfile }) => {
    const [name, setName] = useState(doctorData.DOK_NAME || '');
    const [email, setEmail] = useState(doctorData.DOK_EMAIL || '');
    const [phone, setPhone] = useState(doctorData.DOK_TELP || '');
    const [bio, setBio] = useState(doctorData.DOK_BIO || '');
    const [location, setLocation] = useState(doctorData.DOK_LOCATION || '');
    const [experience, setExperience] = useState(doctorData.DOK_EXP || '');
    const [loading, setLoading] = useState(false);
    const showNotification = useNotification();


    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    };

    const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBio(event.target.value);
    };

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value);
    };

    const handleExperienceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExperience(event.target.value);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const updatedData: Partial<DoctorData> = {
                DOK_NAME: name,
                DOK_EMAIL: email,
                DOK_TELP: phone,
                DOK_BIO: bio,
                DOK_LOCATION: location,
                DOK_EXP: experience,
            };

            // Perform the PUT request to update the data on the backend
            const response = await fetch(`${baseUrl}/doctor/update/${doctorData.USER_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${localStorage.getItem('token')}`
                    // Add any other headers as needed, including authentication headers
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                // If the update is successful, you might want to fetch the updated data again
                // This depends on your backend API behavior
                const updatedResponse = await fetch(`${baseUrl}/doctor/getById/${doctorData.USER_ID}`);
                const updatedData = await updatedResponse.json();

                // Pass the updated data to the parent component

                onUpdateProfile(updatedData.doctor);
            } else {
                // Handle error scenarios, show a notification, etc.
                console.error('Error updating data:', response.statusText);
            }
        } catch (error) {
            // Handle any unexpected errors
            console.error('Unexpected error:', error);
        } finally {
            setLoading(false);
            showNotification('success', 'Data tersimpan!', 'Data tersimpan!');
        }
    };

    if (loading) {
        // If loading is true, render the Loading component
        return <Loading />;
    }

    return (
        <>
            <Typography variant="h5" gutterBottom>
                {doctorData.DOK_NAME}'s Profile:
            </Typography>
            <TextField label="Nama" fullWidth value={name} onChange={handleNameChange} sx={{ marginTop: 2 }} />
            <TextField label="Email" type="email" fullWidth value={email} onChange={handleEmailChange} sx={{ marginTop: 2 }} />
            <TextField label="Nomor Telepon" type="tel" fullWidth value={phone} onChange={handlePhoneChange} sx={{ marginTop: 2 }} />
            <TextField label="Bio" fullWidth value={bio} onChange={handleBioChange} sx={{ marginTop: 2 }} />
            <TextField label="Lokasi Praktek" fullWidth value={location} onChange={handleLocationChange} sx={{ marginTop: 2 }} />
            <TextField label="Pengalaman (tahun)" type="number" fullWidth value={experience} onChange={handleExperienceChange} sx={{ marginTop: 2 }} />
            <Button
                onClick={handleSave}
                sx={{
                    marginTop: 2,
                    backgroundColor: 'lightblue',
                    color: 'black',
                    '&:hover': {
                        backgroundColor: 'blue',
                        color: 'white'
                    },
                }}
            >
                Save
            </Button>


            {/* Add more doctor-specific fields here */}
        </>
    );
};

const Profile = () => {
    const navigate = useNavigate();
    const showNotification = useNotification();
    const [loading, setLoading] = useState(false); // Initial loading state
    const [role, setRole] = useState<number>();
    const [doctorData, setDoctorData] = useState<DoctorData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    showNotification('error', 'Login Dulu Yaaa!', 'Login Gagal');
                    navigate('/login');
                    return;
                }
                const decoded = jwt_decode<DecodedToken>(token);
                setRole(decoded.role);

                // Fetch doctor-specific data if the role is 2 (Doctor)
                if (decoded.role === 2) {
                    // Replace this with your API endpoint to get doctor data by ID
                    const doctorId = decoded.id;
                    const response = await fetch(`${baseUrl}/doctor/getById/${doctorId}`);
                    const responseData = await response.json();
                    const data: DoctorData = responseData.doctor;
                    setDoctorData(data);
                }
            } catch (error) {
                console.error('Error decoding token useEffect:', error);
                showNotification('error', 'Kayaknya ada yang error, hubungin admin yaa!', 'Login Gagal');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate, showNotification]);

    const onUpdateProfile = (updatedData: Partial<DoctorData>) => {
        // Update the state using a callback function
        setDoctorData((prevData) => {
            if (prevData) {
                return { ...prevData, ...updatedData };
            }
            return prevData;
        });
    };

    if (loading) {
        // If loading is true, render the Loading component
        return <Loading />;
    }

    return (
        <Container>
            {role === 1 ? (
                <>
                    <TextField label="Area of Expertise" fullWidth />
                    <TextField label="Contact Information" fullWidth />
                </>
            ) : role === 2 && doctorData ? (
                <DoctorProfile doctorData={doctorData} onUpdateProfile={onUpdateProfile} />
            ) : (
                <Typography variant="body1">Unknown role</Typography>
            )}
        </Container>
    );
};

export default Profile;
