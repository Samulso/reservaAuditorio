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
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Email inválido";
    }
    return null;
  };

  const validateMatricula = (matricula) => {
    if (matricula.length < 4) {
      return "Matrícula deve ter pelo menos 4 dígitos";
    }
    if (!/^\d+$/.test(matricula)) {
      return "Matrícula deve conter apenas números";
    }
    return null;
  };

  const validateNome = (nome) => {
    if (nome.trim().length < 3) {
      return "Nome deve ter pelo menos 3 caracteres";
    }
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nome)) {
      return "Nome deve conter apenas letras";
    }
    return null;
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Senha deve ter pelo menos 6 caracteres";
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Senha deve conter pelo menos uma letra minúscula";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Senha deve conter pelo menos uma letra maiúscula";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Senha deve conter pelo menos um número";
    }
    return null;
  };

  const validateConfirmarSenha = (confirmarSenha, password) => {
    if (confirmarSenha !== password) {
      return "As senhas não coincidem";
    }
    return null;
  };

  const validateForm = () => {
    const newErrors = {};

    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;

    const matriculaError = validateMatricula(matricula);
    if (matriculaError) newErrors.matricula = matriculaError;

    const nomeError = validateNome(nome);
    if (nomeError) newErrors.nome = nomeError;

    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    const confirmarSenhaError = validateConfirmarSenha(confirmarSenha, password);
    if (confirmarSenhaError) newErrors.confirmarSenha = confirmarSenhaError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field, value) => {
    let error = null;
    
    switch (field) {
      case "email":
        error = validateEmail(value);
        break;
      case "matricula":
        error = validateMatricula(value);
        break;
      case "nome":
        error = validateNome(value);
        break;
      case "password":
        error = validatePassword(value);
        break;
      case "confirmarSenha":
        error = validateConfirmarSenha(value, password);
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          matricula,
          nome,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Cadastro realizado com sucesso!");
        
        setEmail("");
        setMatricula("");
        setNome("");
        setPassword("");
        setConfirmarSenha("");
        setErrors({});

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setErrors({ 
          submit: data.message || "Erro ao realizar cadastro. Tente novamente." 
        });
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setErrors({ 
        submit: "Erro de conexão. Verifique sua internet e tente novamente." 
      });
    } finally {
      setIsLoading(false);
    }
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

          {errors.submit && (
            <div className="error-message">
              {errors.submit}
            </div>
          )}

          <div className="inputs-label">
            <label>E-mail institucional</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => handleBlur("email", e.target.value)}
              autoComplete="off"
              required
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="inputs-label">
            <label>Matrícula</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              onBlur={(e) => handleBlur("matricula", e.target.value)}
              autoComplete="off"
              required
              className={errors.matricula ? "input-error" : ""}
            />
            {errors.matricula && <span className="error-text">{errors.matricula}</span>}
          </div>

          <div className="inputs-label">
            <label>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              onBlur={(e) => handleBlur("nome", e.target.value)}
              autoComplete="off"
              required
              className={errors.nome ? "input-error" : ""}
            />
            {errors.nome && <span className="error-text">{errors.nome}</span>}
          </div>

          <div className="inputs-label">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => handleBlur("password", e.target.value)}
              autoComplete="new-password"
              required
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="inputs-label">
            <label>Confirmar senha</label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              onBlur={(e) => handleBlur("confirmarSenha", e.target.value)}
              autoComplete="new-password"
              required
              className={errors.confirmarSenha ? "input-error" : ""}
            />
            {errors.confirmarSenha && <span className="error-text">{errors.confirmarSenha}</span>}
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
          disabled={isLoading}
        >
          {isLoading ? "Cadastrando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
}

export default Register;