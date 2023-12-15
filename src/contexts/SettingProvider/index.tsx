import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SettingsContextType {
  settings: string[];
  updateSettings: (newSettings: string[]) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState(['Homepage', 'Login', 'Register']);

  const updateSettings = (newSettings: string[]) => {
    setSettings(newSettings);
  };

  const contextValue: SettingsContextType = {
    settings,
    updateSettings,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};
