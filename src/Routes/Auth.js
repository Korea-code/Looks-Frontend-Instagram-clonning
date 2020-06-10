import React, { useState } from "react";
import styled from "styled-components";
import Input from "../Components/Input";
import Botton from "../Components/Button";
import Header from "../Components/Header";

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

  return (
    <Wrapper>
      <Form>
        <Header text={"LUCKLE"} />
        {action === "logIn" ? (
          <>
            <Input placeholder={"Username"} />
            <Input placeholder={"Password"} />
            <Botton text={"LogIn"} />
          </>
        ) : (
          <>
            <Input placeholder={"Email"} />
            <Input placeholder={"First name"} />
            <Input placeholder={"Last name"} />
            <Input placeholder={"Username"} />
            <Input placeholder={"Password"} />

            <Botton text={"Sign Up"} />
          </>
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
