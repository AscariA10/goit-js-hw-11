import Notiflix from 'notiflix';
const axios = require('axios');

const formInput = document.querySelector('#search-form');
const galleryPlace = document.querySelector('.gallery');
const input = document.querySelector('[name="searchQuery"]');

formInput.addEventListener('submit', onSubmit);

function onSubmit(event) {
   event.preventDefault();
   const searchFor = input.value;
   getImages(searchFor).then(data => console.log(data));
}

async function getImages(input) {
   const myKey = '32683940-309b63abead1b8e1ecbca20b5';
   const getResponse = await fetch(
      `https://pixabay.com/api/?key=${myKey}&q=${input}&image_type=photo&orientation=horizontal&safesearch=true`
   );
   const parsedData = await getResponse.json();
   return parsedData;
}
