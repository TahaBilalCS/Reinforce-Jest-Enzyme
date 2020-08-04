import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
//import reduxPromise from "redux-promise";
import stateValidator from "middlewares/stateValidator";
import async from "middlewares/async";
import reducers from "reducers";

// Can't pass comments in props of CommentList here because it gets overriden by mapStateToProps in CommentList
// So in Root here, we change empty state object to props.initialState
// Changed from default (props)
export default ({ children, initialState = {} }) => {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(async, stateValidator) // Teaches redux how to deal with async action creators
  );
  return <Provider store={store}>{children}</Provider>;
};
