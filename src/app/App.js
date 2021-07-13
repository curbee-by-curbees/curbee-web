import { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Home from '../home/Home';
import AuthPage from '../auth/AuthPage';
import ListingsPage from '../listings/ListingsPage';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';
import ListingDetail from '../listingDetail/ListingDetail';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Header/>
          <main>

            <Switch>
              <Route path="/" exact={true}
                render={routerProps => (
                  <Home {...routerProps}/>
                )}
              />

              <Route path="/auth" exact={true}
                render={routerProps => (
                  <AuthPage {...routerProps}/>
                )}
              />

              <Route path="/listings" exact={true}
                render={routerProps => (
                  <ListingsPage {...routerProps}/>
                )}
              />

              <Route path="/listings/:id"
                render={routerProps => (
                  <ListingDetail {...routerProps}/>
                )}
              />

              <Redirect to="/" />

            </Switch>
          </main>
          <Footer/>
        </Router>
      </div>
    );
  }

}

export default App;
