import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodTracker = () => {
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');

  useEffect(() => {
    // Fetch all food entries
    axios.get('https://fitness-tracker-final.vercel.app/food/all')
      .then(response => setFoods(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddFood = () => {
    // Add a new food entry
    axios.post('https://fitness-tracker-final.vercel.app/food/add', { name, calories })
      .then(response => {
        setFoods([...foods, response.data]);
        setName('');
        setCalories('');
      })
      .catch(error => console.error(error));
  };

  const handleDeleteFood = (id) => {
    // Delete a food entry
    axios.delete(`https://fitness-tracker-final.vercel.app/food/delete/${id}`)
      .then(() => {
        const updatedFoods = foods.filter(food => food._id !== id);
        setFoods(updatedFoods);
      })
      .catch(error => console.error(error));
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#1e1e1e', color: '#fff', margin: 0, padding: 0 }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ color: '#ff8c00' }}>Calorie Tracker</h1>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#ff8c00' }}>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ color: 'black', width: '100%', padding: '8px', marginBottom: '16px', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#ff8c00' }}>Calories: </label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            style={{ color: 'black', width: '100%', padding: '8px', marginBottom: '16px', boxSizing: 'border-box' }}
          />
        </div>
        <button
          onClick={handleAddFood}
          style={{ borderRadius: '5px', backgroundColor: '#ff8c00', color: '#fff', padding: '10px', border: 'none', cursor: 'pointer' }}
        >
          Add Food
        </button>

        <h2 style={{ color: '#ff8c00', marginTop: '20px' }}>Food List</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #fff', padding: '8px', textAlign: 'left' }}>Name</th>
              <th style={{ borderBottom: '1px solid #fff', padding: '8px', textAlign: 'left' }}>Calories</th>
              <th style={{ borderBottom: '1px solid #fff', padding: '8px', textAlign: 'left' }}>Date</th>
              <th style={{ borderBottom: '1px solid #fff', padding: '8px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map(food => (
              <tr key={food._id} style={{ borderBottom: '1px solid #fff', marginBottom: '8px' }}>
                <td style={{ padding: '8px' }}>{food.name}</td>
                <td style={{ padding: '8px' }}>{food.calories}</td>
                <td style={{ padding: '8px' }}>{new Date(food.date).toLocaleDateString()}</td>
                <td style={{ padding: '8px' }}>
                  <button
                    onClick={() => handleDeleteFood(food._id)}
                    style={{ backgroundColor: 'red', color: '#fff', padding: '5px', border: 'none', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodTracker;
