import React from "react";
import {Link, Switch, Route, BrowserRouter as Router} from "react-router-dom";   
import TodoList from "../pages/TodoList";
import ListPage from "../pages/ListPage";

function Navbar(){

    return (
    <div>
     <Router>
    <ul id="navbar-ul">
        <Link to="/">
            <li className="navbar-li">TodoList</li>
        </Link>
 
            </ul>
        
        <Switch>
            <Route exact path ="/" component={TodoList}/>

            <Route path="/listpage" component={ListPage}/>
        </Switch>
        </Router>
    </div>
    );
};

export default Navbar;