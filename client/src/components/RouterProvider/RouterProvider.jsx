import { Route, Switch } from 'react-router-dom';

const RouterProvider = ({ router }) => {
  return (
    <Switch>
      {router.map(({ id, path, element }) => (
        <Route key={id} exact path={path} component={element} />
      ))}
    </Switch>
  );
};
export default RouterProvider;
