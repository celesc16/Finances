import axiosInstance from "./apiConfig"

//Obtener todas las transacciones
export async function getTransactions() {
    try{
        const response = await axiosInstance.get('/transactions');
        return response.data;
    } catch(error){
        console.error("Error fetching transaction: " , error);
        throw error;
    }
}

//Crear una nueva transaccion 
export async function postTransaction(transactionData) {
    try{
        const response = await axiosInstance.post('/transactions', transactionData);
        return response.data;
    } catch(error){
        console.error("Eerror creating transaction" , error);
        throw error;
    }
}

//Actualizar una transaccion existentes 
export async function updateTransaction(id,transactionData) {
    try{
        const response = await axiosInstance.put(`/transactions/${id}`, transactionData);
        return response.data;
    } catch(error){
        console.error("Eerror updating transaction" , error);
        throw error;
    }
}

//Eliminar una transaccion 
export async function deleteTransaction(id, transactionData) {
    try{
        const response = await axiosInstance.delete(`/transactions/${id}`, transactionData);
        return response.data;
    } catch(error){
        console.error("Error delete transaction" , error);
        throw error;
    }
}