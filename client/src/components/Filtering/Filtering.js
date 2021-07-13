import React from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import { INIT_SORT } from '../../redux/actionTypes/actionTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    '& > *': {
      margin: theme.spacing(3),
    },
  },
}));

export default function Filtering() {
  const classes = useStyles();
  const dispatch = useDispatch();

  function getFilteredTasks(filterName){
    dispatch({type:INIT_SORT, payload:filterName})
  }

  return (
    <div className={classes.root}>
           <Typography color="textSecondary" component="h1" variant="button"> Filtering
        </Typography>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button onClick={()=>getFilteredTasks("name")}>Name</Button>
        <Button onClick={()=>getFilteredTasks("email")}>Email</Button>
        <Button onClick={()=>getFilteredTasks("status")}>Status</Button>
      </ButtonGroup>
    </div>
  );
}
