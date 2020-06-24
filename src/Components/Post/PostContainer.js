import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";

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
  const comment = useInput("");

  //   const slide = () => {
  //     const totalFiles = files.length;
  //     if (currentFile === totalFiles - 1) {
  //       setTimeout(() => setCurrentFile(0), 2000);
  //     } else {
  //       setTimeout(() => setCurrentFile(currentFile + 1), 2000);
  //     }
  //   };
  //   useEffect(() => {
  //     slide();
  //   }, [currentFile]);
  //   console.log(currentFile);

  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCount_S}
      isLiked={isLiked_S}
      comments={comments}
      createdAt={createdAt}
      location={location}
      newComment={comment}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      caption={caption}
      currentFile={currentFile}
      setCurrentFile={setCurrentFile}
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
