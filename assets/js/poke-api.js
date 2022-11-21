const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = async (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    const response = await fetch(url)
    const jsonBody = await response.json()
    const pokemons = jsonBody.results
    const detailRequests = pokemons.map(pokeApi.getPokemonDetail)
    const pokemonsDetails = await Promise.all(detailRequests)
    return pokemonsDetails
}

pokeApi.getPokemon = async (id) => {

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const pokemonPromises = [];

    const response = await fetch(url);
    pokemonPromises.push(await response.json());

    const pokemonPromisesResolvidas = await Promise.all(pokemonPromises);

    return pokemonPromisesResolvidas;
}