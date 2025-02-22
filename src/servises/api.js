import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://pixabay.com/';

export const fetchImages = async configParams => {
  try {
    const { data } = await axios.get('api/', {
      params: {
        image_type: 'photo',
        q: '',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 12,
        key: '42078504-06c0bc861c70afe486d8727f6',
        ...configParams,
      },
    });
    return data;
  } catch (error) {
    toast.error(`${error.message}`);
  }
};
