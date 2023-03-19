import React from "react";
import "./index.css";
import App from "./App";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/configureStore";
import reportWebVitals from "./reportWebVitals";
import { apolloClient } from "./graphql";
import { ApolloProvider } from "@apollo/client";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
