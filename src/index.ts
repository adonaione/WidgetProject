// console.log('Hello World!');
// console.log('Log another line');

// function sayHello(name:string){
//     console.log('Hello ' + name + '!')
// }

// sayHello('Adonai');
// to apply changes you need to run webpack again to re-bundle everything
// unless you set up scripts in package.json to do it for you


import { Canvas, Component, RightLeaningContainer, CircleContainer } from './widget';


const canvas = new Canvas(document.body);
canvas.state = {action: 'rules', firstName: 'Adonai', city: 'Albuquerque'}
console.log(canvas);

const firstComponent = new Component();
firstComponent.shape = new CircleContainer();
console.log(firstComponent);
console.log(firstComponent.shape);
console.log(firstComponent.shape.attributes);

firstComponent.height = 4;
firstComponent.width = 4;
firstComponent.locationLeft = 3;

firstComponent.shape.backgroundColor = 'red';
firstComponent.shape.borderStyle = 'dashed';
firstComponent.shape.borderWidth = '5px';

canvas.addComponent(firstComponent);

const secondComponent = new Component();
secondComponent.shape = new RightLeaningContainer();
secondComponent.locationLeft = 4;
secondComponent.locationTop = 2;
secondComponent.shape.zIndex = 1;
secondComponent.content = '<h3>TypeScript {{ action }}!</h3>'


const newComponent = new Component();
newComponent.locationLeft = 3;
newComponent.locationTop = 5;
newComponent.content = '<p>Hello I am {{ firstName }} from {{ city }}'


canvas.state = { city: 'New York' }


canvas.addComponent(secondComponent);
