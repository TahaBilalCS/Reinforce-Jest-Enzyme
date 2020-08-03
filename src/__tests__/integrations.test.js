import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";
import Root from "Root";
import App from "components/App";

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
  // Attempt to render App
  const wrapped = mount(
    <Root>
      <App />
    </Root>
  );
  // Click fetchComments button
  wrapped.find(".fetch-comments").simulate("click");

  // Jest doesn't handle setTimeouts that well as it instantly runs all lines and sees if there is an error
  // To avoid this we add done callback to make jest wait to see if there are any actual errors
  // Replace setTimeout with moxios.wait
  moxios.wait(() => {
    // Update new components/elements
    wrapped.update();

    // Expect to find a list of comments
    expect(wrapped.find("li").length).toEqual(2);
    done();
    wrapped.unmount();
  });
});
