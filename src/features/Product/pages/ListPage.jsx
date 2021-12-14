import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@mui/material';
import productApi from 'api/productApi';
import React, { useEffect, useState } from 'react';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonCategory from '../components/ProductSkeletonCategory';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';

ListPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  left: {
    width: '250px',
  },

  right: {
    flex: '1 1 0',
  },

  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    marginTop: '30px',
    paddingBottom: '20px',
  },
}));

function ListPage(props) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 12,
    _sort: 'salePrice:ASC',
  });

  const [page, setPage] = useState({
    limit: 12,
    page: 1,
    total: 10,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filters);
        setProductList(data);
        setPage(pagination);
        setLoading(false);
      } catch (error) {
        console.log('Fetch data fail: ', error);
      }
    })();
  }, [filters]);

  const handlePageChange = (e, page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _page: page,
    }));
  };

  const handleSortChange = (newValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _sort: newValue,
    }));
  };

  const handleFiltersChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return (
    <div>
      <Box>
        <Container>
          <Grid container spacing={1}>
            <Grid item className={classes.left}>
              <Paper elevation={0}>
                {loading ? (
                  <ProductSkeletonCategory />
                ) : (
                  <ProductFilters filters={filters} onChange={handleFiltersChange} />
                )}
              </Paper>
            </Grid>

            <Grid item className={classes.right}>
              <Paper elevation={0}>
                <ProductSort currentSort={filters._sort} onChange={handleSortChange} />

                {loading ? <ProductSkeletonList length={12} /> : <ProductList data={productList}></ProductList>}
                <Box className={classes.pagination}>
                  <Pagination
                    color="primary"
                    count={Math.ceil(page.total / page.limit)}
                    page={page.page}
                    onChange={handlePageChange}
                  ></Pagination>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default ListPage;
