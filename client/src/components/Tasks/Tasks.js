import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { INIT_TASKS, TURN_PAGE } from "../../redux/actionTypes/actionTypes";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import CircularProgress from "@material-ui/core/CircularProgress";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: "8px 8px 8px 8px",
    border: "1px solid gray",
    cursor: "pointer",
    "&:hover": {
      boxShadow:
        "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
    },
  },
  title: {
    fontSize: 14,
  },
  btnEdit: {
    margin: "1.5rem 0 0 0",
  },
  page: {
    margin: "1.5rem 0",
  },
  update: {
    "& > *": {
      margin: "1rem",
      width: "33ch",
    },
  },
});

export default function Tasks() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.activePage);
  const pages = useSelector((state) => state.tasks.pages);
  const isAuth = useSelector((state) => state.admin.isAuth);
  const token = localStorage.getItem("token");
  console.log(token, isAuth);

  useEffect(() => {
    fetch("http://localhost:4000/tasks")
      .then((res) => res.json())
      .then((data) => dispatch({ type: INIT_TASKS, payload: data }));
  }, [dispatch]);

  function handleChange(event, value) {
    dispatch({ type: TURN_PAGE, payload: value });
  }

  return (
    <>
      {" "}
      {token ? (
        tasks.map((el) => {
          return (
            <Card key={el._id} className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="primary"
                  gutterBottom
                >
                  {el.name}
                </Typography>
                <Typography
                  className={classes.title}
                  color="primary"
                  gutterBottom
                >
                  {el.email}
                </Typography>
                <form noValidate autoComplete="off">
                  <Checkbox
                  checked={el.status}
                    style={{
                      color: "#00B336",
                    }}
                    name=""
                  />
                                 <Typography
                  className={classes.title}
                  color="primary"
                  gutterBottom
                >
                  {el.description}
                </Typography>
                  <TextField
                    fullWidth={true}
                    id="name"
                    name="name"
                    label=""
                  />
                  <Button
                    className={classes.btnEdit}
                    style={{
                      color: "#00B336",
                    }}
                    variant="outlined"
                  >
                    Edit
                  </Button>
                </form>
              </CardContent>
            </Card>
          );
        })
      ) : tasks ? (
        tasks.map((el) => {
          return (
            <Card key={el._id} className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="primary"
                  gutterBottom
                >
                  {el.name}
                </Typography>
                <Typography
                  className={classes.title}
                  color="primary"
                  gutterBottom
                >
                  {el.email}
                </Typography>
                <Typography variant="inherit" component="h2">
                  {el.description}
                </Typography>
                <Typography
                  className={classes.title}
                  color="secondary"
                  gutterBottom
                >
                  Status: {el.status ? "done" : "active"}
                </Typography>
                {el.edit && (
                  <Typography
                    className={classes.title}
                    color="inherit"
                    gutterBottom
                  >
                    updated admin
                  </Typography>
                )}
              </CardContent>
            </Card>
          );
        })
      ) : (
        <CircularProgress />
      )}
      <Pagination
        className={classes.page}
        onChange={handleChange}
        count={pages}
        color="primary"
      />
    </>
  );
}
