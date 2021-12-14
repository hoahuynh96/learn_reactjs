import Header from 'components/Header';
import ProductFeature from 'features/Product';
import { Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';
import CounterFeature from './features/Counter';
import TodoFeature from './features/Todo/pages';

function App() {
  return (
    <div className="App">
      <Header></Header>

      <Switch>
        <Route path="/" component={CounterFeature} exact></Route>
        <Route path="/todos" component={TodoFeature}></Route>
        <Route path="/products" component={ProductFeature}></Route>

        <Route component={NotFound}></Route>
      </Switch>
    </div>
  );
}

export default App;
