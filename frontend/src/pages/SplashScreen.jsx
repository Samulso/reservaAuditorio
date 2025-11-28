import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SplashScreen.css";

// SPLASHSCREEN DO FUNCIONARIO - DOCENTE

function SplashScreen() {
  const [activeTab, setActiveTab] = useState("aba1");

  const tabClicked = (abaId) => {
    setActiveTab(abaId);
  };

  return (
    <div className="field">
      <div className="container" id="container">
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === "aba1" ? "active" : ""}`}
            onClick={() => tabClicked("aba1")}
          >
            Quadro de Reservas
          </button>
          <button
            className={`tab-btn ${activeTab === "aba2" ? "active" : ""}`}
            onClick={() => tabClicked("aba2")}
          >
            Histórico de Reservas
          </button>
          <button
            className={`tab-btn ${activeTab === "aba3" ? "active" : ""}`}
            onClick={() => tabClicked("aba3")}
          >
            Próximas Reservas
          </button>
          <button
            className={`tab-btn ${activeTab === "aba4" ? "active" : ""}`}
            onClick={() => tabClicked("aba4")}
          >
            Perfil
          </button>
        </div>

        <div className="tab-contents">
          <div
            className={`content ${activeTab === "aba1" ? "show" : ""}`}
            id="aba1"
          >
            <ul className="proximas-reservas">
              <li className="reserva-confirmada">
                <div className="left-content">
                  <div className="top">
                    <h1>Nome apresentação</h1>
                    <h2>Nome funcionário</h2>
                  </div>
                  <div className="bottom">
                    <h3>Curso</h3>
                    <h3>Cód. Curso</h3>
                  </div>
                </div>
                <div className="right-content">
                  <div className="top">
                    <h3>XX/XX/XXXX</h3>
                    <h3>00:00 - 00:00</h3>
                  </div>
                  <div className="bottom">
                    <div className="status">
                      <h2>Confirmado</h2>
                      <div className="status-circle"></div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div
            className={`content ${activeTab === "aba2" ? "show" : ""}`}
            id="aba2"
          ></div>

          <div
            className={`content ${activeTab === "aba3" ? "show" : ""}`}
            id="aba3"
          ></div>

          <div
            className={`content ${activeTab === "aba4" ? "show" : ""}`}
            id="aba4"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
