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

  // function validateEmail() {
  //   var value = $emailInput.value;

  //   if (!value) {
  //     showErrorMessage($emailInput, 'Email is a required field.');
  //     return false;
  //   }

  //   if (value.indexOf('@') === -1) {
  //     showErrorMessage($emailInput, 'You must enter a valid email address.');
  //     return false;
  //   }

  //   showErrorMessage($emailInput, null);
  //   return true;
  // }

  // function validatePassword() {
  //   var value = $passwordInput.value;

  //   if (!value) {
  //     showErrorMessage($passwordInput, 'Password is a required field.');
  //     return false;
  //   }

  //   if (value.length < 8) {
  //     showErrorMessage($passwordInput, 'The password needs to be at least 8 characters long.');
  //     return false;
  //   }

  //   showErrorMessage($passwordInput, null);
  //   return true;
  // }

  // function showErrorMessage($input, message) {
  //   var $container = $input.parentElement;

  //   //Remove an existing error
  //   var error = $container.querySelector('.error-message');
  //   if (error) {
  //     $container.removeChild(error);
  //   }

  //   //Add the error is the message isn't empty
  //   if (message) {
  //     var error = document.createElement('div');
  //     error.classList.add('error-message');
  //     error.innerText = message;
  //     $container.appendChild(error);
  //   }
  // }

  // function validateForm() {
  //   var isValidEmail = validateEmail();
  //   var isValidPassword = validatePassword();
  //   return isValidEmail && isValidPassword;

  //   $emailInput.addEventListener('input', validateEmail);
  //   $passwordInput.addEventListener('input', validatePassword);
  // }

  function showModal(title, text) {
    var $modalContainer = document.querySelector('#modal-container');

    //Clear all exisiting modal content
    $modalContainer.innerHTML = '';

    var modal = document.createElement('div');
    modal.classList.add('modal');

    //Add the new modal content
    var closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click, hideModal');

    var titleElement = document.createElement('h1');
    titleElement.innerText = title;

    var contentElement = document.createElement('p');
    contentElement.innerText = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    $modalContainer.appendChild(modal);

    $modalContainer.classList.add('is-visible');

    window.addEventListener('keydown', (e) => {
      var $modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });

    $modalContainer.addEventListener('click', (e) => {
      var target = e.target;
      if (target === $modalContainer) {
        hideModal();
      }
    });
  }

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });

  var dialogPromiseReject;

  function hideModal() {
    var $modalContainer = document.querySelector('#modal-container');
    $modalContainer.classList.remove('is-visible');

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

  function showDialog(title, text) {
    showModal(title, text);

    //We want to add a confirm and cancel button to the modal
    var modal = $modalContainer.querySelector('.modal');

    var confirmButton = document.createElement('button');
    confirmButton.classList.add('modal-confirm');
    confirmButton.innerText = 'Confirm';

    var cancelButton = document.createElement('button');
    cancelButton.classList.add('modal-cancel');
    cancelButton.innerText = 'Cancel';

    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);

    //Focus the confirmButton so that the user can simply press enter
    confirmButton.focus();

    //Return a promise that resolves when confirmed, else rejects
    return new Promise((resolve, reject) => {
      cancelButton.addEventListener('click', hideModal);
      confirmButton.addEventListener('click', () => {
        dialogPromiseReject = null; //Reset this
        hideModal();
        resolve();
      });

      //This can be used to reject from other functions
      dialogPromiseReject = reject;
    });
  }

  document.querySelector('#show-dialog').addEventListener('click', () => {
    showDialog('Confirm action', 'Are you sure you want to do this?').then(function () {
      alert('confirmed!');
    }, () => {
      alert('not confirmed');
    });
  });

  var $canvas = document.querySelector('#canvas');

  var isDrawing = false;
  var previousX = null;
  var previousY = null;

  function handleStart(e) {
    isDrawing = true;

    //Initiate previousX/previousY
    var x = e.pageX; //X-coordinate of click/touch
    var y = e.pageY; //Y-coordinate of click/touch
    previousX = x;
    previousY = y;
  }

  function handleEnd() {
    isDrawing = false;
  }

  function handleMove(e) {
    //To prevent drawing on hover
    if (!isDrawing) {
      return;
    }

    var x = e.pageX; //X-coordinate of click/touch
    var y = e.pageY; //Y-coordinate of click/touch

    //This is canvas specific
    var ctx = $canvas.getContext('2d');

    //Draw a line from previousX/previousY to x/y
    ctx.beginPath();
    ctx.moveTo(previousX, previousY);
    ctx.lineTo(x, y);

    //Set the style of the line
    ctx.linewidth = 4;
    ctx.strokeStyle = '#ff0000';
    ctx.stroke();

    //Set previous coordinates for the next move event
    previousX = x;
    previousY = y;
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




