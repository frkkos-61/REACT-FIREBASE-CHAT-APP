import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const LoginPage = () => {
  //*Butona tıklanınca

  const handleClick = () => {
    //*google ile oturum aç
    signInWithPopup(auth, provider).catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="login">
        <h1>Chat Odası</h1>
        <h3>Devam etmek için Giriş Yapın</h3>

        <button onClick={handleClick}>
          <img src="/logo.jpg" alt="google logo" width={30} />
          <span>Google ile Gir</span>
        </button>
      </div>
    </div>
  );
};
export default LoginPage;
