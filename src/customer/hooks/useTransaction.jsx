import { useEffect, useState } from "react";
import { deleteTransaction, getTransactions, postTransaction, updateTransaction } from "../api/transactionApi";
import { useAuth } from "../context/authContext"; // Importa el contexto de autenticación

export function useTransactions() {
  const [data, setData] = useState([]); // Estado para almacenar los datos de la API
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const { logout } = useAuth(); // Usa la función logout del contexto de autenticación

  //Funcion para cargar todas las transacciones
  const fetchDataTransactions = async () => {
    try {
      const allTransactions = await getTransactions();
      console.log("Datos de la API: " , allTransactions)
      setData(allTransactions); // Guarda los datos en el estado
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Si el error es 403 (Forbidden), cierra la sesión del usuario
        logout();
      } else {
        setError(error); // Maneja otros errores
      }
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  //Funcion para crear una transaccion 

  const createTransaction = async (transactionData) => {
    try{
      const newTransaction = await postTransaction(transactionData);
      setData((prevData) => [...prevData , newTransaction]) //Agrega la nueva transaccion al estado 
    } catch(error) {
      if (error.response && error.response.status === 403) {
        // Si el error es 403 (Forbidden), cierra la sesión del usuario
        logout();
      } else {
        setError(error); // Maneja otros errores
      }
    }
  }

  //funcion para eliminar la transaccion 
  const handleDeleteTransaction = async (id) => {
    try{
      await deleteTransaction(id);
      setData((prevData) => prevData.filter((Transaction) => Transaction.id !== id));
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
  
  const handleUpdateTransaction = async (id , transaction) => {
    try {
      const updatedTransaction = await updateTransaction(id, transaction); // Llamada a la API
      setData((prevData) =>
        prevData.map((t) => (t.id === id ? updatedTransaction : t)) // Reemplazar la transacción actualizada
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
    fetchDataTransactions();
  }, []);

  return {
    data,
    loading,
    error,
    fetchDataTransactions,
    createTransaction,
    handleDeleteTransaction, 
    handleUpdateTransaction,
  };
}