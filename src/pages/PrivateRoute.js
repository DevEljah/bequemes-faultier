import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// import { useUserContext } from "../context/user_context";

const PrivateRoute = ({ children, ...rest }) => {
  // console.log(children); //"children" is <Checkout /> inside the <PrivateRoute/>
  // console.log(rest); //is the "rest" of parameters

  // const { myUser } = useUserContext();
  const { user } = useAuth0();

  return (
    <Route
      {...rest}
      render={() => {
        return user ? children : <Redirect to="/" />;
        /* children is <Checkout />  */
      }}
    />
  );
};
export default PrivateRoute;
