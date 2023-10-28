import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../FormInput/FormInput";
import "./SignUpForm.css";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
      alert("User created successfully.");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use.");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email.");
      } else if (error.code === "auth/weak-password") {
        alert("Weak password.");
      } else {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2 className="sign-up-text">Sign up</h2>
      <div class="squiggly-line">
        <svg width="200" height="10" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,5 Q20,0 40,5 Q60,10 80,5 Q100,0 120,5 Q140,10 160,5 Q180,0 200,5"
            fill="none"
            stroke="black"
            stroke-width="2"
          />
        </svg>
      </div>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <button type="submit" className="btn btn-light">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
