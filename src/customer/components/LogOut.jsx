import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // Cierra la sesión
    navigate('/login'); // Redirige al login
  }, [logout, navigate]);

  return null; // No es necesario renderizar nada
}

export default Logout;