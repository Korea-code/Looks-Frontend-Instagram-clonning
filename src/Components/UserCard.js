import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import FatText from "./FatText";
import Button from "./Button";

const Card = styled.div`
  width: 170px;
  height: 170px;
  ${props => props.theme.whiteBox}
  display: flex;
  margin: 10px 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 25px;
  justify-self: center;
`;
const E_Link = styled(Link)`
  color: inherit;
`;
const UserCard = ({ username, isFollowing, url, isSelf }) => (
  <Card>
    <Avatar size={"md"} url={url} />
    <E_Link to={`/${username}`}>
      <FatText text={username} />
    </E_Link>
    {!isSelf && <Button text={isFollowing ? "Unfollow" : "Follow"} />}
  </Card>
);
UserCard.propTypes = {
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  isSelf: PropTypes.bool.isRequired
};
export default UserCard;
