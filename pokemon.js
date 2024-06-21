const MAX_POKEMON = 151;
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFiler = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");

let allPokemons = []

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
.then((Response) => Response.json())
.then((data) => {
    allPokemons = data.results;
});

async function fetchPokemonDataBeforeRedirect(id) {
try {
    const [pokemon, pokemonSpecies] = await Promise.all([fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()     
    ),
    fetch(fetch(`https://pokeapi.co/api/v2/pokemon-spieces/${id}`).then((res) => res.json()     
    ),
)])
 return true
 } catch (error) {
    console.error("failed to catch data before")
 }
}

function displayPokemons(pokemon) {
    listWrapper.innerHTML ="";
    pokemon.forEach((pokemon) => {
    const pokemonID = pokemon.url.split("/")[6];
    const listItem = document.createElement("div");
    listItem.className = "list-item";
    listItem.innerHTML = `
       <div class="number-wrap">
          <p class="caption-fonts">#${pokemonID}</p>    
       </div>
       <div class="img-wrap">
          <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}"/>   
       </div>
       <div class="name-wrap">
          <p class="body3-fonts">#${pokemon.name}</p>    
       </div>
    `
    listItem.addEventListener("click", async () => {
        const success = await fetchPokemonDataBeforeRedirect(pokemonID)
        if (success) {
            window.location.href = `./detail.html?id=${pokemonID}`
        }
    })

    listWrapper.appendChild(listItem)

    })
}