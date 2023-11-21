import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import './Signup.css';

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "https://fitness-tracker-final.vercel.app/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

  return (
    <>
    <div className="signup-page">
      <div className="signup-box">
        <h2>Create Your Account</h2>
        <form action="POST" onSubmit={handleSubmit}>
        <div className="input-group">
            <label htmlFor="first-name">First Name</label>
            <input
              style={{color:'black'}}
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
						/>
          </div>
          <div className="input-group">
            <label htmlFor="last-name"> Last Name</label>
            <input
              style={{color:'black'}}
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
						/>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              style={{color:'black'}}
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
						/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
             style={{color:'black'}}
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
						/>
          </div>
          {error && <div>{error}</div>}
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Signup;