
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext"; // Importa el contexto de autenticación
import { deleteGoal, getGoals, postGoal, updateGoal } from "../api/goalApi"; 

export function useGoal() {
  const [data, setData] = useState([]); // Estado para almacenar los datos de la API
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const { logout } = useAuth(); // Usa la función logout del contexto de autenticación

  //Funcion para cargar todas las transacciones
  const fetchDataGoals = async () => {
    try {
      const allTransactions = await getGoals();
      console.log("Datos de la API: " , allTransactions)
      setData(allTransactions); // Guarda los datos en el estado
    } catch (error) {
      if (error.response && error.response.status === 403) {
        logout(); 
      } else {
        setError(error); 
      }
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  //Funcion para crear una transaccion 

  const createGoal = async (goalData) => {
    try{
      const newgoal = await postGoal(goalData);
      setData((prevData) => [...prevData , newgoal]) //Agrega la nueva transaccion al estado 
    } catch(error) {
      if (error.response && error.response.status === 403) {
        // Si el error es 403 (Forbidden), cierra la sesión del usuario
        logout();
      } else {
        setError(error); 
      }
    }
  }

  //funcion para eliminar la transaccion 
  const handleDeleteGoal = async (id) => {
    try{
      await deleteGoal(id);
      setData((prevData) => prevData.filter((Goal) => Goal.id !== id));
    }catch (error){
      if (error.response && error.response.status === 403) {
        // Si el error es 403 (Forbidden), cierra la sesión del usuario
        logout();
      } else {
        setError(error); // Maneja otros errores
      }
    } 
  };

  //Funcion para actualizar transaccion 
  
  const handleUpdateGoal = async (id , Goal) => {
    try {
      const updatedGoal = await updateGoal(id, Goal); // Llamada a la API
      setData((prevData) =>
        prevData.map((t) => (t.id === id ? updatedGoal : t)) // Reemplazar la transacción actualizada
      );
    } catch (error) {
      if (error.response && error.response.status === 403) {
        logout();
      } else {
        setError(error);
      }
    }
  };

  // Cargar las transacciones al montar el componente
  useEffect(() => {
    fetchDataGoals();
  }, []);

  return {
    data,
    loading,
    error,
    fetchDataGoals,
    createGoal,
    handleDeleteGoal, 
    handleUpdateGoal,
  };
}