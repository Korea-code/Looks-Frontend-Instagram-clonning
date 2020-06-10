import React, { useState } from "react";
import styled from "styled-components";
import Input from "../Components/Input";
import Botton from "../Components/Button";
import Header from "../Components/Header";
import useInput from "../Hooks/useInput";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox}
`;
const AskingBox = styled(Box)`
  text-align: center;
  height: 60px;
  width: 300px;
  line-height: 60px;
`;

const Link = styled.span`
  color: ${props => props.theme.darkGreenColor};
  cursor: pointer;
`;
const Form = styled(Box)`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-contents: center;
  padding: 35px;
  width: 300px;
  min-height: 300px;
  margin-bottom: 10px;
`;
export default () => {
  const [action, setAction] = useState("logIn");

  //set default value for each input
  const loginUsername = useInput("");
  const loginPassword = useInput("");
  const email = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const username = useInput("");
  const password = useInput("");

  return (
    <Wrapper>
      <Form>
        <Header text={"LUCKLE"} />
        {action === "logIn" ? (
          <form>
            <Input placeholder={"Username"} {...loginUsername} />
            <Input
              placeholder={"Password"}
              {...loginPassword}
              type={"password"}
            />
            <Botton text={"LogIn"} type={"submit"} />
          </form>
        ) : (
          <form>
            <Input placeholder={"Email"} {...email} type={"email"} />
            <Input placeholder={"First name"} {...firstName} />
            <Input placeholder={"Last name"} {...lastName} />
            <Input placeholder={"Username"} {...username} />
            <Input placeholder={"Password"} {...password} type={"password"} />

            <Botton text={"Sign Up"} type={"submit"} />
          </form>
        )}
      </Form>
      <AskingBox>
        {action === "logIn" ? (
          <>
            Don't have an account?{" "}
            <Link onClick={() => setAction("signUp")}>Sign Up</Link>
          </>
        ) : (
          <>
            Have an account?{" "}
            <Link onClick={() => setAction("logIn")}>Log In</Link>
          </>
        )}
      </AskingBox>
    </Wrapper>
  );
};
