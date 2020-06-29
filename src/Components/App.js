import React from "react";
import { gql } from "apollo-boost";
import styled, { ThemeProvider } from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { ToastContainer, toast } from "react-toastify";
import { HashRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Theme from "../Styles/Theme";
import GlobalStyles from "../Styles/GlobalStyles";
import Routes from "./Routes";
import Footer from "./Footer";
import Header from "../Components/Header";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 935px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Router>
        <Wrapper>
          {isLoggedIn && <Header />}
          <Routes isLoggedIn={isLoggedIn} />
          <Footer />
          <ToastContainer />
        </Wrapper>
      </Router>
    </ThemeProvider>
  );
};
