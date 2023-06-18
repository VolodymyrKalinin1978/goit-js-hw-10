'use strict';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const API_KEY =
  'live_mSAOgDoa0U5tmh68gyXvyaViGKgqrbvzl9YV2RwM9kYx75N8NRwnCDBR13IPg705';
const CAT_INFO_URL = 'https://api.thecatapi.com/v1/images/search';

export function fetchBreeds() {
  return fetch(`${BASE_URL}?api_key=${API_KEY}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    console.log('Запит відбувся успішно');
    return res.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${CAT_INFO_URL}?breed_ids=${breedId}&api_key=${API_KEY}`)
    .then(response => {
      if (response.ok) {
        return response.json().then(data => {
          console.log(data);
          const [cat] = data;
          console.log(cat);
          return cat;
        });
      } else {
        throw new Error('Failed to fetch cat');
      }
    })
    .catch(error => {
      throw new Error('Failed to fetch cat');
    });
}
