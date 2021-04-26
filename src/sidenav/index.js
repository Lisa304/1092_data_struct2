import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './sidenavLayout';
import Knapsack from '../knapsack';
import Binary from "../binary";
import Prim from "../prim";
import Nurse from '../nurse';
import Doomday from "../doom";

const NavBarRouter = () => {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route path="/knapsack" component={Knapsack} />
                    <Route path="/binary" component={Binary} />
                    <Route path="/prim" component={Prim} />
                    <Route path="/nurse" component={Nurse} />
                    <Route path="/doomday" component={Doomday} />
                </Switch>
            </Layout>
        </Router>
    )

}

export default NavBarRouter;