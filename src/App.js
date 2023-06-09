import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/Nav";
import Popular from './Pages/Popular/Popular';
import GenreChart from './Pages/GenreChart/GenreChart';

function App() {
  return (
    <Router>
      <Header />
      <div className="app">
        <div className="background-images"></div>
        <Container maxWidth="lg">
          <Switch>
            <Route exact path="/" component={Popular} />
            <Route path="/genrecharts" component={GenreChart} />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </Router>
  );
}

export default App;