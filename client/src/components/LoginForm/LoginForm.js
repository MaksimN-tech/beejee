import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { INIT_ADMIN } from "../../redux/actionTypes/actionTypes";
import { useDispatch } from "react-redux";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const token = localStorage.getItem("token");
  const isAuth = useSelector((state) => state.admin.isAuth);

  function loginHandler(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const password = e.target.password.value;
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    })
      .then((res) => res.json())
      .then((data) => dispatch({ type: INIT_ADMIN, payload: data.token }));
  }

  return (
    <>
      {!token && !isAuth ? (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form
              onSubmit={(event) => {
                loginHandler(event);
              }}
              className={classes.form}
              noValidate
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Typography component="h4" variant="inherit">
                Message
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    Back
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Successful Login
            </Typography>
            <Avatar className={classes.avatar}>
              <DoneOutlineIcon />
            </Avatar>
            <Grid container>
              <Grid item xs>
                <Link className={classes.paper} href="/" variant="body1">
                  Back to main page
                </Link>
              </Grid>
            </Grid>
          </div>
        </Container>
      )}
    </>
  );
}
