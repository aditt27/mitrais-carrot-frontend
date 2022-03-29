import React from "react";
import {
  Navigate,
  useLocation
} from "react-router-dom";
import { getAccessToken } from '../utils/HelperFunctions';
import jwt_decode from "jwt-decode";
import { Admin, Manager, Merchant, Staff } from "../utils/Role";

function RedirectRoute() {
  const token = getAccessToken();
  var decoded = token != null ? jwt_decode(token) : null;
  let location = useLocation();

  if (decoded === null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  switch (decoded.role) {
    case Admin:
      return <Navigate to='/admin' state={{ from: location }} replace />;

    case Merchant:
      return <Navigate to='/merchant' state={{ from: location }} replace />;

    case Manager:
      return <Navigate to='/manager' state={{ from: location }} replace />;

    case Staff:
      return <Navigate to='/staff' state={{ from: location }} replace />;

    default:
      return <Navigate to="/login" state={{ from: location }} replace />;
  }

}

export default RedirectRoute;