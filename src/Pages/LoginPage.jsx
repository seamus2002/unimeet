import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

const LoginPage = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={logGoogleUser}>Log in with Google</button>
    </div>
  );
};

export default LoginPage;
