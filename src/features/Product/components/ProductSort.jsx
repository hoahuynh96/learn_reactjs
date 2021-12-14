import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@mui/material';

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

function ProductSort({ currentSort, onChange }) {
  const handleSortChange = (e, newValue) => {
    if (onChange) onChange(newValue);
  };

  return (
    <div>
      <Tabs
        value={currentSort}
        onChange={handleSortChange}
        indicatorColor="primary"
        textColor="primary"
        aria-label="disabled tabs example"
      >
        <Tab label="Giá Thấp" value="salePrice:ASC"></Tab>
        <Tab label="Giá Cao" value="salePrice:DESC"></Tab>
      </Tabs>
    </div>
  );
}

export default ProductSort;
