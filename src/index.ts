// console.log('Hello World!');
// console.log('Log another line');

// function sayHello(name:string){
//     console.log('Hello ' + name + '!')
// }

// sayHello('Adonai');
// to apply changes you need to run webpack again to re-bundle everything
// unless you set up scripts in package.json to do it for you


import { Canvas, Component } from './widget';


const canvas = new Canvas(document.body);
console.log(canvas);

const firstComponent = new Component();
console.log(firstComponent);
console.log(firstComponent.shape);
console.log(firstComponent.shape.attributes);