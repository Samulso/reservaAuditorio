import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import logo from "../assets/img/senac-logo.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Senac" />

      <div className="title-linha">
        <h2>Acesso ao Ambiente Virtual</h2>
        <div className="linha"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form">
          <div className="inputs-label">
            <label>Email institucional:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="inputs-label">
            <label>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="register-field">
          <h3>Não possui uma conta?</h3>
          <Link to="/register" className="sublinhado">
            Registre-se
          </Link>
        </div>

        <button className="button-1" type="submit">Login</button>
        
        <Link to={"/SplashScreen"}>SplashScreen</Link>
      </form>
    </div>
  );
}

export default Login;
