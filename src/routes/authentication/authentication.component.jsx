import { useState } from 'react';
import { auth } from '../../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile
} from 'firebase/auth';
import ThemeSwitcher from '../../components/ThemeSwitcher/ThemeSwitcher';
import './authentication.styles.scss';

const Authentication = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        const { user } = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        await updateProfile(user, {
          displayName: formData.username
        });
      } else {
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="authentication-container">
      <div className="theme-switcher-container">
        <ThemeSwitcher />
      </div>
      <div className="authentication-box">
        <h2>{isSignUp ? 'Create Account' : 'Sign In'}</h2>
        
        <button className="google-sign-in" onClick={signInWithGoogle}>
          Sign in with Google
        </button>

        <div className="divider">
          <span>or</span>
        </div>

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {isSignUp && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {error && <div className="error">{error}</div>}

          <button type="submit" className="submit-button">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <p className="toggle-form">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Authentication; 