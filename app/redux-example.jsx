import redux, {createStore} from 'redux';

console.log('Starting redux example');

const reducer = (state = {name: 'Anonymous'}, action) => {
  // state = state || {name: 'Anonymous'};

  return state;
};

const store = createStore(reducer);

const currentState = store.getState();
console.log('currentState', currentState);
