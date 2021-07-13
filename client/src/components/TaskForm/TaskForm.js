import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { INIT_TASKS } from "../../redux/actionTypes/actionTypes";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(3),
      width: "33ch",
    },
  },
}));

export default function TaskForm() {
  const classes = useStyles();
  const dispatch = useDispatch();

  function taskHandler(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const description = e.target.description.value;
    fetch("http://localhost:4000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, description }),
    })
      .then((res) => res.json())
      .then((data) => dispatch({ type: INIT_TASKS, payload: data }));
  }

  return (
    <form
      onSubmit={(event) => {
        taskHandler(event);
      }}
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      <TextField id="name" name="name" label="Name" />
      <TextField id="email" name="email" label="Email" />
      <TextField id="description" name="description" label="Task description" />
      <Button type="submit" variant="contained" color="primary">
        Add Task
      </Button>
      <Typography color="primary" component="span" variant="subtitle2">
        {" "}
        sub
      </Typography>
    </form>
  );
}
