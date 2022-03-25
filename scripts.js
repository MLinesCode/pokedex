const pokeCard = document.querySelector("[data-poke-card]");
const pokeName = document.querySelector("[data-poke-name]");
const pokeImg = document.querySelector("[data-poke-img]");
const pokeImgContainer = document.querySelector("[data-poke-img-container]");
const pokeId = document.querySelector("[data-poke-id]");
const pokeTypes = document.querySelector("[data-poke-types]");
const pokeStats = document.querySelector("[data-poke-stats]");

const typeColors = {
  electric: "#ffea70",
  normal: "#b09398",
  fire: "#ff675c",
  water: "#0596c7",
  ice: "#afeafd",
  rock: "#999799",
  flying: "#7ae7c7",
  grass: "#4a9681",
  psychic: "ffc609",
  ghost: "561d25",
  bug: "a2faa3",
  poison: "#795663",
  ground: "#d2b074",
  dragon: "da627d",
  steel: "#1d8a99",
  fighting: "#2f2f2f",
  default: "#2a1a1f",
};

const searchPokemon = (event) => {
  event.preventDefault();
  const { value } = event.target.pokemon;
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then((data) => data.json())
    .then((res) => renderPokemonData(res))
    .catch((err) => renderNotFound());
};

const renderPokemonData = (data) => {
  const sprite = data.sprites.front_default;
  const { stats, types } = data;

  pokeName.textContent = data.name;
  pokeImg.setAttribute("src", sprite);
  pokeId.textContent = `No. ${data.id}`;
  setCardColor(types);
  renderPokemonTypes(types);
  renderPokemonStats(stats);
};

const setCardColor = (types) => {
  const colorBase = typeColors[types[0].type.name];
  const colorSecond = types[1] ? typeColors[types[1].type.name] : typeColors;
  pokeImg.style.background = `radial-gradient(${colorSecond} 33%, ${colorBase} 33%)`;
  pokeImg.style.backgroundSize = "8px 8px";
};

const renderPokemonTypes = (types) => {
  pokeTypes.innerHTML = "";
  types.forEach((type) => {
    const typeTextElement = document.createElement("div");
    typeTextElement.style.color = typeColors[type.type.name];
    typeTextElement.textContent = type.type.name;
    pokeTypes.appendChild(typeTextElement);
  });
};

const renderPokemonStats = (stats) => {
  pokeStats.innerHTML = "";
  stats.forEach((stat) => {
    const statElement = document.createElement("div");
    const statElementName = document.createElement("div");
    const statElementAmount = document.createElement("div");
    statElementName.textContent = stat.stat.name;
    statElementAmount.textContent = stat.base_stat;
    statElement.appendChild(statElementName);
    statElement.appendChild(statElementAmount);
    pokeStats.appendChild(statElement);
  });
};

const renderNotFound = () => {
  pokeName.textContent = "Pokemon no encontrado";
  pokeImg.setAttribute("src", "./assets/pikachu-sad.gif");
  pokeId.textContent = "";
  pokeTypes.innerHTML = "";
  pokeStats.innerHTML = "";
};
