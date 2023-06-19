import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ logo }: any) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
  const userName = localStorage.getItem("user");

  const handleRedirect = () => {
    navigate("/home");
  };
  console.log(userName);

  return (
    <nav className="bg-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 ">
            {logo ? (
              <button className="text-white" onClick={handleRedirect}>
                volver
              </button>
            ) : (
              ""
            )}

            <h1 className="text-white">{logo}</h1>
          </div>

          {/* Menú hamburguesa */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={handleMenuToggle}
            >
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>

          {/* Nombre de usuario */}
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            <p className="text-white">{userName}</p>
          </div>
        </div>
      </div>

      {/* Menú desplegable en versión móvil */}
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          {/* Contenido del menú */}
          {/* ... */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
