import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ListPage from '../pages/ListPage';
import DetailPage from '../pages/DetailPage';
import NotFound from 'components/NotFound';

TodoFeature.propTypes = {};

function TodoFeature(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={match.path} component={ListPage} exact></Route>
        <Route path={`${match.path}/:todoId`} component={DetailPage} exact></Route>

        <Route component={NotFound}></Route>
      </Switch>
    </div>
  );
}

export default TodoFeature;
