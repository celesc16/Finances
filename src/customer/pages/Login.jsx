import { useState } from "react"
import { NavLink } from "react-router-dom"
import { loginUser } from "../services/authService";
import { useAuth } from "../context/authContext";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Para obtener la funcion de login

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser({ email, password });
      login(token);  // Llamamos a login desde el contexto
    } catch (error) {
      alert('Error al iniciar sesión');
      console.log(error)
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-sm w-96">
        <h2 className="text-2xl font-bold mb-4 text-center" >Iniciar sesión</h2>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-lg font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              value={email}
              id="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-bla"
              placeholder="Correo electrónico"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="mb-5">
            <label className="block text-lg font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="flex items-start mb-5">
            <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-zinc-900 transition">
              Iniciar sesión
            </button>
          </div>
          
          <div>
            <p>¿No tienes cuenta? <NavLink to="/register" className="text-red-800 font-bold ">Registrarse</NavLink></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
