import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './health-form.styles.scss';

const HealthForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    weight: '',
    height: '',
    activityLevel: 'sedentary',
    dietaryPreference: 'none',
    allergies: '',
    medicalConditions: '',
    medications: '',
    goals: 'maintain',
    mealPreferences: '',
    excludedFoods: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Health data:', formData);
    navigate('/dashboard');
  };

  return (
    <div className="health-form-container">
      <div className="health-form-box">
        <h2>Health Information</h2>
        <p className="form-description">
          Please provide your health information to help us create a personalized diet plan.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Basic Information */}
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="1"
                max="120"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
                step="0.1"
                min="20"
                max="300"
              />
            </div>

            <div className="form-group">
              <label htmlFor="height">Height (cm)</label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                required
                min="50"
                max="300"
              />
            </div>

            <div className="form-group">
              <label htmlFor="activityLevel">Activity Level</label>
              <select
                id="activityLevel"
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                required
              >
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="light">Lightly active (1-3 days/week)</option>
                <option value="moderate">Moderately active (3-5 days/week)</option>
                <option value="very">Very active (6-7 days/week)</option>
                <option value="extra">Extra active (very active + physical job)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dietaryPreference">Dietary Preference</label>
              <select
                id="dietaryPreference"
                name="dietaryPreference"
                value={formData.dietaryPreference}
                onChange={handleChange}
                required
              >
                <option value="none">No specific preference</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="keto">Ketogenic</option>
                <option value="paleo">Paleo</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="allergies">Food Allergies</label>
              <textarea
                id="allergies"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                placeholder="List any food allergies (e.g., nuts, dairy, shellfish)"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="medicalConditions">Medical Conditions</label>
              <textarea
                id="medicalConditions"
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleChange}
                placeholder="List any medical conditions (e.g., diabetes, hypertension)"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="medications">Current Medications</label>
              <textarea
                id="medications"
                name="medications"
                value={formData.medications}
                onChange={handleChange}
                placeholder="List any medications you're currently taking"
              />
            </div>

            <div className="form-group">
              <label htmlFor="goals">Health Goals</label>
              <select
                id="goals"
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                required
              >
                <option value="maintain">Maintain weight</option>
                <option value="lose">Lose weight</option>
                <option value="gain">Gain weight</option>
                <option value="muscle">Build muscle</option>
                <option value="energy">Increase energy</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="mealPreferences">Meal Preferences</label>
              <textarea
                id="mealPreferences"
                name="mealPreferences"
                value={formData.mealPreferences}
                onChange={handleChange}
                placeholder="Any specific meal preferences or cuisines you enjoy"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="excludedFoods">Foods to Exclude</label>
              <textarea
                id="excludedFoods"
                name="excludedFoods"
                value={formData.excludedFoods}
                onChange={handleChange}
                placeholder="List any foods you want to exclude from your diet"
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            Save Health Information
          </button>
        </form>
      </div>
    </div>
  );
};

export default HealthForm; 