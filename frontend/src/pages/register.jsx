import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import logo from "../assets/img/senac-logo.jpg";

function Register() {
  const [email, setEmail] = useState("");
  const [matricula, setMatricula] = useState("");
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, matricula, nome, password, confirmarSenha);
  };

  return (
    <div className="login-container">
      <img src={logo} alt="" />

      <div className="title-linha">
        <h2>Acesso ao Ambiente Virtual</h2>
        <div className="linha"></div>
      </div>

      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="form">

          <div className="inputs-label">
            <label>E-mail institucional</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div className="inputs-label">
            <label>Matrícula</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div className="inputs-label">
            <label>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div className="inputs-label">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="inputs-label">
            <label>Confirmar senha</label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

        </div>

        <div className="register-field">
          <h3>Já tem uma conta?</h3>
          <Link to="/" className="sublinhado">
            Entre.
          </Link>
        </div>

        <button className="button-1" type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;