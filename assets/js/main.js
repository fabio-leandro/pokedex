
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const body = document.querySelector('body');

const maxRecords = 151;
const limit = 10;
let offset = 0;


const seeDetails = (id,pokemon) => {

    return `
        <div class="seeDetails ${pokemon.types.map((type)=>type.type.name)}">
            <img src="${pokemon.photo}" alt="Pokemon Photo"/>
            <span>Id: ${pokemon.number}</span>
            <span>Name: ${pokemon.name}</span>
            <span>Weight: ${pokemon.weight}</span>
            <span>Height: ${pokemon.height}</span>
            <div class="detailsTypes">
                <span>Types:</span>
                <ol class="types">
                    ${pokemon.types.map((type) => `<li>${type.type.name}</li>`).join('')}
                </ol>
            </div>
            <div class="detailsAbilities">
                <span>Abilities:</span>
                <ol class="abilities">
                    ${pokemon.abilities.map((a) => `<li>${a.ability.name}</li>`).join('')}
                </ol>
            </div>
            <a href="index.html">Voltar</a>
        </div>
    `
} 


const getDetails = async (id) => {

    const pokemon = new Pokemon();

    pokemonList.remove()
    loadMoreButton.remove()

    const pokemonInfo = await pokeApi.getPokemon(id);
    console.log(pokemonInfo)

    pokemonInfo.map((p) => {
       pokemon.name = p.name;
       pokemon.number = p.id;
       pokemon.types = p.types;
       pokemon.abilities = p.abilities;
       pokemon.type = p.species.name;
       pokemon.weight = p.weight;
       pokemon.height = p.height;
    });


    const pPhoto = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
    pokemon.photo = pPhoto;
   

    body.innerHTML = seeDetails(id,pokemon)

    console.log(pokemon);

    pokemon.types.map((t) => console.log(t.type.name))

    

}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <button onClick="getDetails(${pokemon.number})">Details</button>
        </li>
    `
}



function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset,limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})




