function Order(r) {
  this.route = r;
  this.fitness;
}

function Population() {
  this.recordDistance = Infinity;
  this.optimalRoute = null;
  this.currentRoute = null;
  this.generation = 0;

  this.cities = [];
  this.cityOrder = [];

  this.orders = [];

  this.color = color('#777777');
}

Population.prototype.generateCities = function(count) {
  this.cities = [];
  this.cityOrder = [];

  for (var i = 0; i < count; i++) {
    let randomX = random(width*0.2, width*0.8);
    let city = createVector(randomX, random(height/2));
    this.cities[i] = city;
    this.cityOrder[i] = i;
  }
}

Population.prototype.generateOrders = function(count) {
  this.orders = [];

  for (var i = 0; i < count; i++) {
    let order = new Order(shuffle(this.cityOrder));
    this.orders[i] = order;
  }
}

Population.prototype.calculateFitness = function() {
  let currentRecordDistance = Infinity;

  for (var i in this.orders) {
    let d = calculateDistanceTotal(this.cities, this.orders[i].route);

    if (d < this.recordDistance) {
      this.recordDistance = d;
      this.optimalRoute = this.orders[i].route.slice();
    }

    //recordDistance for each generation
    if (d < currentRecordDistance) {
      currentRecordDistance = d;
      this.currentRoute = this.orders[i].route.slice();
    }
    this.orders[i].fitness = 1 / (d+1);
  }
}

Population.prototype.normalizeFitness = function() {
  let totalFitness = 0;
  let p = this.orders;

  for (var i in p) {
    totalFitness += p[i].fitness;
  }

  for (var i in p) {
    p[i].fitness /= totalFitness;
  }
}

Population.prototype.newGeneration = function(mR) {
  let newOrders = [];
  let probabilities = [];

  for (var i in this.orders) {
    probabilities[i] = this.orders[i].fitness;
  }

  for (var i in this.orders) {
    let orderA = this.selectA(this.orders, probabilities);
    let orderB = this.selectA(this.orders, probabilities);
    let route = this.crossOver(orderA.route, orderB.route);
    this.mutate(route, mR);
    newOrders[i] = new Order(route);
    // this.mutate(orderA.route, mR);
    // newOrders[i] = orderA;
  }

  this.orders = newOrders;
  this.generation += 1;
}

Population.prototype.selectA = function(list, prob) {
  let index = 0;
  let r = random(1);

  while (r > 0) {
    r = r - prob[index];
    index++;
  }

  index--;
  return list[index];
}

Population.prototype.crossOver = function(a, b) {
  let start = floor(random(a.length));
  let end = floor(random(start+1, a.length));
  let newOrder = a.slice(start, end);

  for (var i in b) {
    if (!newOrder.includes(b[i])) {
      newOrder.push(b[i]);
    }
  }

  return newOrder;
}

Population.prototype.mutate = function(list, rate) {
  //Mutations proportional to number of cities?
  for (var i = 0; i < this.cities.length; i++) {
    if (random(1) <= rate) {
      let indexA = floor(random(list.length));
      let indexB = (indexA + 1) % list.length;
      swap(list, indexA, indexB);
    }
  }
}

Population.prototype.render = function() {
  this.drawPaths(this.cities, this.optimalRoute);
  translate(0, height/2);
  this.drawPaths(this.cities, this.currentRoute);
}

Population.prototype.drawPaths = function(points, route) {

  beginShape();
  for (var i in route) {
    stroke(this.color);
    strokeWeight(2);
    noFill();
    vertex(points[route[i]].x, points[route[i]].y);
  }
  endShape();

  for (var i in points) {
    fill(this.color);
    noStroke();
    ellipse(points[i].x, points[i].y, 8, 8);
  }
}
