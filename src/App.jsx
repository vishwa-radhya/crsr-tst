import '@fontsource/poppins'
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'
import Navbar from './components/Navbar';
import Authentication from './routes/authentication/authentication.component';
import HealthForm from './routes/health-form/health-form.component';
import './App.scss';

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
          path="/dashboard"
          element={
            user ? (
              <div>Dashboard (Coming Soon)</div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </>
  );
};

export default App;
