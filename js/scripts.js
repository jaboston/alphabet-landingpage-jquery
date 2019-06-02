var repository = [];
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

// push our defined pokemons to the repository. lol.
repository.push(charmander);
repository.push(bulbasaur);
repository.push(pikachu);

//iterate through the repository looking for pokemons.
for(var i = 0; i < repository.length; i++){
  document.write("<h3>- " + repository[i].name + "</h3>");
  //using foreach
  Object.keys(repository[i]).forEach(function(property) {
    // dont repeat name
    if(property != "name"){
      document.write("<div class='stats'>" + property + ": " + repository[i][property] + "</div>");
    }
    document.write("<br/>");
  });

  // check if the height is that of a big boi
  if(repository[i].height > 100){
    document.write("wow! " + repository[i].height + "cm... Thats a big boi!")
    document.write("</br>")
  } else {
    document.write("just a little boi. it should stay in its pokeball out of shame.")
    document.write("</br>")
  }
}
