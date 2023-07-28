import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import 'slim-select/dist/slimselect.css';
const refs = {
  selectEl: document.querySelector('.breed-select'),
  listCats: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader-p'),
};

  fetchBreeds()
  .then(response => {
    refs.selectEl.insertAdjacentHTML('beforeend', addOptionsInSelect(response));
    rmHidden(refs.selectEl);
    hidden(refs.loader);
    new SlimSelect({
      select: refs.selectEl,
      settings: { contentPosition: 'absolute' },
    });
  })
  .catch(error => {
    hidden(refs.loader);
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!',
      {
        position: 'center-top',
      }
    );
  });

function addOptionsInSelect(response) {
    return response
      .map(({ name, id }) => {
        return `<option value="${id}">${name}</option>`;
      })
        .join('');
}

refs.selectEl.addEventListener('change', onChange);


function onChange(e) {
  const selSecond = document.querySelector('.ss-main');
    hidden(selSecond);
    rmHidden(refs.loader);
    hidden(refs.listCats);
    fetchCatByBreed(e.target.value)
      .then(response => {
        refs.listCats.innerHTML = '';
        refs.listCats.insertAdjacentHTML('beforeend', deployCard(response));
        rmHidden(selSecond);
        rmHidden(refs.listCats);
        hidden(refs.loader);
      })
      .catch(error => {
        rmHidden(selSecond);
        hidden(refs.loader);
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!',
          {
            position: 'center-top',
          }
        );
      });
};



function deployCard(data) {
    const { name, temperament, description } = data.breeds[0];
    const { url } = data;
        
    return `<div class="card">
  <div class="thumb">
    <img class="photo-cat" src="${url}" alt="cat">
  </div>
        <div class="descr">
          <h1 class="title">${name}</h1>
        <p class="temperament"><b>Temperament: </b>${temperament}</p>
        <p class="description"><b>Description: </b>${description}</p>
        </div>
        
</div>`;
}

function hidden(el) {
    el.classList.add('hidden')
}

function rmHidden(el) {
    el.classList.remove('hidden')
}









