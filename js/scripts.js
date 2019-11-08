var pokemonRepository = (function () {
  var repository = [
    { name: "Bulbasaur", height: 0.7, types: ["grass"] },
    { name: "Charmander", height: 0.6, types: ["fire"] },
    { name: "Squirtle", height: 0.5, types: ["water"] }
  ];

  function add(pokemon) { //add a single item, a Pokemon
    if (typeof (pokemon) !== object) {
      return 'Not a valid input'
    } else {
      repository.push(pokemon);
    }
    repository.push(pokemon);
  }

  function getAll() { //should return an array of Pokemon
    return repository;
  }
  return { //return both variables to pass later on
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

console.log(pokemonRepository.getAll()); //call the function outside the loop
//pokemonRepository.add({ name: 'Pikachu' });

var pokemonList = document.querySelector('.pokemon-list') //access pokemon list in the HTML file

pokemonRepository.getAll().forEach(function (item) {
  //  function addListItem(pokemon) {
  var listItem = document.createElement('li');
  var button = document.createElement('button');
  button.innerText = pokemon.name;
  $button.classList.add('pokemon-name');
  $listItem.appendChild(button);
  $pokemonList.appendChild(listItem)
  //   button.addEventListener('click', function () {
  //     showDetails(pokemon)
  //   })
  // }
})

