const BASE_KEY =
  'live_bfn1VCdo3QJCVCa7zKOB7k0BSO7PkMhrRgrQD1ygLJdMptjtpRK9U11YwB3RzW7p';

import axios from 'axios';
axios.defaults.headers.common['x-api-key'] = BASE_KEY;


export const catApi = {
  fetchBreeds() {
    return axios.get('https://api.thecatapi.com/v1/breeds').then(r => r.data);
  },

  fetchCatByBreed(breedId) {
    return axios
      .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
      .then(response => response.data[0]);
  },
}; 





