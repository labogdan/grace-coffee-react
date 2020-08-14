import React from 'react';
import './App.css';

//import { IdentityContextProvider } from "react-netlify-identity";
import { useIdentityContext, IdentityContextProvider } from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css"

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

  const url = "https://adoring-aryabhata-fa0f74.netlify.app/"
  const IdentityModal = React.lazy(() => import("react-netlify-identity-widget"))
  const identity = useIdentityContext()
  const [dialog, setDialog] = React.useState(false)
  const isLoggedIn = identity && identity.isLoggedIn

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
              <button className="btn" onClick={() => setDialog(isLoggedIn)}>
                {isLoggedIn ? "LOG OUT" : "LOG IN"}
              </button>
              <React.Suspense fallback="loading...">
                <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
              </React.Suspense>
            </li>
          </ul>
        </nav>

  )
}
  return (
    <IdentityContextProvider value={url}>
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
    </IdentityContextProvider>
  );
}

export default App;
