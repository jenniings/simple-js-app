var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) { //add a single item, a Pokemon
    if (typeof (pokemon) !== 'object') {
      return 'Not a valid input'
    } else {
      repository.push(pokemon);
    }
  }

  function getAll() { //should return an array of Pokemon
    return repository;
  }

  function addListItem(pokemon) {
    var $listItem = document.createElement('li');
    var $button = document.createElement('button');
    $button.innerText = pokemon.name;
    $button.classList.add('pokemon-name');

    $button.addEventListener('click', function () {
      showDetails(pokemon)
    });
    $listItem.appendChild($button);
    $pokemonList.appendChild($listItem)
  }

  // function showDetails(item) {
  //   pokemonRepository.loadDetails(item).then(function () {
  //     console.log(item);
  //   });
  // }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
    }).catch(function (e) {
      console.error(e);
    });
  }

  return { //return both variables to pass later on
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

var $pokemonList = document.querySelector('.pokemon-list'); //access pokemon list in the HTML file

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});




