import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithGooglePopup,
  logInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../FormInput/FormInput";
import GoogleLogo from "../../assets/google.svg";
import "./LogInForm.css";

const defaultFormFields = {
  email: "",
  password: "",
};

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
      <h2 className="login-text">Log In</h2>
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
