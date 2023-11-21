import React, { useEffect, useState } from 'react';
import './Recipe.css'

const ExerciseComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${searchTerm}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '6e013b5cb6msh4f54dcf1f64757bp1f2ed6jsn05c1e2e921a2',
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setExerciseData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div>
      <h1>Exercise Search:</h1>
      <div className="rsearch">
      <input
      className='rsearchbar'
        type="text"
        placeholder="Enter search term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="rsearch_button">
          <i className="fa fa-search"></i>
        </button>
        </div>
      <h2>Exercise List:</h2>
      <div className="exercise-cards">
        {Array.isArray(exerciseData) && exerciseData.length > 0 ? (
          exerciseData.map((exercise) => (
            <div key={exercise.id} className="exercise-card">
              <h3 style={{color: 'white'}}>{exercise.name}</h3>
              <img style={{borderRadius: '5px'}} src={exercise.gifUrl} alt={exercise.name} />
              <p>{exercise.description}</p>
              <h4>Target: {exercise.target}</h4>
              <p style={{color: 'white'}}>Equipment: {exercise.equipment}</p>
              <h4>Instructions:</h4>
              <ul>
                {exercise.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
            <></>
        )}
      </div>
    </div>
  );
};

export default ExerciseComponent;