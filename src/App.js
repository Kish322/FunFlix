import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/Nav";
import Trending from './components/Pages/Trending/Trending';
import GenreChart from './components/Pages/GenreChart/GenreChart';

import Search from './components/Pages/Search/Search';

function App() {
  return (
    <Router>
      <Header />
      <div className="app">
        <div className="background-images"></div>
        <Container maxWidth="lg">
          <Switch>
            <Route exact path="/" component={Trending} />
            <Route path="/genrecharts" component={GenreChart} />
            <Route path="/search" component={Search} />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </Router>
  );
}

export default App;