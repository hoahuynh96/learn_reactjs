import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@mui/material';
import productApi from 'api/productApi';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import FilterViewer from '../components/FilterViewer';
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
  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState({
    limit: 12,
    page: 1,
    total: 10,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPage(pagination);
      } catch (error) {
        console.log('Fetch data fail: ', error);
      }

      setLoading(false);
    })();
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleSortChange = (newValue) => {
    const filters = {
      ...queryParams,
      _sort: newValue,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFilterViewer = (newFilters) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
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
                  <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
                )}
              </Paper>
            </Grid>

            <Grid item className={classes.right}>
              <Paper elevation={0}>
                <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />

                <FilterViewer filters={queryParams} onChange={handleFilterViewer} />

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
