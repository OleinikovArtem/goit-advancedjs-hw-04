import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const $gallery = document.querySelector('.gallery');

export const showLoading = () => {
  $gallery.innerHTML = '<p id="loading">Loading...</p>';
};

export const clearLoading = () => {
  $gallery.innerHTML = '';
};

export const renderImages = (images, isNew = true) => {
  if (isNew) $gallery.innerHTML = '';

  if (images.length === 0) {
    iziToast.error({
      message: 'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
    return;
  }

  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <div class="gallery-item">
        <a href="${largeImageURL}" class="gallery-link">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery-image"/>
        </a>
        <div class="gallery-info">
          <p><strong>Likes</strong> ${likes}</p>
          <p><strong>Views</strong> ${views}</p>
          <p><strong>Comments</strong> ${comments}</p>
          <p><strong>Downloads</strong> ${downloads}</p>
        </div>
      </div>
    `
    )
    .join('');

  $gallery.innerHTML += markup;

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
};