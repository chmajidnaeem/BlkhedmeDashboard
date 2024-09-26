import axios from 'axios';

export const fetchProviders = async () => {
  try {
    const response = await axios.get('https://apiv2.blkhedme.com/api/admin/login');
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Failed to fetch providers';
  }
};