import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import Logout from "../Pages/Logout/Logout";
import Main from "../Pages/Main/Main";
import Page404 from "../Pages/Page404/Page404";
import Posts from "../Pages/Posts/Posts";
import { history } from "../store/rootStore/rootStore";
import PostContainer from "../Pages/Post/PostContainer";
import { userIsAuthenticated, userIsNotAuthenticated } from "../utils/wrapper/wrapper";
import LoginApp from "../Pages/LoginApp/LoginApp";
import RegisterApp from "../Pages/RegisterApp/RegisterApp";

function Router(): JSX.Element {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/register" component={userIsNotAuthenticated(RegisterApp)} />
        <Route path="/login" component={userIsNotAuthenticated(LoginApp)} />
        <Route path="/logout" component={Logout} />
        <Route path="/posts/:id" component={userIsAuthenticated(PostContainer)} />
        <Route path="/posts" component={userIsAuthenticated(Posts)} />
        <Route path="/" component={userIsAuthenticated(Main)} exact />
        <Route path="*" component={Page404} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
