import axios from 'axios';
const key = '35881269-5244fadfdfc6e51dbaa5f3ad4';

export const getImagesApi = async (searchName, page) => {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        q: searchName,
        page: page,
        key: key,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`No information on request ${searchName}`);
  }
};
