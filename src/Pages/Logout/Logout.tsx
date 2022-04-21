import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { logout } from "../../store/thunk-actions/logout";

function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);
  return <></>;
}

export default Logout;
