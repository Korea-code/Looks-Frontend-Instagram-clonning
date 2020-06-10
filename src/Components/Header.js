import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.h1`
  text-align: center;
  font-size: 42px;
  font-weight: 700;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin-bottom: 52px;
`;

const Header = ({ text }) => <Container>{text}</Container>;

Header.propTypes = {
  text: PropTypes.string.isRequired
};
export default Header;
