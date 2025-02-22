import axiosInstance from "./apiConfig"

//Obtener todas las transacciones
export async function getGoals() {
    try{
        const response = await axiosInstance.get('/goals');
        return response.data;
    } catch(error){
        console.error("Error fetching transaction: " , error);
        throw error;
    }
}

//Crear una nueva transaccion 
export async function postGoal(goalData) {
    try{
        const response = await axiosInstance.post('/goals', goalData);
        return response.data;
    } catch(error){
        console.error("Eerror creating transaction" , error);
        throw error;
    }
}

//Actualizar una transaccion existentes 
export async function updateGoal(id,goalData) {
    try{
        const response = await axiosInstance.put(`/goals/${id}`, goalData);
        return response.data;
    } catch(error){
        console.error("Eerror updating transaction" , error);
        throw error;
    }
}

//Eliminar una transaccion 
export async function deleteGoal(id, goalData) {
    try{
        const response = await axiosInstance.delete(`/goals/${id}`, goalData);
        return response.data;
    } catch(error){
        console.error("Error delete transaction" , error);
        throw error;
    }
}