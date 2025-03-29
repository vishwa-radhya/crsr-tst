import { useState } from 'react';
import { foodDatabase, categories } from '../../data/foodDatabase';
import './food-database.styles.scss';

const FoodDatabase = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredFoods = foodDatabase
    .filter(food => {
      const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
      const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'calories') return b.calories - a.calories;
      if (sortBy === 'protein') return b.protein - a.protein;
      if (sortBy === 'carbs') return b.carbs - a.carbs;
      if (sortBy === 'fat') return b.fat - a.fat;
      return 0;
    });

  return (
    <div className="food-database-container">
      <div className="food-database-header">
        <h2>Food Database</h2>
        <p>Browse our comprehensive collection of nutritious foods</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search foods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filters">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="calories">Sort by Calories</option>
            <option value="protein">Sort by Protein</option>
            <option value="carbs">Sort by Carbs</option>
            <option value="fat">Sort by Fat</option>
          </select>
        </div>
      </div>

      <div className="food-grid">
        {filteredFoods.map(food => (
          <div key={food.id} className="food-card">
            <div className="food-header">
              <h3>{food.name}</h3>
              <span className="category-tag">{food.category}</span>
            </div>
            
            <div className="nutrition-info">
              <div className="macro">
                <span className="label">Calories</span>
                <span className="value">{food.calories}</span>
              </div>
              <div className="macro">
                <span className="label">Protein</span>
                <span className="value">{food.protein}g</span>
              </div>
              <div className="macro">
                <span className="label">Carbs</span>
                <span className="value">{food.carbs}g</span>
              </div>
              <div className="macro">
                <span className="label">Fat</span>
                <span className="value">{food.fat}g</span>
              </div>
              <div className="macro">
                <span className="label">Fiber</span>
                <span className="value">{food.fiber}g</span>
              </div>
            </div>

            <div className="serving-size">
              Serving Size: {food.servingSize}
            </div>

            <div className="nutrients">
              <h4>Key Nutrients</h4>
              <ul>
                {Object.entries(food.nutrients).map(([nutrient, value]) => (
                  <li key={nutrient}>
                    <span className="nutrient-name">{nutrient}</span>
                    <span className="nutrient-value">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodDatabase; 