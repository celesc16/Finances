import axios from "axios"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

function LoginForm({ setAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Para redirigir después de iniciar sesión

  const handleLogin = async (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto de submit

    try {
      const response = await axios.post('http://localhost:8080/auth/login', { email, password });
      
      // Almacena el token en localStorage
      localStorage.setItem('token', response.data.token);
      
      // Actualiza el estado de autenticación en el componente padre
      setAuthenticated(true);

      // Redirige a la página principal después del login exitoso
      alert("Inicio de sesión exitoso");
      navigate('/'); // Redirige a la ruta principal

    } catch (error) {
      console.error('Error al iniciar sesión', error);
      alert('Error al iniciar sesión');
    }
  }

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleLogin}>
      <h2>Iniciar sesión</h2>
      
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      
      <div className="flex items-start mb-5">
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Iniciar sesión
        </button>
      </div>
      
      <div>
        <p>¿No tienes cuenta? <NavLink to="/register">Registrarse</NavLink></p>
      </div>
    </form>
  );
}

export default LoginForm;
