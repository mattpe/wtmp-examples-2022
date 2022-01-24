// Ajastus
let counter = 0;
const timer = setInterval(() => {
  console.log("The tick");
  counter++;
  if (counter > 9) {
    clearInterval(timer);
    console.log('loppu');
  }
}, 500);

console.log('kukkuu');
console.log(timer);

// Events
const clickHandler = () => {
  console.log('p clicked');
};

// document.querySelector('p').addEventListener('click', clickHandler);
document.querySelector('p').addEventListener('click', event => {
  console.log('p clicked', event);
  if (event.altKey) {
    console.log('p clicked with alt');
    event.stopPropagation();
  }
});

document.querySelector('#content').addEventListener('click', event => {
  console.log('div clicked');
});

// keyboard events

let keyHistory = [];
document.addEventListener('keyup', event => {
  // console.log('key event', event.key);
  keyHistory.push(event.key);
  if (event.key === 'Enter') {
    console.log(keyHistory);
    keyHistory = [];
  }
});

// CustomEvent
document.addEventListener('myMessage', event => {
  console.log('got a message:', event.detail.msg);
});

const myEvent = new CustomEvent('myMessage', {detail: {msg: 'Hello!'}});
setInterval(() => {
  document.dispatchEvent(myEvent);
}, 2000);

// testing draggable.js
import {Sortable} from '@shopify/draggable';
// console.log(new Sortable());

new Sortable(document.querySelectorAll('ul'), {
  draggable: 'li'
});
