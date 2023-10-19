import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithGooglePopup,
  logInAuthUserWithEmailAndPassword,
} from "../utils/firebase/firebase.utils";
import FormInput from "./FormInput";
import GoogleLogo from "./../assets/google.svg";

const defaultFormFields = {
  email: "",
  password: "",
};
import "./styles/LogInForm.css";

const LogInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await logInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-login-credentials") {
        alert("Invalid credentials.");
      }
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="log-in-container">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <button type="submit" className="btn btn-light">
            Log In
          </button>
          <p>OR</p>
          <button
            type="button"
            onClick={signInWithGoogle}
            className="btn btn-light"
          >
            <img src={GoogleLogo} alt="Google Logo" className="google-logo" />
            Sign In With Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogInForm;
