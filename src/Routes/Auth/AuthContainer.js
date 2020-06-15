import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN
} from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");

  //set default value for each input
  const loginEmail = useInput("");
  const email = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const username = useInput("");
  const secret = useInput("");

  const [requestSecret] = useMutation(LOG_IN);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT);
  const [confrimSecretMutation] = useMutation(CONFIRM_SECRET);
  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);
  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (loginEmail.value !== "") {
        try {
          await requestSecret({
            variables: { email: loginEmail.value },
            update: (_, { data }) => {
              const { requestSecret } = data;
              if (!requestSecret) {
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
              } else {
                toast.success("Check your email for your login secret");
                setAction("confirm");
              }
            }
          });
        } catch {
          toast.error(
            <p>
              Can't request secret.
              <br />
              Try again
            </p>,
            {
              position: "top-right",
              autoClose: 2000
            }
          );
        }
      } else {
        toast.error("Email is required", {
          position: "top-right",
          autoClose: 2000
        });
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try {
          const {
            data: { createAccount }
          } = await createAccountMutation({
            variables: {
              email: email.value,
              username: username.value,
              firstName: firstName.value,
              lastName: lastName.value
            }
          });
          if (!createAccount) {
            toast.error(
              <p>
                Can't create account. <br /> Try again
              </p>,
              {
                autoCloase: 2000
              }
            );
          } else {
            toast.success("Account created! Log In now");
            setTimeout(() => setAction("logIn"), 2000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("All field are required", {
          position: "top-right",
          autoClose: 2000
        });
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          const {
            data: { confirmSecret: token }
          } = await confrimSecretMutation({
            variables: {
              email: loginEmail.value,
              secret: secret.value
            }
          });
          if (token !== "" && token !== undefined) {
            localLogInMutation({ variables: { token } });
          } else {
            throw Error();
          }
        } catch {
          toast.error("Secret is wrong");
        }
      }
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
      onSubmit={onSubmit}
      secret={secret}
    />
  );
};
