import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LogInForm from "../../components/LogInForm/LogInForm";
import "./AuthPage.css";

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
