import redux, {createStore} from 'redux';

console.log('Starting redux example');

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

const store = createStore(reducer);

const currentState = store.getState();
console.log('currentState', currentState);

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Andrew'
});

console.log('Name should be Andrew', store.getState());
