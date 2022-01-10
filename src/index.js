/**
 * Week 1 examples
 */

// console.log('Hello console!');
// console.log('moro viikko1');

// let number = 3;

// const array = ['a', 'b'];
// array.push('c');
// console.log(array);

let number = 4;

const powerIterative = (base, exponent) => {
  result = 1;
  for (expo = 1; expo <= exponent; expo++) {
    result *= base;
  }
  console.log("kukkuu");
  return result + number;
};


console.log(powerIterative(2, 3));
console.log(powerIterative(2, 3));
