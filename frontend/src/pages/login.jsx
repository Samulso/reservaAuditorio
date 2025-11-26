import { useState } from "react";
import "../styles/login.css";

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
            <img src="../src/assets/img/senac-logo.jpg" alt="" />
            <div className="title-linha">
                <h2>Acesso ao Ambiente Virtual</h2>
                <div className="linha"></div>
            </div>


            <form onSubmit={handleSubmit}>
                <div className="form">
                    <div className="inputs-label">
                        <div>
                            <label htmlFor="email">Email institucional:</label>
                            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                    </div>
                    <div className="inputs-label">
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    </div>
                </div>



                <div className="register-field">
                    <h3>Não possui uma conta? </h3> <a className="sublinhado"href="/register">Registre-se</a>
                </div>

                <button className="button-1" type="submit">Login</button>
            </form>
        </div>  
    );
}

export default Login;