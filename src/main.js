import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import * as api from './js/pixabay-api';
import * as render from './js/render-functions';

const $searchForm = document.querySelector('#search-form');
const $loadMore = document.querySelector('#load-more');

let parsedWords = '';
let page = 1;

$searchForm.onsubmit = async event => {
  try {
    event.stopPropagation();
    event.preventDefault();

    page = 1;
    const data = new FormData(event.target);
    const search = data.get('search');
    parsedWords = search.trim().split(' ').join('+');

    if (!parsedWords) {
      iziToast.error({
        message: 'Please enter a search term!',
        position: 'topRight',
      });
      return;
    }

    render.clearGallery();
    render.showLoading();
    const { hits } = await api.search(parsedWords, page);

    if (hits?.length) { 
      render.renderImages(hits);
      $loadMore.hodden = false;
    } else {
      iziToast.error({ 
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight'
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    render.clearLoading();
  }
};


$loadMore.onclick = async () => {
  try {
    render.showLoading();

    page += 1;
    const { hits, totalHits } = await api.search(parsedWords, page);
    if (hits?.length) { 
      render.renderImages(hits);
      $loadMore.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    if (!api.isHasNextPage(page, totalHits)) {
      iziToast.info({ 
        message: 'We\'re sorry, but you\'ve reached the end of search results.',
        position: 'topRight'
      });
      $loadMore.hidden = true;
    }

  } catch (error) {
    console.error(error);
  } finally {
    render.clearLoading();
  }
}