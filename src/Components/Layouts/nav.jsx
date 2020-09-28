import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import { Link } from "react-router-dom";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function CheckLoggedIn(props) {
  if (window.sessionStorage.getItem("loggedIn") === "True") {
    return (
      <React.Fragment>
        <li>
          <Link
            className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
            to={`/feed`}
          >
            Feed
          </Link>
        </li>
        <li>
          <Link
            className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
            to={`/user/${window.sessionStorage.getItem("userId")}`}
          >
            Profile
          </Link>
        </li>
        <li>
          <div
            className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
            onClick={() => props.LogOut()}
          >
            Log Out
          </div>
        </li>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <li>
          <Link
            className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
            to="/login"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
            to="/register"
          >
            Sign Up
          </Link>
        </li>
      </React.Fragment>
    );
  }
}

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar className={classes.root} position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">Cafe React</Link>
          </Typography>
          <Link to="/new">
            <Button color="inherit">
              <svg
                width="2rem"
                height="2rem"
                viewBox="0 0 16 16"
                className="bi bi-plus"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"
                />
                <path
                  fillRule="evenodd"
                  d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"
                />
              </svg>
            </Button>
          </Link>
          <Link to="/search">
            <Button color="inherit">
              <img
                src="https://img.icons8.com/pastel-glyph/36/000000/search--v2.png"
                alt="Search"
              />
            </Button>
          </Link>
          <Button className="dropdown" color="inherit">
            <div className="dropdown inline-block relative">
              <img
                src="https://img.icons8.com/material-outlined/36/000000/user-male-circle.png"
                alt="profile"
              />
              <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                {CheckLoggedIn(props)}
              </ul>
            </div>
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
