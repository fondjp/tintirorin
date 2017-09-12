var pips = [];

function dice() {
  return Math.floor(Math.random() * 6) + 1;
}

for (var i = 0; i < 3; i++) {
  pips.push(dice());
}

pips.sort(function (a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
});

console.log(pips);