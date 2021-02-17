import React from 'react';
import './App.css';

import { Auth0Provider } from "@auth0/auth0-react";

import PrivateRoute from './PrivateRoute';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import ChildPage from './pages/ChildPage';
import AdminPage from './pages/AdminPage';
import ChildrenList from './pages/ChildrenList';
import ChildDeletePage from './pages/ChildDeletePage';

function App() {

  function Home() {
    return (

        <nav>
          <ul>
            <li>
              <Link to="/ChildPage">ChildPage</Link>
            </li>
            <li>
              <Link to="/AdminPage">AdminPage</Link>
            </li>
            <li>
              <Link to="/ChildrenList">ChildrenList</Link>
            </li>
          <li>
              <Link to="/ChildDeletePage">ChildDeletePage</Link>
          </li>
          </ul>
        </nav>

  )
}

  return (
    <Auth0Provider
        domain="dev-ng7oei8x.us.auth0.com"
        clientId="1uRIMljGXoyZAuRVKpmUx8isZbQvB0eo"
        redirectUri={process.env.REACT_APP_AUTH_HOST + "/AdminPage"}
      >
      <Router>
          <Switch>
            <Route path="/ChildPage">
              <ChildPage />
            </Route>
            <Route path="/AdminPage" component={AdminPage} />
            <Route path="/ChildrenList">
              <ChildrenList />
            </Route>
              <Route path="/ChildDeletePage">
                  <ChildDeletePage />
              </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>

      </Router>
</Auth0Provider>
  );
}

export default App;
