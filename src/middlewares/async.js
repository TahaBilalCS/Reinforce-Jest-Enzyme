// Making our own version of redux-promise middleware

// Author of Redux made middleware signature look like this, nested return functions
// Middleware is a curried function
export default ({ dispatch }) => (next) => (action) => {
  // Check to see if action has a promise on payload property
  // If yes, wait for it to resolve

  // If no, send action to the next middleware
  if (!action.payload || !action.payload.then) {
    return next(action);
  }

  // We want to wait for promise to resolve and then create a new action with that data and dispatch
  action.payload.then(function (response) {
    const newAction = { ...action, payload: response };
    dispatch(newAction); // Sends action through all middlewares again
  });
};

// Similar syntax
// export default function({dispatch}){
//     return function(next){
//         return function(action){

//         }
//     }
// }
