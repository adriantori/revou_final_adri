import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../../contexts/SettingProvider';

const AuthLogout: React.FC = () => {
  const navigate = useNavigate();
  const { updateSettings } = useSettings();

  useEffect(() => {
    // Remove all items from local storage
    localStorage.clear();

    // Reset settings to default
    updateSettings(['Homepage', 'Login', 'Register']);

    // Redirect to the home page
    navigate('/');
  }, [updateSettings, navigate]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default AuthLogout;
