import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const baseUrl = 'https://pixabay.com/api/';
const key = '46672316-334fc4a904d955c3d11f52bb4';
const imageType = 'photo';
const safesearch = true;
const orientation = 'horizontal';
const perPage = 'horizontal';

export const search = async (words, page = 1) => {
  try {
    const params = new URLSearchParams({
      key,
      safesearch,
      orientation,
      q: words,
      image_type: imageType,
      per_page: perPage,
      page: page,
    });

    const { data } = await axios.get(`${baseUrl}?${params.toString()}`);
    
    return data.hits;
  } catch (error) {
    console.error(`Serch is failed with words: "${words}"`, error);
  }
};
