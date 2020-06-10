import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.input`
  background-color: ${props => props.theme.bgColor};
  border-radius: ${props => props.theme.borderRadius};
  border: ${props => props.theme.boxBorder};
  height: 35px;
  padding: 10px;
  font-size: 12px;
  &:not(:last-child) {
    margin-bottom: 6px;
  }
`;

const Input = ({ placeholder }) => <Container placeholder={placeholder} />;

Input.propTypes = {
  Placeholder: PropTypes.string.isRequired
};
export default Input;
