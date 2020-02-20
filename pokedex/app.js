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
  console.log(pokemon);
};

fetchPokemon();
