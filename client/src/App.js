import React, { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Background from './components/Background/background';
import Home from './components/Home/home';
import Signup from './components/Signup/signup';
import Login from './components/Login/login';
import ProfileForm from "./components/ProfileForm/profileForm";

import Sidebar from './components/Sidebar/sidebar';
import "./App.css";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Background />
          <Sidebar collapsed={isSidebarCollapsed} setCollapsed={setIsSidebarCollapsed} />
          {/* <Nav /> */}
          <Routes>
            <Route
              path="/"
              element={<Home collapsed={isSidebarCollapsed} />}
            />
            <Route
              path="/signup"
              element={<Signup collapsed={isSidebarCollapsed} />}
            />
            <Route
              path="/login"
              element={<Login collapsed={isSidebarCollapsed} />}
            />
            <Route
              path="/profile"
              element={<ProfileForm collapsed={isSidebarCollapsed} />}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider >
  );
}

export default App;
