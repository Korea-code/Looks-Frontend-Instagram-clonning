import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.button`
  height: 28px;
  background-color: ${props => props.theme.darkGreenColor};
  color: white;
  border-radius: ${props => props.theme.borderRadius};
  font-weight: 500;
  font-size: 16px;
  margin-top: 18px;
`;

const Button = ({ text }) => <Container>{text}</Container>;

Button.propTypes = {
  text: PropTypes.string.isRequired
};
export default Button;
