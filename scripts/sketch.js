var population;
var populationSize = 500;

var cityCount = 20;

var mutationRate = 0.5;

function setup() {
  createCanvas(windowWidth*0.6, 400).parent("canvas-0");

  population = new Population(populationSize);

  population.generateCities(cityCount);
  population.generateOrders(populationSize);
}

function windowResized() {
  resizeCanvas(windowWidth*0.6, 400);
  population = new Population(populationSize);

  population.generateCities(cityCount);
  population.generateOrders(populationSize);
}

function draw() {
  background(255);
  population.render();
  population.calculateFitness();
  population.normalizeFitness();
  population.newGeneration(mutationRate);
}

function calculateDistanceTotal(c, o) {
  let total = 0;

  for (let i = 0; i < o.length-1; i++) {
    let a = c[o[i]];
    let b = c[o[i + 1]];
    let d = dist(a.x, a.y, b.x, b.y);
    total += d;
  }

  return total;
}

function swap(list, a, b) {
  let temp = list[a];
  list[a] = list[b];
  list[b] = temp;
}

function testNormal() {
  let total = 0;

  for (var i in population.orders) {
    total += population.orders[i].fitness;
  }

  if (floor(total) == 1) {
    console.log('success!');
  } else {
    console.log('failed.');
  }
}
