import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css'; 
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/Nav";
import Trending from './components/Pages/Trending/Trending';
import Movies from './components/Pages/Movies/Movies';
import Series from './components/Pages/Series/Series';
import Search from './components/Pages/Search/Search';

function App(){
    return (
        <Router> 
            <Header /> 
            <div className="app"> 
                <Container> 
                    <Switch> 
                        <Route exact path='/' component={Trending} />
                        <Route path='/movies' component={Movies} />
                        <Route path='/series' component={Series} /> 
                        <Route path='/search' component={Search} /> 
                    </Switch>
                </Container>  
            </div>
            <SimpleBottomNavigation /> 
        </Router>
    );
}

export default App;