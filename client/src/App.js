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
import CreateYourVision from './components/CreateYourVision/createYourVision';
import Home from './components/Home/home';
import Signup from './components/Signup/signup';
import Login from './components/Login/login';
import Design from "./components/Design/design";
import ProfileForm from "./components/ProfileForm/profileForm";

import Sidebar from './components/Sidebar/sidebar';
import "./App.css";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
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
          <Routes>
            <Route
              path="/createyourvision"
              element={<CreateYourVision collapsed={isSidebarCollapsed} />}
            />
            <Route
              path="/design"
              element={<Design collapsed={isSidebarCollapsed} />}
            />
            <Route
              path="/"
              element={<Home collapsed={isSidebarCollapsed} />}
            />
            <Route
              path="/login"
              element={<Login collapsed={isSidebarCollapsed} />}
            />
            <Route
              path="/signup"
              element={<Signup collapsed={isSidebarCollapsed} />}
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
