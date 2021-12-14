import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Grid, Skeleton } from '@mui/material';

ProductSkeletonCategory.propTypes = {
  length: PropTypes.number,
};

ProductSkeletonCategory.defaultProps = {
  length: 6,
};

function ProductSkeletonCategory({ length }) {
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((x, index) => (
          <Grid item key={index}>
            <Box padding={1} sx={{ width: 150 }}>
              <Skeleton animation="wave"></Skeleton>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductSkeletonCategory;
