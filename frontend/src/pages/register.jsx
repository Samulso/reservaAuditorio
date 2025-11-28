import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import logo from "../assets/img/senac-logo.jpg";

function Register() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [matricula, setMatricula] = useState("");
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    // Validação do email institucional
    if (!email.endsWith("@edu.df.senac.br")) {
      newErrors.email = "Use apenas email institucional @edu.df.senac.br";
    }

    // Validação da senha
    if (password !== confirmarSenha) {
      newErrors.confirmarSenha = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMatriculaChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setMatricula(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    
    if (!validateForm()) {
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    const emailExists = users.find(user => user.email === email);
    if (emailExists) {
      setErrors({ email: "Email já cadastrado" });
      return;
    }

    const matriculaExists = users.find(user => user.matricula === matricula);
    if (matriculaExists) {
      setErrors({ matricula: "Matrícula já cadastrada" });
      return;
    }

    const newUser = {
      id: Date.now(),
      email,
      matricula,
      nome,
      password,
      tipoConta: "colaborador",
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    console.log("Usuário cadastrado:", newUser);
    console.log("Todos os usuários:", users);

    setSuccessMessage("Cadastro realizado!");
    
    setEmail("");
    setMatricula("");
    setNome("");
    setPassword("");
    setConfirmarSenha("");
    setErrors({});

    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo Senac" />

      <div className="title-linha">
        <h2>Acesso ao Ambiente Virtual</h2>
        <div className="linha"></div>
      </div>

      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="form">

          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}

          <div className="inputs-label">
            <label>E-mail institucional</label>
            <div className="input-wrapper">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                required
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && (
                <div style={{color: 'red', fontSize: '12px', marginTop: '4px'}}>
                  {errors.email}
                </div>
              )}
            </div>
          </div>

          <div className="inputs-label">
            <label>Matrícula</label>
            <div className="input-wrapper">
              <input
                type="text"
                inputMode="numeric"
                value={matricula}
                onChange={handleMatriculaChange}
                autoComplete="off"
                required
                className={errors.matricula ? "input-error" : ""}
              />
              {errors.matricula && (
                <div style={{color: 'red', fontSize: '12px', marginTop: '4px'}}>
                  {errors.matricula}
                </div>
              )}
            </div>
          </div>

          <div className="inputs-label">
            <label>Nome</label>
            <div className="input-wrapper">
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                autoComplete="off"
                required
                className={errors.nome ? "input-error" : ""}
              />
            </div>
          </div>

          <div className="inputs-label">
            <label>Senha</label>
            <div className="input-wrapper">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                className={errors.password ? "input-error" : ""}
              />
            </div>
          </div>

          <div className="inputs-label">
            <label>Confirmar senha</label>
            <div className="input-wrapper">
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                autoComplete="new-password"
                required
                className={errors.confirmarSenha ? "input-error" : ""}
              />
              {errors.confirmarSenha && (
                <div style={{color: 'red', fontSize: '12px', marginTop: '4px'}}>
                  {errors.confirmarSenha}
                </div>
              )}
            </div>
          </div>

        </div>

        <div className="register-field">
          <h3>Já tem uma conta?</h3>
          <Link to="/" className="sublinhado">
            Entre.
          </Link>
        </div>

        <button 
          className="button-1" 
          type="submit"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}

export default Register;