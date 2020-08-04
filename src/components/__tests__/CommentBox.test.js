import React from "react";
import { mount } from "enzyme";
import CommentBox from "components/CommentBox";
import Root from "Root";
import { MemoryRouter } from "react-router";
let wrapped;
beforeEach(() => {
  const initialState = {
    auth: true,
  };
  wrapped = mount(
    <MemoryRouter initialEntries={["/post"]}>
      <Root initialState={initialState}>
        <CommentBox />
      </Root>
    </MemoryRouter>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it("has a text area and two buttons", () => {
  expect(wrapped.find("textarea").length).toEqual(1);
  expect(wrapped.find("button").length).toEqual(2);
});

describe("the text area", () => {
  beforeEach(() => {
    wrapped.find("textarea").simulate("change", {
      target: { value: "new comment" },
    });
    wrapped.update();
  });

  it("has a text area that users can type in", () => {
    expect(wrapped.find("textarea").prop("value")).toEqual("new comment");
  });

  it("when form is submitted, text area gets emptied", () => {
    wrapped.find("form").simulate("submit");
    wrapped.update();
    expect(wrapped.find("textarea").prop("value")).toEqual("");
  });
});
