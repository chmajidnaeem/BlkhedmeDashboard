import axios from 'axios';

export const loginAPI = async (credentials) => {
  try {
    const response = await axios.post('https://apiv2.blkhedme.com/api/admin/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Login failed';
  }
};