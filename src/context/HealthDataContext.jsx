import React, { createContext, useContext, useState, useEffect } from 'react';

const HealthDataContext = createContext();

export const useHealthData = () => {
  return useContext(HealthDataContext);
};

export const HealthDataProvider = ({ children }) => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load health data from localStorage on mount
    const savedHealthData = localStorage.getItem('healthData');
    if (savedHealthData) {
      try {
        setHealthData(JSON.parse(savedHealthData));
      } catch (error) {
        console.error('Error parsing health data:', error);
      }
    }
    setLoading(false);
  }, []);

  const updateHealthData = (newData) => {
    setHealthData(newData);
    localStorage.setItem('healthData', JSON.stringify(newData));
  };

  const clearHealthData = () => {
    setHealthData(null);
    localStorage.removeItem('healthData');
  };

  const value = {
    healthData,
    loading,
    updateHealthData,
    clearHealthData
  };

  return (
    <HealthDataContext.Provider value={value}>
      {!loading && children}
    </HealthDataContext.Provider>
  );
}; 