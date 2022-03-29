import React from "react";
import {
  Navigate,
  useLocation
} from "react-router-dom";
import { getAccessToken } from '../utils/HelperFunctions';
import jwt_decode from "jwt-decode";

function PrivateRoute({ children }) {
  const { roles } = children.props;
  const token = getAccessToken();
  var decoded = token != null ? jwt_decode(token) : null;
  let location = useLocation();

  if (decoded === null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (roles.some((role) => decoded.role === role) ) {
    return children;
  }
  
  return <Navigate to="/forbidden" state={{ from: location }} replace />;

}

export default PrivateRoute;