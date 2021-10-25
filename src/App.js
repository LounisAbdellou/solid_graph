import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Trajectories } from 'features/trajectories/Trajectories';
import { Histogram } from 'features/histogram/Histogram';
import { HexMap } from 'common/hexMap/HexMap';
import { Home } from 'common/home/Home';
import graphLogo from 'assets/graphLogo.png';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Router>
                    <Link to="/">
                        <div className="graphLogoContainer">
                            <img src={graphLogo} alt="graphLogo" />
                            <p>Solid Graphs</p>
                        </div>
                    </Link>
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/hex" exact>
                            <HexMap />
                        </Route>
                        <Route path="/histogram" exact>
                            <Histogram />
                        </Route>
                        <Route path="/trajectory" exact>
                            <Trajectories />
                        </Route>
                    </Switch>
                </Router>
            </header>
        </div>
    );
}

export default App;
