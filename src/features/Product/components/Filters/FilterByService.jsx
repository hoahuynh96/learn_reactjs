import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core';

FilterByService.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  serviceRoot: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },

  list: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',

    '& > li': {
      marginTop: theme.spacing(1),
    },
  },
}));

function FilterByService({ filters = {}, onChange }) {
  const classes = useStyles();

  const handleChange = (e) => {
    if (!onChange) return;
    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  return (
    <Box className={classes.serviceRoot}>
      <Typography variant="subtitle2">DICH VU</Typography>

      <ul className={classes.list}>
        {[
          { value: 'isPromotion', label: 'Gia khuyen mai' },
          { value: 'isFreeShip', label: 'Van chuyen mien phi' },
        ].map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.value])}
                  onChange={handleChange}
                  name={service.value}
                  color="primary"
                ></Checkbox>
              }
              label={service.label}
            ></FormControlLabel>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByService;
