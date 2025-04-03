import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-4">
            <img 
              src="/assets/459B98C2-FCA3-4E46-99BE-1104584562B1_1_102_o.jpeg" 
              alt="Transist Logo" 
              className="h-16 w-16 object-cover rounded-full"
            />
            <span className="text-3xl font-bold text-gray-900">Transist</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink 
              to="/"
              className={({ isActive }) => 
                `text-gray-700 hover:text-primary transition ${isActive ? 'text-primary' : ''}`
              }
            >
              Hem
            </NavLink>
            <NavLink 
              to="/tjanster"
              className={({ isActive }) => 
                `text-gray-700 hover:text-primary transition ${isActive ? 'text-primary' : ''}`
              }
            >
              Tjänster
            </NavLink>
            <NavLink 
              to="/om-oss"
              className={({ isActive }) => 
                `text-gray-700 hover:text-primary transition ${isActive ? 'text-primary' : ''}`
              }
            >
              Om Oss
            </NavLink>
            <NavLink 
              to="/kontakt"
              className={({ isActive }) => 
                `text-gray-700 hover:text-primary transition ${isActive ? 'text-primary' : ''}`
              }
            >
              Kontakt
            </NavLink>
            <NavLink 
              to="/boka"
              className={({ isActive }) => 
                `text-gray-700 hover:text-primary transition ${isActive ? 'text-primary' : ''}`
              }
            >
              Boka
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary transition"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <NavLink 
                to="/"
                className={({ isActive }) => 
                  `text-gray-700 hover:text-primary transition ${isActive ? 'text-primary' : ''}`
                }
                onClick={() => setIsOpen(false)}
              >
                Hem
              </NavLink>
              <NavLink 
                to="/tjanster"
                className={({ isActive }) => 
                  `text-gray-700 hover:text-primary transition ${isActive ? 'text-primary' : ''}`
                }
                onClick={() => setIsOpen(false)}
              >
                Tjänster
              </NavLink>
              <NavLink 
                to="/om-oss"
                className={({ isActive }) => 
                  `text-gray-700 hover:text-primary transition ${isActive ? 'text-primary' : ''}`
                }
                onClick={() => setIsOpen(false)}
              >
                Om Oss
              </NavLink>
              <NavLink 
                to="/kontakt"
                className={({ isActive }) => 
                  `text-gray-700 hover:text-primary transition ${isActive ? 'text-primary' : ''}`
                }
                onClick={() => setIsOpen(false)}
              >
                Kontakt
              </NavLink>
              <NavLink 
                to="/boka"
                className={({ isActive }) => 
                  `text-gray-700 hover:text-primary transition ${isActive ? 'text-primary' : ''}`
                }
                onClick={() => setIsOpen(false)}
              >
                Boka
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;