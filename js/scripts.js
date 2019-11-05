var repository = [
  { name: "Bulbasaur", height: 0.7, types: ["grass"] },
  { name: "Charmander", height: 0.6, types: ["fire"] },
  { name: "Squirtle", height: 0.5, types: ["water"] }
];

for (i = 0; i < repository.length; i++) {
  if (repository[i].height >= 0.7) {
    document.write(repository[i].name + " (height:" + repository[i].height + ")" + " - Wow, that's big!");
    document.write("<br>");
  } else {
    document.write(repository[i].name + " (height:" + repository[i].height + ")");
    document.write("<br>");
  }
}

// var size = 100;
// var doubleSize = size * 2;
// var minSize = (doubleSize * 2) - (size / 2);
