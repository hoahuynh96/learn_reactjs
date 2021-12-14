import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@material-ui/core';

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  priceRoot: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },

  range: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',

    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

    '& > span': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
}));

function FilterByPrice({ onChange }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: [value],
    }));
  };

  const handleSubmit = () => {
    if (onChange) {
      onChange(values);
    }

    setValues({
      salePrice_gte: 0,
      salePrice_lte: 0,
    });
  };
  return (
    <Box className={classes.priceRoot}>
      <Typography variant="subtitle2">GIA</Typography>

      <Box className={classes.range}>
        <TextField
          variant="standard"
          name="salePrice_gte"
          value={values.salePrice_gte}
          onChange={handleChange}
        ></TextField>
        <span>-</span>
        <TextField
          variant="standard"
          name="salePrice_lte"
          value={values.salePrice_lte}
          onChange={handleChange}
        ></TextField>
      </Box>

      <Button variant="outlined" color="primary" size="small" onClick={handleSubmit}>
        Ap dung
      </Button>
    </Box>
  );
}

export default FilterByPrice;
