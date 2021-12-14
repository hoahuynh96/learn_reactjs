import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilters({ filters, onChange }) {
  function handleCategoryChange(newCategoryId) {
    if (!onChange) return;
    const newFilters = {
      'category.id': newCategoryId,
    };
    onChange(newFilters);
  }

  const handleChange = (values) => {
    if (onChange) onChange(values);
  };

  return (
    <div>
      <Box>
        <FilterByCategory onChange={handleCategoryChange} />
        <FilterByPrice onChange={handleChange} />
        <FilterByService filters={filters} onChange={handleChange} />
      </Box>
    </div>
  );
}

export default ProductFilters;
