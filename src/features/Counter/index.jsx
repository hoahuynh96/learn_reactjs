import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrease, increase } from './counterSlice';
import { makeStyles } from '@material-ui/core';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

CounterFeature.propTypes = {};

function CounterFeature(props) {
  const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 20,
      padding: '0 30px',
    },
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.count);
  function increaseClick() {
    dispatch(increase());
  }

  function decreaseClick() {
    dispatch(decrease());
  }
  return (
    <div>
      Counter: {counter}
      <div>
        <Button className={classes.root} onClick={increaseClick}>
          Increase
        </Button>
        <Button className={classes.root} onClick={decreaseClick}>
          Decrease
        </Button>
        <div>
          <NavLink to="/products">
            <button>Product</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default CounterFeature;
