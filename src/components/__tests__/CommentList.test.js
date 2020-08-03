import React from "react";
import { mount } from "enzyme";
import CommentList from "components/CommentList";
import Root from "Root";

let wrapped;

// Can't pass comments in props of CommentList here because it gets overriden by mapStateToProps in CommentList
// So in Root, we change empty state object to props.initialState and pass it in here as props
beforeEach(() => {
  const initialState = {
    comments: ["Comment 1", "Comment 2"],
  };
  wrapped = mount(
    <Root initialState={initialState}>
      <CommentList />
    </Root>
  );
});

it("creates one <li> per comment", () => {
  expect(wrapped.find("li").length).toEqual(2);
});

it("shows the text for each comment", () => {
  // render().text() returns all text in that component without HTML
  expect(wrapped.render().text()).toContain("Comment 1");
  expect(wrapped.render().text()).toContain("Comment 2");
});
