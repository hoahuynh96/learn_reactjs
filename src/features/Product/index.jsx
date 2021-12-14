import { Box } from '@mui/system';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListPage from './pages/ListPage';

ProductFeature.propTypes = {};

function ProductFeature(props) {
  const match = useRouteMatch();
  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.url} exact component={ListPage}></Route>
      </Switch>
    </Box>
  );
}

export default ProductFeature;
