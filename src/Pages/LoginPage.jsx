import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = (e) =>{
    e.preventDefault();
    setEmptyFields([]);

    // You can add your login logic here
  }

  return (
    <div className='user-login-screen'>
      <div className="side-display">
        {/* Add your logo here */}
        <label><strong>Log in to your account</strong></label>
        <h3>Don't have an account? <Link to="/SignUp">Sign Up</Link></h3>
        <form onSubmit={handleSubmit}>
          <h2 className='email'>email</h2>
          <input type="text" onChange={(e)=>{setEmail(e.target.value)}} value={email} 
          className={emptyFields.includes('email') ? 'error': '' }/>

          <h2 className='password'>password</h2>
          <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password}
          className={emptyFields.includes('password') ? 'error': ''} /> <br />

          <h3>Forgot your password? Click <a href="/">Here</a></h3> <br />

          <button>Login</button>
        </form>
      </div>
      <div className="main-display">
        {/* You can add content for the main display here */}
      </div>
    </div>
  );
};

export default LoginPage;
