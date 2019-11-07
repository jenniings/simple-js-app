var pokemonRepository = (function () {
  var repository = [
    { name: "Bulbasaur", height: 0.7, types: ["grass"] },
    { name: "Charmander", height: 0.6, types: ["fire"] },
    { name: "Squirtle", height: 0.5, types: ["water"] }
  ];

  function add(pokemon) { //add a single item, a Pokemon
    // if (typeof(pokemon) === object)
    //   name = pokemon.name,
    //   height = pokemon.height,
    //   types = pokemon.types
    // )
    repository.push(pokemon);
  }

  function getAll() { //should return an array of Pokemon
    return repository;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

console.log(pokemonRepository.getAll());
//pokemonRepository.add({ name: 'Pikachu' });

pokemonRepository.getAll().forEach(function (item) {
  document.write(item.name + " (height: " + item.height + "m" + ") " + item.types + "<br>");
});



// for (i = 0; i < repository.length; i++) {
//   if (repository[i].height >= 0.7) {
//     document.write(repository[i].name + " (height:" + repository[i].height + ")" + " - Wow, that's big!");
//     document.write("<br>");
//   } else {
//     document.write(repository[i].name + " (height:" + repository[i].height + ")");
//     document.write("<br>");
//   }
// }


//console.log(pokemonRepository);


