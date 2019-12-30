import React, { useEffect, useState } from "react";
import axios from "axios";

export const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState();
  useEffect(() => {
    setTimeout(() => {
      axios
        .post("users/login")
        .then(res => {
          setLoggedIn(true);
          setToken(res.data);
          console.log("posting request " + JSON.stringify(res, undefined, 2));
        })
        .catch(err => {
          console.log(err);
        });
    }, 1000);
  }, [loggedIn]);
  if (loggedIn)
    return (
      <div>
        <h1>Logged in</h1>
      </div>
    );
  else {
    return (
      <div>
        <h1>Not logged in</h1>
      </div>
    );
  }
};
