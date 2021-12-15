let pages = {};

document.addEventListener('DOMContentLoaded', () => {
  dataPersonajes();
});

document.addEventListener('click', e => {
  if (e.target.matches('#btn__prev')) {
    if (pages.prev) {
      dataPersonajes(pages.prev);
    }
  }
  if (e.target.matches('#btn__next')) {
    if (pages.next) {
      dataPersonajes(pages.next);
    }
  }
});

const loadingData = state => {
  const loading = document.getElementById('loading');
  if (state) {
    loading.classList.remove('hidden');
  } else {
    loading.classList.add('hidden');
  }
};

const dataPersonajes = async (url = `https://rickandmortyapi.com/api/character/`) => {
  try {
    loadingData(true);
    const res = await fetch(url);
    const data = await res.json();
    mostrarPersonajes(data);
    mostrarBotones(data);

    pages = {
      prev: data.info.prev,
      next: data.info.next,
    };
  } catch (e) {
    console.log(e);
  } finally {
    loadingData(false);
  }
};

const mostrarPersonajes = data => {
  const template_card = document.getElementById('template__card');
  const fragment = document.createDocumentFragment();
  const card = document.getElementById('cards');

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

const mostrarBotones = data => {
  const template_btn = document.getElementById('template__btn');
  const btns = document.getElementById('btns');

  btns.textContent = '';

  const clone = template_btn.content.cloneNode(true);

  if (data.info.prev) {
    clone.getElementById('btn__prev').classList.remove('cursor-not-allowed');
  } else {
    clone.getElementById('btn__prev').classList.add('cursor-not-allowed');
  }
  if (data.info.next) {
    clone.getElementById('btn__next').classList.remove('cursor-not-allowed');
  } else {
    clone.getElementById('btn__next').classList.add('cursor-not-allowed');
  }

  btns.appendChild(clone);
};
