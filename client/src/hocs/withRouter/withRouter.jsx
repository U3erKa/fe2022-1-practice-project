import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

export default function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const location = useLocation();
    const match = useRouteMatch();
    const history = useHistory();

    return <Component {...props} router={{ location, match, history }} />;
  }

  return ComponentWithRouterProp;
}
