import catApi from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const refs = {
  selectEl: document.querySelector('.breed-select'),
  listCats: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader-p'),
};


catApi
  .fetchBreeds()
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
      'Oops! Something went wrong! Try reloading the page!'
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
    hidden(refs.selectEl);
    rmHidden(refs.loader);
    catApi
      .fetchCatByBreed(e.target.value)
      .then(response => {
        refs.listCats.innerHTML = '';
        refs.listCats.insertAdjacentHTML('beforeend', deployCard(response));
        rmHidden(refs.selectEl);
        rmHidden(refs.listCats);
        hidden(refs.loader);
      })
      .catch(error => {
        rmHidden(refs.selectEl);
        hidden(refs.loader);
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
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









