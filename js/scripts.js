var pokemonRepository = (function () {
  var repository = [];

  return {
    add: function(pokemon) {
      repository.push(pokemon);
    },
    getAll: function() {
      return repository;
    }
  }
}
)();

  var pikachu, bulbasaur, charmander;
  pikachu = {
    name: "pikachu",
    height: 100,
    type: ["electric"]
  }

  bulbasaur = {
    name: "bulbasaur",
    height: 80,
    type: ["grass"]
  }

  charmander = {
    name: "charmander",
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
    document.write("<h3>- " + pokemonRepository.getAll()[i].name + "</h3>");
    //using foreach
    Object.keys(pokemonRepository.getAll()[i]).forEach(function(property) {
      // dont repeat name
      if(property != "name"){
        document.write("<div class='stats'>" + property + ": " + pokemonRepository.getAll()[i][property] + "</div>");
      }
      document.write("<br/>");
    });

    // check if the height is that of a big boi
    if(pokemonRepository.getAll()[i].height > 100){
      document.write("wow! " + pokemonRepository.getAll()[i].height + "cm... Thats a big boi!")
      document.write("</br>")
    } else {
      document.write("just a little boi. it should stay in its pokeball out of shame.")
      document.write("</br>")
    }
  }
