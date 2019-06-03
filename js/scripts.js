// globally accessible element.
// reference our list item for cloning.
var $listItem = document.querySelector('.project-grid__item');


var pokemonRepository = (function () {
  var repository = [];

  return {
    add: function(pokemon) {

      // check every value explicitly. Make sure there is no monkey business.
      if(typeof(pokemon.height)==typeof(0)
      &&
      typeof(pokemon.name)==typeof("")
      &&
      typeof(pokemon.type)==typeof([])
      )
        repository.push(pokemon);
        // ironic eh
      else throw ": You didn't catch this pokemon!";
    },
    getAll: function() {
      return repository;
    },
    // returns the object for the pokemon name that you want.
    filter: function(name) {
      return repository.filter(value => value.name == name);
    }
  }
}
)();

function showDetails(pokemon){
  //TODO: show pokemon details when requested
  console.log("name: " + pokemon.name + ", height: " + pokemon.height + ", type: " + pokemon.type + "");
}

function addListItem(pokemon){
  // check the values are legit
  if(typeof(pokemon.height)==typeof(0)
  &&
  typeof(pokemon.name)==typeof("")
  &&
  typeof(pokemon.type)==typeof([])
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

  }
}

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
  pokemonRepository.add(pikachu);
  pokemonRepository.add(charmander);
  pokemonRepository.add(bulbasaur);

  console.log(pokemonRepository.getAll());

  //iterate through the repository looking for pokemons.
  for(var i = 0; i < pokemonRepository.getAll().length; i++){
    addListItem(pokemonRepository.getAll()[i]);
    //using foreach
    Object.keys(pokemonRepository.getAll()[i]).forEach(function(property) {
      // dont repeat name
      // todo: if name already exists, remove it.
    });
  }

  // once we know we have added all the available pokemons, it is safe to delete our original $pokemonTemplatedItem
  // delete our original list item because aint nobody got time for that.
  $listItem.parentElement.removeChild($listItem);
