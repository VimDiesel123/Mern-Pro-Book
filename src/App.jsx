var contentNode = document.getElementById('contents');

const continents = ['Africa','America','Asia','Australia','Europe'];
const message = continents.map(c => `Hello ${c}!`).join(' ');

var component = <h1>{message}</h1>; //A simple JSX component
ReactDOM.render(component, contentNode); //Render the component inside the content Node