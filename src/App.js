import React from 'react';
import './App.css';
//import { IdentityContextProvider } from "react-netlify-identity";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import ChildPage from './pages/ChildPage';
import AdminPage from './pages/AdminPage';
import ChildrenList from './pages/ChildrenList';

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
          </ul>
        </nav>

  )
}
  return (
    <Router>


        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/ChildPage">
            <ChildPage />
          </Route>
          <Route path="/AdminPage">
            <AdminPage />
          </Route>
          <Route path="/ChildrenList">
            <ChildrenList />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

    </Router>
  );
}

export default App;
