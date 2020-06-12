import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { LOG_IN } from "./AuthQueries";

export default () => {
  const [action, setAction] = useState("logIn");

  //set default value for each input
  const loginEmail = useInput("");
  const email = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const username = useInput("");

  const [requestSecret] = useMutation(LOG_IN);

  const onLogin = e => {
    e.preventDefault();
    if (loginEmail.value !== "") {
      console.log(loginEmail.value);
      requestSecret({
        variables: { email: loginEmail.value }
      });
    }
  };
  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      loginEmail={loginEmail}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      onLogin={onLogin}
    />
  );
};
