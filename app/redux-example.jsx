import redux, {createStore, subscribe, compose} from 'redux';

console.log('Starting redux example');

//-- REDUCER ------
const reducer = (state = {name: 'Anonymous'}, action) => {
  // state = state || {name: 'Anonymous'};
  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      }
    default:
      return state;
  }
};



//-- STORE ------
const store = createStore(reducer, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));


//-- SUBSCRIBE ------
let unsubscribe = store.subscribe(() => {
  let state = store.getState();

  console.log('Name is', state.name);
  document.getElementById('app').innerHTML = state.name;
})
// unsubscribe();


const currentState = store.getState();
console.log('currentState', currentState);

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Andrew'
});



store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Emily'
})
