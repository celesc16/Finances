import { useState }  from 'react';
import  { registerUser } from "../services/authService"
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName ] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica en el frontend
    if (!name || !email || !password) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      await registerUser({ name, email, password });
      navigate('/login', { state: { message: 'Registro exitoso. Por favor inicia sesión.' } });
    } catch (error) {
      alert('Error al registrar');
      console.log(error)
    }
  };

  return(
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-sm w-96">
        <h2 className="text-2xl font-bold mb-4 text-center" > Registro de seccion </h2>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          
          <div className="mb-5">
            <label className="block text-lg font-medium text-gray-700">Nombre</label>
            <input
              type="name"
              id="name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label className="block text-lg font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Correo electrónico"
              value={email}
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
              Registro de Seccion
            </button>
          </div>
        </form>
      </div>
    </div>
  )

}

export default Register


