import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '46065959-261c5874db82aaa09dfa5c313';

async function fetchImages(query, page = 1) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}`; 
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error('Error fetching images');
  }
}

export { fetchImages }; 


