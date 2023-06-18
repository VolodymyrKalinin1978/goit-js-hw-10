import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import refs from './cat-refs';

showLoader();
fetchBreeds()
  .then(data => {
    console.log(data);

    onBreetsSetup(data);

    refs.breedCatSel.classList.remove('is-hidden');
  })
  .catch(error => {
    showError();
  })
  .finally(() => {
    hideLoader();
  });

function onBreetsSetup(data) {
  const catsInfo = data
    .map(
      el => `
    <option value="${el.id}">${el.name}</option>
    `
    )
    .join('');
  refs.breedCatSel.insertAdjacentHTML('afterbegin', catsInfo);
}

function showCatInfo(cat) {
  const catInfoHTML = `
   
    <img src="${cat.url}" alt="Cat" "/>
   <div class="cat-container" > 
    <h1 class="cat-title"> ${cat.breeds[0].name}</h1>
    <p  class="cat-description"> ${cat.breeds[0].description}</p>
    <p  class="cat-temperament">${cat.breeds[0].temperament}</p>
   </div>
  `;

  refs.catInfo.innerHTML = catInfoHTML;
}

function handleBreedChange(event) {
  const breedId = event.target.value;
  console.log(breedId);
  showLoader();
  hideCatInfo();
  fetchCatByBreed(breedId)
    .then(cat => {
      console.log(cat);
      showCatInfo(cat);
    })
    .catch(error => {
      showError();
    })
    .finally(() => {
      hideLoader();
    });
}

function showError() {
  // refs.error.style.display = 'block';

  Notify.failure('Oops! Something went wrong! Try reloading the page!', {
    timeout: 4500,
    width: '500px',
  });
}

function hideLoader() {
  refs.loaderDate.style.display = 'none';
}

function showLoader() {
  refs.loaderDate.style.display = 'block';
  Notiflix.Loading.hourglass();
  Notiflix.Loading.remove(500);
}

function hideCatInfo() {
  refs.catInfo.innerHTML = '';
  // refs.catInfo.style.display = 'none';
}
refs.breedCatSel.addEventListener('change', handleBreedChange);

// onBreetsSetup(data);
