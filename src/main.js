import * as api from './js/pixabay-api';
import * as render from './js/render-functions';

const $searchForm = document.querySelector('#search-form');
const $loadMore = document.querySelector('#load-more');
const $loadText = document.querySelector('#load-text');
let parsedWords = '';
let page = 1;

$searchForm.onsubmit = async event => {
  try {
    event.stopPropagation();
    event.preventDefault();

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

    render.showLoading();
    const images = await api.search(parsedWords, page);

    if (images.length) { 
      render.renderImages(images);
      hiddenButtonLoadMore(false);
    }

    if (!images.length) {
      iziToast.error({ 
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight'
      });

      render.clearLoading();
    }
  } catch (error) {
    console.error(error);
  }
};


$loadMore.onclick = async () => {
  try {
    hiddenButtonLoadMore(true);
    $loadText.hidden = false

    page += 1;
    const images = await api.search(parsedWords, page);
    if (images) { 
      render.renderImages(images, false);
      hiddenButtonLoadMore(false);
      $loadMore.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    if (!images.length) {
      iziToast.info({ 
        message: 'We\'re sorry, but you\'ve reached the end of search results.',
        position: 'topRight'
      });
    }

  } catch (error) {
    console.error(error);
  } finally {
    $loadText.hidden = true
  }
}

function hiddenButtonLoadMore(bool = false) {
  $loadMore.hidden = bool;
}