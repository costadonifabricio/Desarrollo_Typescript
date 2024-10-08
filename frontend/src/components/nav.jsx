import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import "../../public/nav.css";

function Nav() {
  const { logout, userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Deseas cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/login");
      }
    });
  };

  return (
    <nav className="nav-bar">
      {userRole === "administrador" && (
        <>
          <button onClick={() => navigate("/user-panel")}>
            Panel de Usuarios
          </button>
          <button onClick={() => navigate("/equipos")}>Panel de Equipos</button>
          <button onClick={() => navigate("/company")}>Crear Organizacion/Proveedor</button>
        </>
      )}
      {userRole === "gestor de inventario" && (
        <button onClick={() => navigate("/equipos")}>Panel de Equipos</button>
      )}
      {userRole === "tecnico" && (
        <button onClick={() => navigate("/tecnico-panel")}>
          Panel de Técnico
        </button>
      )}
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </nav>
  );
}

export default Nav;
