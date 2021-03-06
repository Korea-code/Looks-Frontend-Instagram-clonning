import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const setSize = size => {
  let number;
  if (size === "sm") number = 35;
  else if (size === "md") number = 50;
  else if (size === "lg") number = 150;
  return `
        width: ${number}px;
        height: ${number}px;
        `;
};

const Container = styled.div`
  ${props => setSize(props.size)}
  border: ${props => props.theme.borderBox};
  background-image: url(${props => props.url});
  background-size: cover;
  border-radius: 50%;
`;

const Avatar = ({ size = "sm", url }) => <Container size={size} url={url} />;

Avatar.propTypes = {
  url: PropTypes.string.isRequired
};
export default Avatar;
