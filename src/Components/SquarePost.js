import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { WhiteHeartIcon, WhiteCommentIcon } from "./Icons";
import FatText from "./FatText";

const Container = styled.div`
  background-image: url(${props => props.file});
  background-size: cover;
  background-position: center;
  position: relative;
  x ${props => props.theme.whiteBox} &::before {
    content: "";
    padding-bottom: 100%;
    display: inline-block;
    vertical-align: top;
  }
`;

const Overlayer = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-around;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(9, 9, 9, 0.3);
  :hover {
    opacity: 100;
  }
`;

const Number = styled.div`
  width: 50%;
  padding-top: 10px;
`;

const NumberText = styled.span`
  width: 100%;
  color: white;
  font-size: 24px;
  line-height: 24px;
  opacity: 100;
`;

const SquarePost = ({ likeCount, commentCount, file }) => (
  <Container file={file}>
    <Overlayer>
      <Number>
        <WhiteHeartIcon size={28} />
        <NumberText>{likeCount}</NumberText>
      </Number>
      <Number>
        <WhiteCommentIcon size={28} />
        <NumberText>{commentCount}</NumberText>
      </Number>
    </Overlayer>
  </Container>
);

SquarePost.propTypes = {
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  file: PropTypes.string.isRequired
};
export default SquarePost;
