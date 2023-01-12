import Notiflix from 'notiflix';

import axios from 'axios';
const axios = require('axios');

const formInput = document.querySelector('#search-form');
const galleryPlace = document.querySelector('.gallery');
const input = document.querySelector('[name="searchQuery"]');
const loadMoreButton = document.querySelector('.load-more');

// loadMoreButton.disabled = 'true';

let page = 1;
loadMoreButton.style.display = 'none';

formInput.addEventListener('submit', onSubmit);
loadMoreButton.addEventListener('click', onLoad);

loadMoreButton.disabled = true;

// const { height: cardHeight } = document
//    .querySelector('.gallery')
//    .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//    top: cardHeight * 2,
//    behavior: 'smooth',
// });

function onSubmit(event) {
   event.preventDefault();
   galleryPlace.innerHTML = '';
   page = 1;
   loadMoreButton.disabled = false;
   loadMoreButton.style.display = 'none';
   const searchFor = input.value;
   getImages(searchFor).then(({ hits, totalHits }) =>
      hits.map(element => {
         galleryPlace.insertAdjacentHTML('beforeend', galleryListRender(element));
         if (galleryPlace.children.length >= totalHits) {
            loadMoreButton.style.display = 'none';
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
         } else {
            loadMoreButton.style.display = 'block';
         }

         // console.log(galleryPlace.children.length);
         //  console.log(hits);
         //  console.log(totalHits);
      })
   );
}

function onLoad() {
   page += 1;
   getImages(input.value).then(({ hits, totalHits }) =>
      hits.map(element => {
         galleryPlace.insertAdjacentHTML('beforeend', galleryListRender(element));
         if (galleryPlace.children.length >= totalHits) {
            loadMoreButton.style.display = 'none';
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
         }
         // console.log(galleryPlace.children.length);
         //  console.log(hits);
         //  console.log(totalHits);
      })
   );
}

async function getImages(input) {
   const myKey = '32683940-309b63abead1b8e1ecbca20b5';
   const perPage = 40;

   const response = await axios.get(
      `https://pixabay.com/api/?key=${myKey}&q=${input}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
   );

   // const getResponse = await fetch(
   //    `https://pixabay.com/api/?key=${myKey}&q=${input}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
   // );
   const parsedData = await response.data;

   return parsedData;
}

function galleryListRender(picture) {
   return `
   <div class="photo-card">
  <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" width=250/>
  <div class="info">
    <p class="info-item">
      <b>likes: ${picture.likes}</b>
    </p>
    <p class="info-item">
      <b>views: ${picture.views}</b>
    </p>
    <p class="info-item">
      <b>comments: ${picture.comments}</b>
    </p>
    <p class="info-item">
      <b>downloads: ${picture.downloads}</b>
    </p>
  </div>
</div>`;
}
