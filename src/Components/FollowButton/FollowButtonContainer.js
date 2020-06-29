import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_FOLLOW } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter";

const FollowButtonContainer = ({ isFollowing, id }) => {
  const [toggleFollowMutation] = useMutation(TOGGLE_FOLLOW, {
    variables: { id }
  });
  const [isFollowingfromState, setIsFollowing] = useState(isFollowing);
  const onClick = () => {
    if (isFollowingfromState === true) {
      setIsFollowing(false);
      toggleFollowMutation();
    } else {
      setIsFollowing(true);
      toggleFollowMutation();
    }
  };
  return (
    <FollowButtonPresenter
      isFollowing={isFollowingfromState}
      onClick={onClick}
    />
  );
};

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};

export default FollowButtonContainer;
