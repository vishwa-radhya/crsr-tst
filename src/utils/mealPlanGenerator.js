import { foodDatabase } from '../data/foodDatabase';

// Helper function to calculate daily calorie needs
const calculateDailyCalories = (weight, height, age, gender, activityLevel, goal) => {
  // Basic BMR calculation using Mifflin-St Jeor Equation
  let bmr;
  if (gender === 'male') {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }

  // Activity level multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };

  let tdee = bmr * activityMultipliers[activityLevel];

  // Adjust calories based on goal
  switch (goal) {
    case 'weightLoss':
      tdee -= 500; // 500 calorie deficit
      break;
    case 'weightGain':
      tdee += 500; // 500 calorie surplus
      break;
    default:
      // maintenance
      break;
  }

  return Math.round(tdee);
};

// Helper function to calculate macro targets
const calculateMacroTargets = (dailyCalories, dietaryPreferences) => {
  let proteinPercentage, carbPercentage, fatPercentage;

  if (dietaryPreferences === 'keto') {
    proteinPercentage = 0.2;
    carbPercentage = 0.05;
    fatPercentage = 0.75;
  } else if (dietaryPreferences === 'paleo') {
    proteinPercentage = 0.3;
    carbPercentage = 0.4;
    fatPercentage = 0.3;
  } else if (dietaryPreferences === 'mediterranean') {
    proteinPercentage = 0.2;
    carbPercentage = 0.45;
    fatPercentage = 0.35;
  } else {
    // balanced diet
    proteinPercentage = 0.25;
    carbPercentage = 0.45;
    fatPercentage = 0.3;
  }

  return {
    protein: Math.round((dailyCalories * proteinPercentage) / 4),
    carbs: Math.round((dailyCalories * carbPercentage) / 4),
    fat: Math.round((dailyCalories * fatPercentage) / 9)
  };
};

// Helper function to select foods based on category and preferences
const selectFoods = (category, count, excludedFoods = []) => {
  const availableFoods = foodDatabase
    .filter(food => food.category === category && !excludedFoods.includes(food.name))
    .sort(() => Math.random() - 0.5);

  return availableFoods.slice(0, count);
};

// Generate a single day's meal plan
const generateDayPlan = (dailyCalories, macroTargets, dietaryPreferences, excludedFoods) => {
  const meals = {
    breakfast: { foods: [], calories: 0, macros: { protein: 0, carbs: 0, fat: 0 } },
    lunch: { foods: [], calories: 0, macros: { protein: 0, carbs: 0, fat: 0 } },
    dinner: { foods: [], calories: 0, macros: { protein: 0, carbs: 0, fat: 0 } },
    snacks: { foods: [], calories: 0, macros: { protein: 0, carbs: 0, fat: 0 } }
  };

  // Breakfast (30% of daily calories)
  const breakfastCalories = dailyCalories * 0.3;
  const breakfastFoods = [
    ...selectFoods('Grains', 1, excludedFoods),
    ...selectFoods('Protein', 1, excludedFoods),
    ...selectFoods('Fruits', 1, excludedFoods)
  ];
  meals.breakfast.foods = breakfastFoods;
  meals.breakfast.calories = breakfastFoods.reduce((sum, food) => sum + food.calories, 0);
  meals.breakfast.macros = breakfastFoods.reduce((macros, food) => ({
    protein: macros.protein + food.protein,
    carbs: macros.carbs + food.carbs,
    fat: macros.fat + food.fat
  }), { protein: 0, carbs: 0, fat: 0 });

  // Lunch (35% of daily calories)
  const lunchCalories = dailyCalories * 0.35;
  const lunchFoods = [
    ...selectFoods('Protein', 1, excludedFoods),
    ...selectFoods('Grains', 1, excludedFoods),
    ...selectFoods('Vegetables', 2, excludedFoods)
  ];
  meals.lunch.foods = lunchFoods;
  meals.lunch.calories = lunchFoods.reduce((sum, food) => sum + food.calories, 0);
  meals.lunch.macros = lunchFoods.reduce((macros, food) => ({
    protein: macros.protein + food.protein,
    carbs: macros.carbs + food.carbs,
    fat: macros.fat + food.fat
  }), { protein: 0, carbs: 0, fat: 0 });

  // Dinner (35% of daily calories)
  const dinnerCalories = dailyCalories * 0.35;
  const dinnerFoods = [
    ...selectFoods('Protein', 1, excludedFoods),
    ...selectFoods('Grains', 1, excludedFoods),
    ...selectFoods('Vegetables', 2, excludedFoods)
  ];
  meals.dinner.foods = dinnerFoods;
  meals.dinner.calories = dinnerFoods.reduce((sum, food) => sum + food.calories, 0);
  meals.dinner.macros = dinnerFoods.reduce((macros, food) => ({
    protein: macros.protein + food.protein,
    carbs: macros.carbs + food.carbs,
    fat: macros.fat + food.fat
  }), { protein: 0, carbs: 0, fat: 0 });

  // Snacks (remaining calories)
  const remainingCalories = dailyCalories - (meals.breakfast.calories + meals.lunch.calories + meals.dinner.calories);
  const snackFoods = [
    ...selectFoods('Fruits', 1, excludedFoods),
    ...selectFoods('Nuts', 1, excludedFoods)
  ];
  meals.snacks.foods = snackFoods;
  meals.snacks.calories = snackFoods.reduce((sum, food) => sum + food.calories, 0);
  meals.snacks.macros = snackFoods.reduce((macros, food) => ({
    protein: macros.protein + food.protein,
    carbs: macros.carbs + food.carbs,
    fat: macros.fat + food.fat
  }), { protein: 0, carbs: 0, fat: 0 });

  return meals;
};

// Main function to generate a weekly meal plan
export const generateWeeklyMealPlan = (healthData) => {
  const {
    weight,
    height,
    age,
    gender,
    activityLevel,
    goal,
    dietaryPreferences,
    excludedFoods = []
  } = healthData;

  const dailyCalories = calculateDailyCalories(weight, height, age, gender, activityLevel, goal);
  const macroTargets = calculateMacroTargets(dailyCalories, dietaryPreferences);

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const weeklyPlan = {};

  weekDays.forEach(day => {
    weeklyPlan[day] = generateDayPlan(dailyCalories, macroTargets, dietaryPreferences, excludedFoods);
  });

  return {
    dailyCalories,
    macroTargets,
    weeklyPlan
  };
}; 