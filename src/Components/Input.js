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
  width: 100%;
`;

const Input = ({
  placeholder,
  required = true,
  value,
  onChange,
  type = "text"
}) => (
  <Container
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
  />
);

Input.propTypes = {
  Placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string
};
export default Input;
