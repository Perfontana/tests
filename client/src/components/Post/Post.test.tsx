import React from "react";
import { render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import Post, { PayloadPosts } from "./Post";
import store from "../../redux/store";
import { loginSuccessed } from "../../redux/actions/auth";

const setToken = (
  store: typeof import("../../redux/store").default,
  token: string
) => {
  localStorage.setItem("token", token);

  store.dispatch(
    loginSuccessed({
      candidate: {
        avatar: "image.png",
        id: 1,
        email: "test@mail.com",
        username: "test user",
      },
      token,
    }) as any
  );
};

const defaultPost = {
  id: 1,
  text: "Test post body",
  title: "Test post title",
  user: {
    id: 1,
    username: "test user",
  },
  image: "/image.png",
  tags: "tag1, tag2",
};

describe("Post component tests", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("renders post data", () => {
    render(
      <Provider store={store}>
        <Post post={defaultPost} />
      </Provider>
    );

    expect(screen.getByText(defaultPost.title)).toBeInTheDocument();
    expect(screen.getByText(defaultPost.text)).toBeInTheDocument();
    expect(screen.getByText(defaultPost.tags)).toBeInTheDocument();
    expect(screen.getByText(defaultPost.user.username)).toBeInTheDocument();
  });

  it("renders buttons when user is logged in", () => {
    setToken(store, "test-token");

    render(
      <Provider store={store}>
        <Post post={defaultPost} isUserPage postsModal={() => null} />
      </Provider>
    );

    expect(screen.getByTestId("post-edit-btn")).toBeInTheDocument();
  });

  it("opens modal when edit button is clicked", () => {
    setToken(store, "test-token");

    const modal = jest.fn();

    render(
      <Provider store={store}>
        <Post post={defaultPost} isUserPage postsModal={modal} />
      </Provider>
    );

    screen.getByTestId("post-edit-btn").click();

    expect(modal).toBeCalledTimes(1);
  });

  it("doesn't render image on posts without image", () => {
    const post = {
      ...defaultPost,
      image: undefined,
    };

    render(
      <Provider store={store}>
        <Post post={post} />
      </Provider>
    );

    expect(screen.queryByTestId("post-image")).toBe(null);
  });

  it("creates an image link to use in src when post.image is not a valid link", () => {
    const expectedLink = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_IMAGES_URL}${defaultPost.image}`;

    render(
      <Provider store={store}>
        <Post post={defaultPost} />
      </Provider>
    );

    const imgElement = screen.queryByTestId(
      "post-image"
    ) as HTMLImageElement | null;

    expect(imgElement?.src).toBe(expectedLink);
  });

  it("uses post.image in src when it is a valid link", () => {
    const expectedLink = "https://example.com/test_image.png";

    const post = {
      ...defaultPost,
      image: expectedLink,
    };

    render(
      <Provider store={store}>
        <Post post={post} />
      </Provider>
    );

    const imgElement = screen.queryByTestId(
      "post-image"
    ) as HTMLImageElement | null;

    expect(imgElement?.src).toBe(expectedLink);
  });
});
