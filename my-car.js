class Car {
  constructor(params) {
    this.name = params;
    console.dir(this.constructor === Car);
  }

  drive() {
    console.log(this.name + "が走ってます");
  }
}

let myCar = new Car("mine");
myCar.drive();