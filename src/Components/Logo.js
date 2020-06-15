import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.h1`
  text-align: center;
  font-size: 42px;
  font-weight: 700;
  font-family: ${props => props.theme.logoFont};
  margin-bottom: 52px;
`;

const Logo = ({ text }) => <Container>{text}</Container>;

Logo.propTypes = {
  text: PropTypes.string.isRequired
};
export default Logo;
