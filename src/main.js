import { fetchImages } from './js/pixabay-api';
import { renderImages, clearGallery, toggleLoadMoreButton } from './js/render-functions';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let query = '';
let page = 1;
const form = document.querySelector('#search-form');
const loadMoreButton = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value.trim();
  page = 1;
  clearGallery();
  toggleLoadMoreButton(false);

  try {
    const data = await fetchImages(query, page);
    if (data.hits.length > 0) {
      renderImages(data.hits);
      lightbox.refresh();
      toggleLoadMoreButton(true);
    } else {
      alert('No images found');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

loadMoreButton.addEventListener('click', async () => {
  page += 1;
  try {
    const data = await fetchImages(query, page);
    renderImages(data.hits);
    lightbox.refresh();

   
    scrollByTwoCardHeights();

    if (page * 15 >= data.totalHits) {
      toggleLoadMoreButton(false);
      alert("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.error('Error:', error);
  }
});


function scrollByTwoCardHeights() {
  const gallery = document.querySelector('.gallery');

  
  if (gallery.firstElementChild) {
    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    
    window.scrollBy({
      top: cardHeight * 2, 
      behavior: 'smooth',
    });
  }
}

