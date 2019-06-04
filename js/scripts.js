// globally accessible element.
// reference our list item for cloning.
var $listItem = document.querySelector('.project-grid__item');


var pokemonRepository = (function () {
  // API constant
  var MAX_POKEMONS = 150;

  // URL constants
  var SITE_PROTOCOL = "https://";
  var SITE_ADDRESS = "pokeapi.co/";
  var SITE_API_PATH = "api/v2/";
  var SITE_ENDPOINT_POKEMON = "pokemon/";
  var SITE_PARAMETER_LIMIT = "?limit=";

  var repository = [];
  // construct our api url.
  var apiUrl = SITE_PROTOCOL + SITE_ADDRESS + SITE_API_PATH + SITE_ENDPOINT_POKEMON + SITE_PARAMETER_LIMIT + MAX_POKEMONS;


  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.type = Object.keys(details.types);
      console.log(typeof(item.type));
      console.log(details.types);
    }).catch(function (e) {
      console.error(e);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        console.log(item);
        var pokemon = {
          name: item.name,
          detailsUrl: item.url,
          height: -1,
          type: Object.keys({})
        };
        add(pokemon);
      })
    }).catch(function (e) {
      console.error(e);
    });
    // once we know we have added all the available pokemons, it is safe to delete our original $pokemonTemplatedItem
    // delete our original list item because aint nobody got time for that.
    $listItem.parentElement.removeChild($listItem);
  };

  function add(pokemon) {
    // check every value explicitly. Make sure there is no monkey business.
    if(typeof(pokemon.height)==typeof(0)
    &&
    typeof(pokemon.name)==typeof("")
    )
      repository.push(pokemon);
      // ironic eh
    else throw ": You didn't catch this pokemon!";
  }

  return {
    add: add,
    getAll: function() {
      return repository;
    },
    // returns the object for the pokemon name that you want.
    filter: function(name) {
      return repository.filter(value => value.name == name);
    },
    loadList: loadList,
    loadDetails: loadDetails
  };
}
)();

function showDetails(pokemon){
  pokemonRepository.loadDetails(pokemon).then(function (){
    var type = pokemon.type;
    console.log("name: " + pokemon.name + ", height: " + pokemon.height + ", type: " + pokemon.type + "");
  });
};

function addListItem(pokemon){
  // check the values are legit
  if(typeof(pokemon.height)==typeof(0)
  &&
  typeof(pokemon.name)==typeof("")
  ){

  // clone our list item.
  var $pokemonTemplatedItem = $listItem.cloneNode(false);
  var $pokemonTemplatedButton = document.querySelector(".button--pokemon").cloneNode(false);

  // find our project grid.
  var $projectGrid = document.querySelector(".project-grid");

  // set our row based on the pokemon properties. We already checked that pokemon name is a type of string in this
  $pokemonTemplatedButton.innerText = pokemon.name;
  $pokemonTemplatedItem.insertBefore($pokemonTemplatedButton, $pokemonTemplatedItem.firstElementChild);

  $pokemonTemplatedButton.addEventListener('click', function () {
    // we need to referenence a pokemon outside of this function just above.
    showDetails(pokemon);
  });

  // insert our pokemon at the top.
  $projectGrid.insertBefore($pokemonTemplatedItem, $projectGrid.firstElementChild);

  };
};

  var pikachu, bulbasaur, charmander;
  pikachu = {
    name: "Pikachu",
    height: 100,
    type: ["electric"]
  }

  bulbasaur = {
    name: "Bulbasaur",
    height: 80,
    type: ["grass"]
  }

  charmander = {
    name: "Charmander",
    height: 120,
    type: ["fire"]
  }



  // push our defined pokemons to the repository through our add function.
  // pokemonRepository.add(pikachu);
  // pokemonRepository.add(charmander);
  // pokemonRepository.add(bulbasaur);

  console.log(pokemonRepository.getAll());

  // call the loadList function in pokemonRepository which makes a request to the API to fetch and return the list of Pokemon.
  pokemonRepository.loadList().then(function(){
    // getAll returns pokemon array from pokemon repository then we call the 'forEach' function on the array
    // which then references each object as the object 'pokemon'.
    // it then adds that pokemon as a list item to our UI.
    pokemonRepository.getAll().forEach(function(pokemon){
      addListItem(pokemon);
    });
  });
