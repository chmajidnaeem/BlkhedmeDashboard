import axios from 'axios';

const API_URL = 'https://apiv2.blkhedme.com/api/admin/locations';

export const fetchLocations = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
