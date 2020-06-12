import React from "react";
import styled from "styled-components";
import Input from "../../Components/Input";
import Botton from "../../Components/Button";
import Header from "../../Components/Header";

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
export default ({
  setAction,
  action,
  loginEmail,
  username,
  firstName,
  lastName,
  email,
  onLogin
}) => (
  <Wrapper>
    <Form>
      <Header text={"LUCKLE"} />
      {action === "logIn" ? (
        <form onSubmit={onLogin}>
          <Input placeholder={"Email"} {...loginEmail} type={"email"} />
          <Botton text={"LogIn"} type={"submit"} />
        </form>
      ) : (
        <form onSubmit={onLogin}>
          <Input placeholder={"Email"} {...email} type={"email"} />
          <Input placeholder={"Username"} {...username} />
          <Input placeholder={"First name"} {...firstName} />
          <Input placeholder={"Last name"} {...lastName} />

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
