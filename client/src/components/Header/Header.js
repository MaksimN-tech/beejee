import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { LOGOUT_ADMIN } from "../../redux/actionTypes/actionTypes";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: "#ffffff !important",
  },
}));

export default function Header() {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  function logout() {
    dispatch({ type: LOGOUT_ADMIN, payload: false });
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {!token && (
            <Link to="/login">
              <Button className={classes.title} color="secondary">
                Login
              </Button>
            </Link>
          )}
          {token && (
            <Button
            type="submit"
              onClick={() =>logout()}
              className={classes.title}
              color="secondary"
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
