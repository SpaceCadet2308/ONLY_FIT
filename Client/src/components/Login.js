import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import './Login.css';

import axios from "axios";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "https://fitness-tracker-final.vercel.app/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
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
    <div className="login-page">
      <div className="login-box">
        <h2>Login to Your Account</h2>
        <form action="POST" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
              style={{color:'black'}}
						/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
              style={{color:'black'}}
						/>
          </div>
          {error && <div>{error}</div>}
          <button type="submit" className="login-button">Login</button>
        </form>
        <br />
            <p style={{color: 'white'}}>OR</p>
            <br />

            <Link className="login-button" to="/signup">Signup</Link>
      </div>
    </div>
  );
};

export default Login;