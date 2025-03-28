import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import './Navbar.scss';

const Navbar = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Diet Plan Generator</Link>
      </div>
      <div className="navbar-menu">
        <Link to="/health-form">Health Form</Link>
        <Link to="/dashboard">Dashboard</Link>
        <button onClick={handleSignOut} className="sign-out-button">
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 