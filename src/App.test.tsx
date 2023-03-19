import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./redux/configureStore";
import App from "./App";
import { ApolloProvider } from "@apollo/client/react";
import { MockedProvider } from "@apollo/client/testing";
import { apolloClient } from "./graphql";
import { graphqlQuery } from "./graphql/users-schema";

describe("Start rendering", () => {
  test("starts loading`", () => {
    const mockState = {
      users: [],
      loading: true,
      error: null,
    };
    jest.mock("./redux/hooks", () => ({
      useAppSelector: jest.fn().mockReturnValue(mockState),
      useAppDispatch: jest.fn(),
    }));
    render(
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>{<App />}</ApolloProvider>
      </Provider>
    );
    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
  });

  test("Users display", async () => {
    const queryMock = {
      request: {
        query: graphqlQuery,
      },
    };

    const mockState = {
      users: [
        {
          id: "1",
          name: "John Doe",
          username: "johndoe",
        },
      ],
      loading: false,
      error: null,
    };

    jest.mock("./redux/hooks", () => ({
      useAppSelector: jest.fn().mockReturnValue(mockState),
    }));

    render(
      <Provider store={store}>
        <MockedProvider mocks={[queryMock]} addTypename={false}>
          <App />
        </MockedProvider>
      </Provider>
    );
    const Search = await screen.findByTestId("main-block");
    expect(Search).toBeInTheDocument();
  });
});
