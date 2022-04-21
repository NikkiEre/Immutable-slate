import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { useCallback } from "react";
import { Button, ButtonGroup, PageHeader } from "react-bootstrap";

import { Header } from "../../component/Header/Header";
import { getUserData } from "../../store/selectors/selectors";

import "./Main.scss";

function Main(): JSX.Element {
  const dispatch = useDispatch();
  const selectorUserName = useSelector(getUserData).get("username");

  const moveToPosts = useCallback((): void => {
    dispatch(push("/posts"));
  }, [dispatch]);

  const moveToLogout = useCallback((): void => {
    dispatch(push("/logout"));
  }, [dispatch]);

  return (
    <section className="main">
      <Header />
      <section className={"container"}>
        <PageHeader>
          Welcome, <small>{selectorUserName}</small>!
        </PageHeader>
        <div className="main__message">
          <p>You can see the list of posts or of the system.</p>
          <ButtonGroup>
            <Button onClick={moveToPosts}>Posts</Button>
            <Button bsStyle="danger" onClick={moveToLogout}>
              Logout
            </Button>
          </ButtonGroup>
        </div>
      </section>
    </section>
  );
}

export default Main;
