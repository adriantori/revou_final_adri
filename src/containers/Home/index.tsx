import React from 'react';
import { Button } from '@mui/material';
import { useSettings } from '../../contexts/SettingProvider';

const Home: React.FC = () => {
  const { updateSettings } = useSettings();

  const handleButtonClick = () => {
    const newSettings = ['Homepage', 'Profile', 'Logout'];
    updateSettings(newSettings);
  };

  return (
    <div>
      <h1>Hello World</h1>
      <Button onClick={handleButtonClick}>Click</Button>
    </div>
  );
};

export default Home;
