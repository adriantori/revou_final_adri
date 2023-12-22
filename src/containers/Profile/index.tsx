import { useEffect, useState } from 'react';
import { Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useNotification } from '../../contexts/NotificationContext';
import { baseUrl } from '../../configs/Constants';
import { Loading } from '../../components';
import InformerProfileForm from './InformerProfileForm';
import DoctorProfileForm from './DoctorProfileForm';

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

interface InformerData {
    INF_ID: number;
    USER_ID: number;
    INF_NAME: string;
    INF_NIK: string;
    INF_TELP: string;
}

// ... (imports and interfaces remain the same)

const Profile = () => {
    const navigate = useNavigate();
    const showNotification = useNotification();
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState<number>();
    const [doctorData, setDoctorData] = useState<DoctorData | null>(null);
    const [informerData, setInformerData] = useState<InformerData | null>(null);

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
                if (decoded.role === 1) {
                    // Fetch informer-specific data if the role is 1 (Informer)
                    const informerId = decoded.id;
                    const response = await fetch(`${baseUrl}/informer/getById/${informerId}`);
                    const responseData = await response.json();
                    const data: InformerData = responseData.informer;
                    setInformerData(data);
                } else if (decoded.role === 2) {
                    // Fetch doctor-specific data if the role is 2 (Doctor)
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

    const onUpdateDoctorProfile = (updatedData: Partial<DoctorData>) => {
        setDoctorData((prevData) => {
            if (prevData) {
                return { ...prevData, ...updatedData };
            }
            return prevData;
        });
    };

    const onUpdateInformerProfile = (updatedData: Partial<InformerData>) => {
        setInformerData((prevData) => {
            if (prevData) {
                return { ...prevData, ...updatedData };
            }
            return prevData;
        });
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <Container>
            {role === 1 && informerData ? (
                // Render InformerProfileForm for role 1 (Informer)
                <InformerProfileForm informerData={informerData} onUpdateProfile={onUpdateInformerProfile} />
            ) : role === 2 && doctorData ? (
                // Render DoctorProfile for role 2 (Doctor)
                <DoctorProfileForm doctorData={doctorData} onUpdateProfile={onUpdateDoctorProfile} />
            ) : (
                <Typography variant="body1">Unknown role {role}</Typography>
            )}
        </Container>
    );
};

export default Profile;

