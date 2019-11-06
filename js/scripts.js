var repository = [
  { name: "Bulbasaur", height: 0.7, types: ["grass"] },
  { name: "Charmander", height: 0.6, types: ["fire"] },
  { name: "Squirtle", height: 0.5, types: ["water"] }
];

// for (i = 0; i < repository.length; i++) {
//   if (repository[i].height >= 0.7) {
//     document.write(repository[i].name + " (height:" + repository[i].height + ")" + " - Wow, that's big!");
//     document.write("<br>");
//   } else {
//     document.write(repository[i].name + " (height:" + repository[i].height + ")");
//     document.write("<br>");
//   }
// }

repository.forEach(function (item) {
  console.log(pokemonRepository);
  document.write(item.name + " (height: " + item.height + "m" + ") " + item.types + "<br>");
});

// function divide(dividend, divisor) {
//   if (divisor === 0) {
//     return "You're trying to divide by zero."
//   }
//   else {
//     var result = dividend / divisor;
//     return result;
//   }
// }

//check in console using console.log(divide(4,2));

