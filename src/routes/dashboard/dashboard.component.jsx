import React, { useState } from 'react';
import { useHealthData } from '../../context/HealthDataContext';
import './dashboard.styles.scss';

const Dashboard = () => {
  const { healthData } = useHealthData();
  const [selectedDay, setSelectedDay] = useState('Monday');

  // Mock weekly meal plan data
  const mockWeeklyPlan = {
    Monday: {
      breakfast: {
        name: "Healthy Breakfast Bowl",
        calories: 450,
        ingredients: ["Oatmeal", "Banana", "Almonds", "Honey"],
        macros: { protein: 15, carbs: 65, fat: 12 }
      },
      lunch: {
        name: "Grilled Chicken Salad",
        calories: 550,
        ingredients: ["Chicken Breast", "Mixed Greens", "Avocado", "Cherry Tomatoes"],
        macros: { protein: 35, carbs: 25, fat: 18 }
      },
      dinner: {
        name: "Salmon with Vegetables",
        calories: 600,
        ingredients: ["Salmon", "Broccoli", "Brown Rice", "Lemon"],
        macros: { protein: 40, carbs: 45, fat: 22 }
      },
      snacks: [
        {
          name: "Greek Yogurt with Berries",
          calories: 200,
          macros: { protein: 15, carbs: 25, fat: 5 }
        },
        {
          name: "Mixed Nuts",
          calories: 180,
          macros: { protein: 6, carbs: 8, fat: 15 }
        }
      ]
    },
    Tuesday: {
      breakfast: {
        name: "Protein Smoothie Bowl",
        calories: 400,
        ingredients: ["Protein Powder", "Spinach", "Mango", "Chia Seeds"],
        macros: { protein: 25, carbs: 55, fat: 10 }
      },
      lunch: {
        name: "Quinoa Buddha Bowl",
        calories: 500,
        ingredients: ["Quinoa", "Chickpeas", "Kale", "Sweet Potato"],
        macros: { protein: 20, carbs: 70, fat: 15 }
      },
      dinner: {
        name: "Turkey Stir-Fry",
        calories: 550,
        ingredients: ["Ground Turkey", "Mixed Vegetables", "Brown Rice", "Soy Sauce"],
        macros: { protein: 35, carbs: 40, fat: 20 }
      },
      snacks: [
        {
          name: "Apple with Peanut Butter",
          calories: 220,
          macros: { protein: 8, carbs: 30, fat: 10 }
        }
      ]
    },
    Wednesday: {
      breakfast: {
        name: "Avocado Toast",
        calories: 420,
        ingredients: ["Whole Grain Bread", "Avocado", "Eggs", "Cherry Tomatoes"],
        macros: { protein: 18, carbs: 45, fat: 15 }
      },
      lunch: {
        name: "Tuna Wrap",
        calories: 480,
        ingredients: ["Whole Wheat Wrap", "Tuna", "Lettuce", "Greek Yogurt"],
        macros: { protein: 30, carbs: 35, fat: 12 }
      },
      dinner: {
        name: "Vegetarian Pasta",
        calories: 580,
        ingredients: ["Whole Grain Pasta", "Mushrooms", "Spinach", "Parmesan"],
        macros: { protein: 22, carbs: 75, fat: 18 }
      },
      snacks: [
        {
          name: "Carrot Sticks with Hummus",
          calories: 150,
          macros: { protein: 5, carbs: 20, fat: 8 }
        }
      ]
    },
    Thursday: {
      breakfast: {
        name: "Breakfast Burrito",
        calories: 480,
        ingredients: ["Whole Wheat Tortilla", "Eggs", "Black Beans", "Bell Peppers"],
        macros: { protein: 22, carbs: 55, fat: 18 }
      },
      lunch: {
        name: "Mediterranean Salad",
        calories: 520,
        ingredients: ["Mixed Greens", "Feta Cheese", "Olives", "Cucumber", "Olive Oil"],
        macros: { protein: 15, carbs: 30, fat: 25 }
      },
      dinner: {
        name: "Baked Chicken with Sweet Potato",
        calories: 580,
        ingredients: ["Chicken Breast", "Sweet Potato", "Green Beans", "Herbs"],
        macros: { protein: 45, carbs: 50, fat: 15 }
      },
      snacks: [
        {
          name: "Trail Mix",
          calories: 200,
          macros: { protein: 8, carbs: 25, fat: 12 }
        }
      ]
    },
    Friday: {
      breakfast: {
        name: "Pancakes with Berries",
        calories: 450,
        ingredients: ["Whole Grain Flour", "Eggs", "Milk", "Mixed Berries", "Maple Syrup"],
        macros: { protein: 15, carbs: 70, fat: 12 }
      },
      lunch: {
        name: "Sushi Bowl",
        calories: 540,
        ingredients: ["Brown Rice", "Tuna", "Avocado", "Seaweed", "Cucumber"],
        macros: { protein: 25, carbs: 65, fat: 20 }
      },
      dinner: {
        name: "Grilled Steak with Vegetables",
        calories: 650,
        ingredients: ["Lean Steak", "Asparagus", "Mushrooms", "Red Wine Sauce"],
        macros: { protein: 50, carbs: 25, fat: 25 }
      },
      snacks: [
        {
          name: "Dark Chocolate and Almonds",
          calories: 180,
          macros: { protein: 5, carbs: 15, fat: 12 }
        }
      ]
    },
    Saturday: {
      breakfast: {
        name: "French Toast",
        calories: 480,
        ingredients: ["Whole Grain Bread", "Eggs", "Cinnamon", "Vanilla", "Maple Syrup"],
        macros: { protein: 18, carbs: 65, fat: 15 }
      },
      lunch: {
        name: "Pizza with Cauliflower Crust",
        calories: 520,
        ingredients: ["Cauliflower Crust", "Tomato Sauce", "Mozzarella", "Vegetables"],
        macros: { protein: 25, carbs: 45, fat: 20 }
      },
      dinner: {
        name: "Shrimp Scampi",
        calories: 580,
        ingredients: ["Shrimp", "Whole Grain Pasta", "Garlic", "White Wine", "Herbs"],
        macros: { protein: 35, carbs: 55, fat: 18 }
      },
      snacks: [
        {
          name: "Fruit and Cheese Plate",
          calories: 220,
          macros: { protein: 10, carbs: 25, fat: 12 }
        }
      ]
    },
    Sunday: {
      breakfast: {
        name: "Breakfast Casserole",
        calories: 450,
        ingredients: ["Eggs", "Spinach", "Mushrooms", "Cheese", "Whole Grain Bread"],
        macros: { protein: 25, carbs: 35, fat: 20 }
      },
      lunch: {
        name: "Roasted Vegetable Soup",
        calories: 480,
        ingredients: ["Mixed Vegetables", "Vegetable Broth", "Herbs", "Whole Grain Bread"],
        macros: { protein: 12, carbs: 65, fat: 15 }
      },
      dinner: {
        name: "Baked Fish with Rice",
        calories: 550,
        ingredients: ["White Fish", "Brown Rice", "Mixed Vegetables", "Lemon Butter Sauce"],
        macros: { protein: 35, carbs: 45, fat: 18 }
      },
      snacks: [
        {
          name: "Popcorn with Olive Oil",
          calories: 150,
          macros: { protein: 4, carbs: 25, fat: 8 }
        }
      ]
    }
  };

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const selectedDayPlan = mockWeeklyPlan[selectedDay];

  // Calculate daily totals for selected day
  const dailyTotals = {
    calories: selectedDayPlan.breakfast.calories + selectedDayPlan.lunch.calories + selectedDayPlan.dinner.calories + 
              selectedDayPlan.snacks.reduce((acc, snack) => acc + snack.calories, 0),
    macros: {
      protein: selectedDayPlan.breakfast.macros.protein + selectedDayPlan.lunch.macros.protein + selectedDayPlan.dinner.macros.protein +
               selectedDayPlan.snacks.reduce((acc, snack) => acc + snack.macros.protein, 0),
      carbs: selectedDayPlan.breakfast.macros.carbs + selectedDayPlan.lunch.macros.carbs + selectedDayPlan.dinner.macros.carbs +
             selectedDayPlan.snacks.reduce((acc, snack) => acc + snack.macros.carbs, 0),
      fat: selectedDayPlan.breakfast.macros.fat + selectedDayPlan.lunch.macros.fat + selectedDayPlan.dinner.macros.fat +
           selectedDayPlan.snacks.reduce((acc, snack) => acc + snack.macros.fat, 0)
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Your Personalized Dashboard</h1>
        <div className="health-summary">
          <div className="health-metric">
            <span className="label">Weight</span>
            <span className="value">{healthData?.weight} kg</span>
          </div>
          <div className="health-metric">
            <span className="label">Height</span>
            <span className="value">{healthData?.height} cm</span>
          </div>
          <div className="health-metric">
            <span className="label">Age</span>
            <span className="value">{healthData?.age} years</span>
          </div>
          <div className="health-metric">
            <span className="label">Activity Level</span>
            <span className="value">{healthData?.activityLevel}</span>
          </div>
          <div className="health-metric">
            <span className="label">Goal</span>
            <span className="value">{healthData?.goal}</span>
          </div>
        </div>
      </div>

      <div className="meal-plan-section">
        <div className="section-header">
          <h2>Weekly Meal Plan</h2>
          <div className="day-selector">
            {weekDays.map(day => (
              <button
                key={day}
                className={`day-button ${selectedDay === day ? 'active' : ''}`}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="daily-totals">
          <div className="total-metric">
            <span className="label">Total Calories</span>
            <span className="value">{dailyTotals.calories} kcal</span>
          </div>
          <div className="total-metric">
            <span className="label">Protein</span>
            <span className="value">{dailyTotals.macros.protein}g</span>
          </div>
          <div className="total-metric">
            <span className="label">Carbs</span>
            <span className="value">{dailyTotals.macros.carbs}g</span>
          </div>
          <div className="total-metric">
            <span className="label">Fat</span>
            <span className="value">{dailyTotals.macros.fat}g</span>
          </div>
        </div>

        <div className="meals-grid">
          <div className="meal-card">
            <h3>Breakfast</h3>
            <h4>{selectedDayPlan.breakfast.name}</h4>
            <p className="calories">{selectedDayPlan.breakfast.calories} kcal</p>
            <div className="ingredients">
              <h5>Ingredients:</h5>
              <ul>
                {selectedDayPlan.breakfast.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="macros">
              <span>P: {selectedDayPlan.breakfast.macros.protein}g</span>
              <span>C: {selectedDayPlan.breakfast.macros.carbs}g</span>
              <span>F: {selectedDayPlan.breakfast.macros.fat}g</span>
            </div>
          </div>

          <div className="meal-card">
            <h3>Lunch</h3>
            <h4>{selectedDayPlan.lunch.name}</h4>
            <p className="calories">{selectedDayPlan.lunch.calories} kcal</p>
            <div className="ingredients">
              <h5>Ingredients:</h5>
              <ul>
                {selectedDayPlan.lunch.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="macros">
              <span>P: {selectedDayPlan.lunch.macros.protein}g</span>
              <span>C: {selectedDayPlan.lunch.macros.carbs}g</span>
              <span>F: {selectedDayPlan.lunch.macros.fat}g</span>
            </div>
          </div>

          <div className="meal-card">
            <h3>Dinner</h3>
            <h4>{selectedDayPlan.dinner.name}</h4>
            <p className="calories">{selectedDayPlan.dinner.calories} kcal</p>
            <div className="ingredients">
              <h5>Ingredients:</h5>
              <ul>
                {selectedDayPlan.dinner.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="macros">
              <span>P: {selectedDayPlan.dinner.macros.protein}g</span>
              <span>C: {selectedDayPlan.dinner.macros.carbs}g</span>
              <span>F: {selectedDayPlan.dinner.macros.fat}g</span>
            </div>
          </div>

          <div className="meal-card snacks">
            <h3>Snacks</h3>
            {selectedDayPlan.snacks.map((snack, index) => (
              <div key={index} className="snack-item">
                <h4>{snack.name}</h4>
                <p className="calories">{snack.calories} kcal</p>
                <div className="macros">
                  <span>P: {snack.macros.protein}g</span>
                  <span>C: {snack.macros.carbs}g</span>
                  <span>F: {snack.macros.fat}g</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 