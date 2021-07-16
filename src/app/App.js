import { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
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
<<<<<<< HEAD
=======
import Settings from '../settings/Settings';
>>>>>>> e0ac1466c295396a8f332afcc9ad406b939cfdcd

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Header/>
          <main>

            <Switch>
              {/* <Route path="/" exact={true}
                render={routerProps => (
                  <Home {...routerProps}/>
                )}
              /> */}

              <Route path="/" exact={true}
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

              <Route path="/settings"
                render={routerProps => (
                  <Settings {...routerProps}/>
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
