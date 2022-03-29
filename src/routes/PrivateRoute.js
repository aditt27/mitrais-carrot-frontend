import React from "react";
import {
  Navigate,
  useLocation
} from "react-router-dom";
import { getAccessToken } from '../utils/HelperFunctions';
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUserData} from '../stores/authThunk';

function PrivateRoute({ children }) {
  const { roles } = children.props;
  const token = getAccessToken();
  var userData = token != null ? jwt_decode(token) : null;
  let location = useLocation();
  const dispatch = useDispatch();
  dispatch(setUserData({userData}))

  if (userData === null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (roles.some((role) => userData.role === role) ) {
    return children;
  }
  
  return <Navigate to="/forbidden" state={{ from: location }} replace />;

}

export default PrivateRoute;