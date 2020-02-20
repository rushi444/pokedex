const pokedex = document.getElementById('pokedex');
console.log(pokedex);

const fetchPokemon = async () => {
  const promises = [];
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    const res = await (await fetch(url)).json();
    promises.push(res);
  }
  const allResponses = Promise.all(promises);
  const pokemon = (await allResponses).map(data => ({
    name: data.name,
    id: data.id,
    image: data.sprites['front_default'],
    type: data.types.map(type => type.type.name).join(', '),
  }));
  displayPokemon(pokemon);
};

const displayPokemon = pokemon => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon
    .map(
      eachPokemon => `
  <li class='card'>
  <img class='card-image' src="${eachPokemon.image}">
  <h2 class='card-title'>${eachPokemon.id}. ${eachPokemon.name}</h2>
  <p class='card-subtitle'>Type: ${eachPokemon.type}</p>
  </li>`,
    )
    .join('');
  pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
