import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);
  const [agreement, setAgreement] = useState(false);

  const areAllFieldsFilled = () => {
    // Add your validation logic here
  }

  const handleCheck = (e) => {
    setAgreement(e.target.checked);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmptyFields([]);

    if (areAllFieldsFilled() === true) {
      if (password === confirmPassword) {
        console.log(email, firstName, lastName, password);
      } else {
        // Handle password mismatch error
      }
    }
  }

  return (
    <div className='user-signup-screen'>
      <div className="side-display">
        
        <label><strong>Create your account</strong></label>
        <h3>Already have an account? <Link to="/login">Log in</Link></h3>
        <form onSubmit={handleSubmit}>
          <h3 className='first-name'>First Name</h3>
          <input type="text" onChange={(e) => { setFirstName(e.target.value) }}
            value={firstName}
            className={emptyFields.includes('first-name') ? 'error' : ''} />

          <h3 className='last-name'>Last Name</h3>
          <input type="text" onChange={(e) => { setLastName(e.target.value) }}
            value={lastName}
            className={emptyFields.includes('last-name') ? 'error' : ''} />

          <h3 className='email'>Email</h3>
          <input type="text" onChange={(e) => { setEmail(e.target.value) }}
            value={email}
            className={emptyFields.includes('email') ? 'error' : ''} />

          <h3 className='password'>Password</h3>
          <input type="password" onChange={(e) => { setPassword(e.target.value) }}
            value={password}
            className={emptyFields.includes('password') ? 'error' : ''} />

          <h3 className='confirm-password'>Confirm Password</h3>
          <input type="password" onChange={(e) => { setConfirmPassword(e.target.value) }}
            value={confirmPassword}
            className={emptyFields.includes('confirm-password') ? 'error' : 'confirm-password'} />

          <input type="checkbox"
            value={agreement}
            onChange={handleCheck} />
          <label htmlFor="">
            I accept the <a href="/">Privacy Policy</a> and the <a href="/">Terms of Service</a></label> <br />
          
          <button disabled={!agreement} onClick={handleSubmit}>Sign up</button>
        </form>
      </div>
      <div className="main-display">
        {/* You can add content for the main display here */}
      </div>
    </div>
  );
};

export default SignUp;
