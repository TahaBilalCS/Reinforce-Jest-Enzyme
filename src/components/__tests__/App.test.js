import React from "react";
import { mount } from "enzyme";
import App from "../App";
import CommentList from "components/CommentList";
import Root from "Root";
import { MemoryRouter } from "react-router";
let wrapped;

// Before every test, setup
beforeEach(() => {
  wrapped = mount(
    <MemoryRouter initialEntries={["/"]}>
      <Root>
        <App />
      </Root>
    </MemoryRouter>
  );
});

it("shows a comment list", () => {
  expect(wrapped.find(CommentList).length).toEqual(1);
});
