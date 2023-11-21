import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Form.css'

const App = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    phone: '',
  });
  const [obstacles, setObstacles] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState('');

  const nextStep = () => {
    if (step === 2 && !selectedGoal) {
      setError(true);
    } else {
      setStep((prevStep) => prevStep + 1);
      setError(false);
    }
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    // Redirect to the homepage or perform any other action
    console.log('Form submitted!');
  };

  const handleNextStepPersonalDetails = () => {
    const fname = document.getElementsByName('fname')[0].value;
    const lname = document.getElementsByName('lname')[0].value;
    const phone = document.getElementsByName('phone')[0].value;

    if (!fname || !lname || !phone) {
      setError(true);
    } else {
      setError(false);
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGoalSelection = (goal) => {
    setSelectedGoal(goal);
    setObstacles(getObstaclesForGoal(goal));
    setError(false);
  };

  const handleObstacleSelection = (obstacle) => {
    setSelectedGoal(obstacle);
  };

  const getObstaclesForGoal = (goal) => {
    switch (goal) {
      case 'Slim Down':
        return ['Food Cravings', 'Time Constraints', 'Conflicting Information'];
      case 'Bulk Up':
        return ['High-Calorie Intake', 'Limited Workout Time', 'Expensive Food Choices'];
      case 'Stay Fit':
        return ['Social Pressure', 'Lack of Support', 'Emotional Eating'];
      case 'Gain Muscle':
        return ['Physical Barriers', 'Conflicting Information', 'Food Cravings'];
      default:
        return [];
    }
  };

  return (
    <div className="form">
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <form id="msform" onSubmit={handleSubmit}>
            <ul id="progressbar">
              <li className={step === 1 ? 'active' : ''}>Personal Details</li>
              <li className={step === 2 ? 'active' : ''}>Choose Goals</li>
              <li className={step === 3 ? 'active' : ''}>Obstacles</li>
            </ul>
            {step === 1 && (
      <fieldset>
        <h2 className="fs-title">Personal Details</h2>
        <h3 className="fs-subtitle">Tell us something more about you</h3>
        {error && (
          <p style={{ color: 'red', fontSize: '12px', marginBottom: '10px' }}>
            Please fill in all fields!
          </p>
        )}
        <input
          type="text"
          name="fname"
          placeholder="First Name"
          value={formData.fname}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lname"
          placeholder="Last Name"
          value={formData.lname}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <input
          type="button"
          onClick={handleNextStepPersonalDetails}
          className="next action-button"
          value="Next"
        />
      </fieldset>
    )}

  {step === 2 && (
  <fieldset>
    <h2 className="fs-title">Choose Your Goal</h2>
    <h3 className="fs-subtitle">Select your fitness goal</h3>
    {error && <p style={{ color: 'red', fontSize: '12px', marginBottom: '10px' }}>Please select a goal!</p>}
    <button
      className={`goal-option ${selectedGoal === 'Bulk Up' ? 'selected' : ''}`}
      onClick={() => handleGoalSelection('Bulk Up')}
    >
      Bulk Up
    </button>
    <button
      className={`goal-option ${selectedGoal === 'Stay Fit' ? 'selected' : ''}`}
      onClick={() => handleGoalSelection('Stay Fit')}
    >
      Stay Fit
    </button>
    <button
      className={`goal-option ${selectedGoal === 'Slim Down' ? 'selected' : ''}`}
      onClick={() => handleGoalSelection('Slim Down')}
    >
      Slim Down
    </button>
    <button
      className={`goal-option ${selectedGoal === 'Gain Muscle' ? 'selected' : ''}`}
      onClick={() => handleGoalSelection('Gain Muscle')}
    >
      Gain Muscle
    </button>
    <input
      type="button"
      onClick={prevStep}
      className="previous action-button-previous"
      value="Previous"
    />
    <input
      type="button"
      onClick={nextStep}
      className="next action-button"
      value="Next"
    />
  </fieldset>
)}

{step === 3 && (
              <fieldset>
                <h2 className="fs-title">Weight Maintenance Hurdles</h2>
                <h3 className="fs-subtitle">Select all that apply</h3>
                <div className="goal-options">
                  {obstacles.map((obstacle, index) => (
                    <button
                      key={index}
                      className={`goal-option ${selectedGoal === obstacle ? 'selected' : ''}`}
                      onClick={() => handleObstacleSelection(obstacle)}
                    >
                      {obstacle}
                    </button>
                  ))}
                </div>
                <div>
                  <input
                    type="button"
                    onClick={prevStep}
                    className="previous action-button-previous"
                    value="Previous"
                  />
                  <input
                    type="button"
                    onClick={nextStep}
                    className="next action-button"
                    value="Submit"
                  />
                </div>
              </fieldset>
            )}

            {step === 4 && (
              /* Step 4 - Thank you message and submit button */
              <fieldset>
                <h2 className="fs-title">Thank You!</h2>
                <p className="fs-subtitle">Your form has been submitted successfully.</p>
                <div>
                  <Link className="action-button" to="/planner">Go to Home</Link>
                </div>
              </fieldset>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;