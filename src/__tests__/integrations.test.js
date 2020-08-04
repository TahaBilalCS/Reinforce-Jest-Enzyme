import React from "react";
import { mount, ReactWrapper } from "enzyme";
import moxios from "moxios";
import Root from "Root";
import App from "components/App";
import CommentBox from "components/CommentBox";
import CommentList from "components/CommentList";
import { MemoryRouter } from "react-router";
beforeEach(() => {
  moxios.install();
  moxios.stubRequest("http://jsonplaceholder.typicode.com/comments", {
    status: 200,
    response: [{ name: "Fetched #1" }, { name: "Fetched #2" }],
  });
});

afterEach(() => {
  moxios.uninstall();
});
it("can fetch a list of comments and display them", (done) => {
  const initialState = {
    auth: true,
  };
  // Attempt to render App
  let wrapped = mount(
    <MemoryRouter initialEntries={["/post"]}>
      <Root initialState={initialState}>
        <App />
      </Root>
    </MemoryRouter>
  );
  expect(wrapped.find(CommentBox)).toHaveLength(1);

  // Click fetchComments button
  wrapped.find(".fetch-comments").simulate("click");

  // Jest doesn't handle setTimeouts that well as it instantly runs all lines and sees if there is an error
  // To avoid this we add done callback to make jest wait to see if there are any actual errors
  // Replace setTimeout with moxios.wait
  moxios.wait(() => {
    // Update new components/elements

    wrapped.find(App).find("Link.link-home").simulate("click", { button: 0 }); // Redirect FROM /posts to /, Link needs a {button: 0} attr to work properly
    wrapped.update();
    expect(wrapped.find(CommentList)).toHaveLength(1); //FAILS HERE
    // Expect to find a list of comments
    expect(wrapped.find(".fetch-list").length).toEqual(2);
    done();
    wrapped.unmount();
  });
});
