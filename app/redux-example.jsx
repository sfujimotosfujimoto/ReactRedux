import redux from 'redux';

console.log('Starting redux example');

// Pure function
function add(a, b) {
  return a + b;
}

let a = 3;
function add (b) {
  return a + b;
}

let result;
function add (a, b) {
  result = a + b;
  return result;
}

function add (a, b ) {
  return a + b + new Date().getSeconds();
}

function changeProp(obj) {
  return {
    ...obj,
    name: 'Jen'
  }
}

let startingValue = {
  name: 'Andrew',
  age: 25
}

let res = changeProp(startingValue);
console.log(startingValue);
console.log(res);
