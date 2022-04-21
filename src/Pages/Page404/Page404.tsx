import { Button, PageHeader } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { push } from "connected-react-router";

import { Header } from "../../component/Header/Header";
import { getUserData } from "../../store/selectors/selectors";

import "./Page404.scss";

function Page404(): JSX.Element {
  const dispatch = useDispatch();
  const isAuth = !!useSelector(getUserData).get("username");

  const moveToMain = useCallback(() => {
    dispatch(push("/"));
  }, [dispatch]);
  return (
    <div>
      {isAuth && <Header />}
      <div className="container__column">
        <section className="page404__error">
          <PageHeader>
            <small>404</small> <br />
            Page not found
          </PageHeader>
          <Button onClick={moveToMain}>Back to Main Page</Button>
        </section>
      </div>
    </div>
  );
}

export default Page404;
