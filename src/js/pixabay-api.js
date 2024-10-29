import axios from 'axios';

const baseUrl = 'https://pixabay.com/api/';
const key = '46672316-334fc4a904d955c3d11f52bb4';
const imageType = 'photo';
const safesearch = true;
const orientation = 'horizontal';
const perPage = 15;

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
    return data;
  } catch (error) {
    console.error(`Search failed with words: "${words}"`, error);
  }
};

export function isHasNextPage(totalHits, currentPage) {
  const totalPages = Math.ceil(totalHits / perPage)
  return currentPage !== totalPages;
}