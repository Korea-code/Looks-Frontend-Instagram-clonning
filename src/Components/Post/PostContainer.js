import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { toast } from "react-toastify";
import moment from "moment";

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  location,
  caption
}) => {
  //_S : From State
  const [isLiked_S, setIsLiked] = useState(isLiked);
  const [likeCount_S, setLikeCount] = useState(likeCount);
  const [currentFile, setCurrentFile] = useState(0);
  const [selfComments, setSelfComments] = useState([]);
  const comment = useInput("");
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value }
  });
  const toggleLike = () => {
    if (isLiked_S) {
      setIsLiked(false);
      setLikeCount(likeCount_S - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCount_S + 1);
    }
    toggleLikeMutation();
  };

  const onKeyPress = async e => {
    const { which } = e;
    if (which === 13) {
      // means enter
      e.preventDefault();
      comment.setValue("");
      try {
        const {
          data: { addComment }
        } = await addCommentMutation();
        setSelfComments([...selfComments, addComment]);
      } catch {
        toast.error("Comment isn't sent");
      }
    }
  };
  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCount_S}
      isLiked={isLiked_S}
      comments={comments}
      createdAt={moment(createdAt).fromNow()}
      location={location}
      newComment={comment}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      caption={caption}
      currentFile={currentFile}
      setCurrentFile={setCurrentFile}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ),
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  createdAt: PropTypes.string.isRequired,
  location: PropTypes.string,
  caption: PropTypes.string
};

export default PostContainer;
