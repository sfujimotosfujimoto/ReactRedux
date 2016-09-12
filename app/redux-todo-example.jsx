import redux, {createStore} from 'redux';

console.log('Starting redux example');

const defaultState = {
  searchText: '',
  showCompleted: false,
  todos: []
}

const reducer = (state = defaultState, action) => {
  // state = state || {name: 'Anonymous'};

  return state;
};

const store = createStore(reducer);

const currentState = store.getState();
console.log('currentState', currentState);
