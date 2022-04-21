import React, { useCallback } from "react";
import { push } from "connected-react-router";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { getUserData } from "../../store/selectors/selectors";

export const Header = React.memo((): JSX.Element => {
  const selectorUser = useSelector(getUserData).get("username");
  const dispatch = useDispatch();

  const moveToMain = useCallback((): void => {
    dispatch(push("/"));
  }, [dispatch]);

  const moveToPosts = useCallback((): void => {
    dispatch(push("/posts"));
  }, [dispatch]);

  const moveToLogout = useCallback((): void => {
    dispatch(push("/logout"));
  }, [dispatch]);

  return (
    <header>
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Button bsStyle="link" onClick={moveToMain}>
                My page
              </Button>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} onClick={moveToPosts}>
                Posts
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavDropdown eventKey={2} title={selectorUser} id="basic-nav-dropdown">
                <MenuItem eventKey={2.1} onClick={moveToLogout}>
                  Logout
                </MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
});
