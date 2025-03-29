import '@fontsource/poppins'
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'
import { ThemeProvider } from './context/ThemeContext';
import { HealthDataProvider } from './context/HealthDataContext';
import Navbar from './components/Navbar/Navbar';
import Authentication from './routes/authentication/authentication.component';
import HealthForm from './routes/health-form/health-form.component';
import './styles/theme.scss';
import Dashboard from './routes/dashboard/dashboard.component';
import FoodDatabase from './routes/food-database/food-database.component';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <ThemeProvider>
      <HealthDataProvider>
        <>
          {user && <Navbar />}
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <Navigate to="/health-form" />
                ) : (
                  <Authentication />
                )
              }
            />
            <Route
              path="/health-form"
              element={
                user ? (
                  <HealthForm />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/food-database"
              element={
                user ? (
                  <FoodDatabase />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                user ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </>
      </HealthDataProvider>
    </ThemeProvider>
  );
};

export default App;