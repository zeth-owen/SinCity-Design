import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Navigation from './Navigation';
import { CurrentUserProvider } from './contexts/CurrentUser';
import LoginForm from './users/LoginForm';
import SignUpForm from './users/SignUpForm';
import './App.css';
import AppSearch from './apps/AppSearch';
import SiteSearch from './websites/SiteSearch';
import PhotoSearch from './photography/PhotoSearch';
import ShowPage from './websites/ShowPage';
import AppShowPage from './apps/AppShowPage';
import PhotoShowPage from './photography/PhotoShowPage'; 

function App() {
  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/sign-up" component={SignUpForm} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/apps" component={AppSearch} />
          <Route exact path="/apps/:id" component={AppShowPage} />
          <Route exact path="/websites" component={SiteSearch} />
          <Route exact path="/templates/:id" component={ShowPage} />
          <Route exact path="/photography" component={PhotoSearch} />
          <Route exact path="/photography/:id" component={PhotoShowPage} />
        </Switch>
      </BrowserRouter>
    </CurrentUserProvider>
  );
}

export default App;




