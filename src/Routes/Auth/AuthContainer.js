import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";

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
        variables: { email: loginEmail.value },
        update: (_, { data }) => {
          const { requestSecret } = data;
          if (!requestSecret)
            toast.error(
              <p>
                You don't have an account.
                <br />
                Click here to create new account
              </p>,
              {
                onClick: () => setAction("signUp"),
                position: "top-right",
                autoClose: 4000
              }
            );
        }
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
