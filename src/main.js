import { fetchImages } from './js/pixabay-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');
const loader = document.querySelector('.loader');

let query = '';
let page = 1;
let lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value.trim();

  if (query === '') {
    Notify.warning('Please enter a search query');
    return;
  }

  page = 1;
  clearGallery();
  fetchAndRenderImages();
}

function fetchAndRenderImages() {
  loader.classList.remove('hidden'); 

  fetchImages(query, page)
    .then(data => {
      if (data.hits.length === 0) {
        Notify.failure('No images found. Try a different search query.');
        return;
      }

      renderGallery(data.hits);
      lightbox.refresh();

      if (data.totalHits > page * 15) { 
        loadMoreBtn.classList.remove('hidden');
      } else {
        loadMoreBtn.classList.add('hidden');
      }

      if (page > 1) {
        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      Notify.failure('Something went wrong, please try again later.');
    })
    .finally(() => {
      loader.classList.add('hidden'); 
    });
}

loadMoreBtn.addEventListener('click', () => {
  page += 1;
  fetchAndRenderImages();
});

function renderGallery(images) {
  const markup = images
    .map(image => {
      return `
        <li class="gallery-item">
          <a href="${image.largeImageURL}">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          </a>
        </li>
      `;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
  gallery.innerHTML = '';
}
