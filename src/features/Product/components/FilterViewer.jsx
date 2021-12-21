import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { Box } from '@mui/system';
import { Chip } from '@mui/material';

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  viewerRoot: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',

    padding: 0,
    margin: theme.spacing(2, 0),
    listStyleType: 'none',

    '& > li': {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
}));

const FILTER_LIST = [
  {
    id: 1,
    getLabel: (filters) => 'Giao hang mien phi',
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: (filters) => {},
    onToggle: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }
      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: (filters) => 'Co khuyen mai',
    isActive: (filters) => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.isPromotion;
      return newFilters;
    },
    onToggle: null,
  },
  {
    id: 3,
    getLabel: (filters) => `Tu ${filters.salePrice_gte} den ${filters.salePrice_lte}`,
    isActive: (filters) => true,
    isVisible: (filters) =>
      Object.keys(filters).includes('salePrice_lte') && Object.keys(filters).includes('salePrice_gte'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_lte;
      delete newFilters.salePrice_gte;
      return newFilters;
    },
    onToggle: null,
  },
  {
    id: 4,
    getLabel: (filters) => 'Danh muc',
    isActive: (filters) => true,
    isVisible: (filters) => Object.keys(filters).includes('category.id'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters['category.id'];
      return newFilters;
    },
    onToggle: null,
  },
];

function FilterViewer({ filters = {}, onChange = null }) {
  const classes = useStyles();
  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters));
  }, [filters]);

  return (
    <Box className={classes.viewerRoot} component="ul">
      {visibleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? 'primary' : 'default'}
            size="small"
            clickable={!x.isRemovable}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;
                    const newFilters = x.onToggle(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;
                    const newFilters = x.onRemove(filters);
                    onChange(newFilters);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
