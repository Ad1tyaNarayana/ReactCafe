import React, { Component } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Nav from "./Layouts/nav.jsx";
import Cafes from "./Cafe/cafes";
import Cafe from "./Cafe/cafe";
import EditCafe from "./Cafe/edit";
import EditComment from "./Comment/edit";
import Register from "./Auth/register";
import PrivateRoute from "./ProtectedRoutes";
import UserProfile from "./SearchAndProfile/UserProfile";
import Search from "./SearchAndProfile/search";
import Login from "./Auth/login";

export default class App extends Component {
  LogIn = (data) => {
    window.sessionStorage.setItem("token", data.token);
    window.sessionStorage.setItem("loggedIn", "True");
    window.sessionStorage.setItem("userId", data.userId);
  };

  LogOut = () => {
    window.sessionStorage.setItem("token", "");
    window.sessionStorage.setItem("loggedIn", null);
    window.sessionStorage.setItem("userId", "");
    window.location.href = "/";
  };

  render() {
    return (
      <HashRouter>
        <Nav LogOut={this.LogOut} />
        <Switch>
          <Route exact path="/" component={Cafes} />
          <PrivateRoute path="/feed" exact component={PrivateRoute} />
          <PrivateRoute path="/new" exact component={PrivateRoute} />
          <Route
            exact
            path="/register"
            component={() => <Register LogIn={this.LogIn} />}
          />
          <Route
            exact
            path="/login"
            component={() => <Login LogIn={this.LogIn} />}
          />
          <Route exact path="/user/:profile" component={UserProfile} />
          <Route exact path="/post/:id" component={Cafe} />
          <Route exact path="/post/:id/edit" component={EditCafe} />
          <Route
            exact
            path="/post/:id/comments/:comment"
            component={EditComment}
          />
          <Route exact path="/search" component={Search} />
          <Route path="*" component={Cafes} />
        </Switch>
      </HashRouter>
    );
  }
}
