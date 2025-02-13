import axios from 'axios';

const API_URL = "http://localhost:8080/api/auth/";

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}register`, userData);
  return response.data.token;  
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}login`, credentials);
  return response.data.token;
};
