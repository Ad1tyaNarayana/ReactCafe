import { useLocation, Route, Redirect } from "react-router-dom";
import NewCafe from "./Cafe/new";
import Feed from "./SearchAndProfile/feed";
import React from "react";

export default function PrivateRoute(props) {
  const location = useLocation();
  return (
    <Route
      render={(props) =>
        window.sessionStorage.getItem("loggedIn") === "True" ? (
          location.pathname === "/feed" ? (
            <Feed />
          ) : (
            <NewCafe />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
