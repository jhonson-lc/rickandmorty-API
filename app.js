const template_card = document.getElementById('template__card');
const fragment = document.createDocumentFragment();
const card = document.getElementById('cards');

let arrayPersonajes = [];

document.addEventListener('DOMContentLoaded', () => {
  dataPersonajes();
});

const loadingData = state => {
  const loading = document.getElementById('loading');
  if (state) {
    loading.classList.remove('hidden');
  } else {
    loading.classList.add('hidden');
  }
};

const dataPersonajes = async () => {
  try {
    loadingData(true);
    const res = await fetch(`https://rickandmortyapi.com/api/character/`);
    const data = await res.json();
    agregarPersonajes(data);
  } catch (e) {
    console.log(e);
  } finally {
    loadingData(false);
  }
};

const agregarPersonajes = data => {
  card.textContent = '';
  data.results.forEach(personaje => {
    const clone = template_card.content.cloneNode(true);
    clone.querySelector('.card__img').setAttribute('src', personaje.image);
    clone.querySelector('.description_Per #namePerson').textContent = personaje.name;
    clone.getElementById('location').textContent = personaje.location.name;
    clone.getElementById('typePerson').textContent = personaje.species;
    fragment.appendChild(clone);
  });
  card.appendChild(fragment);
};
