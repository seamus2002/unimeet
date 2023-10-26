import SignUpForm from "../components/SignUpForm";
import LogInForm from "../components/LogInForm";
import "./styles/AuthPage.css";

const AuthPage = () => {
  return (
    <div className="page-container">
      <div className="auth-container">
        <LogInForm />
        <SignUpForm />
      </div>
    </div>
  );
};

export default AuthPage;
