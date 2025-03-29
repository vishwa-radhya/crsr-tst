import React, { useState } from 'react';
import './MealPlan.scss';

const MealPlan = ({ mealPlan }) => {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const renderMeal = (meal, mealName) => (
    <div className="meal-card">
      <h3>{mealName}</h3>
      <div className="food-list">
        {meal.foods.map((food, index) => (
          <div key={index} className="food-item">
            <span className="food-name">{food.name}</span>
            <span className="serving-size">{food.servingSize}</span>
          </div>
        ))}
      </div>
      <div className="nutrition-info">
        <div className="calories">Calories: {Math.round(meal.calories)}</div>
        <div className="macros">
          <span>Protein: {Math.round(meal.macros.protein)}g</span>
          <span>Carbs: {Math.round(meal.macros.carbs)}g</span>
          <span>Fat: {Math.round(meal.macros.fat)}g</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="meal-plan">
      <div className="meal-plan-header">
        <h2>Your Weekly Meal Plan</h2>
        <div className="daily-targets">
          <div className="target">
            <span className="label">Daily Calories:</span>
            <span className="value">{mealPlan.dailyCalories}</span>
          </div>
          <div className="target">
            <span className="label">Protein Target:</span>
            <span className="value">{mealPlan.macroTargets.protein}g</span>
          </div>
          <div className="target">
            <span className="label">Carbs Target:</span>
            <span className="value">{mealPlan.macroTargets.carbs}g</span>
          </div>
          <div className="target">
            <span className="label">Fat Target:</span>
            <span className="value">{mealPlan.macroTargets.fat}g</span>
          </div>
        </div>
      </div>

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

      <div className="daily-meals">
        {renderMeal(mealPlan.weeklyPlan[selectedDay].breakfast, 'Breakfast')}
        {renderMeal(mealPlan.weeklyPlan[selectedDay].lunch, 'Lunch')}
        {renderMeal(mealPlan.weeklyPlan[selectedDay].dinner, 'Dinner')}
        {renderMeal(mealPlan.weeklyPlan[selectedDay].snacks, 'Snacks')}
      </div>
    </div>
  );
};

export default MealPlan; 