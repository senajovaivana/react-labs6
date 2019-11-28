import React from 'react'
import PageEmployee from "./PageEmployee";
import PageEmployeesList from "./PageEmployeesLisť";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

const App = () => (
    <>
        <Router>
            <Switch>
                <Route exact path="/" component={PageEmployeesList}/>
                <Route exact path="/new" component={PageEmployee}/>
            </Switch>
        </Router>
    </>
);

export default App