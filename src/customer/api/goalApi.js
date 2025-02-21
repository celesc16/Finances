import { API_BASE_URL } from "./apiConfig"
import axios from "axios"

//Crear una meta
export async function postGoal(goalData) {
    try{
        const response = await  axios.post(`${API_BASE_URL}/goals` , goalData);
        return response.data;
    }catch(error){
        console.error("Error creating goal" , error);
        throw error;
    }

}

//Elimminar una transaccion
export async function deleteGoal(id,goalData) {
    try{
        const response = await axios.post(`${API_BASE_URL}/goals/${id}` , goalData);
        return response.data;
    }catch(error){
        console.error("Error deleting goal" , error);
        throw error;
    }

}