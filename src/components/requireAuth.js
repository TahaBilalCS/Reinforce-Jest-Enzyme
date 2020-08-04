import React from "react";
import { connect } from "react-redux";
// Higher Order Component
export default (ChildComponent) => {
  class ComposedComponent extends React.Component {
    componentDidMount() {
      this.shouldNavAway();
    }

    // Component received new set of props
    componentDidUpdate() {
      this.shouldNavAway();
    }

    shouldNavAway() {
      if (!this.props.auth) {
        this.props.history.push("/");
      }
    }
    // Pass in ...this.props to child component, since we pass action create submit comment into this one before CommentBox
    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth };
  }

  return connect(mapStateToProps)(ComposedComponent);
};
