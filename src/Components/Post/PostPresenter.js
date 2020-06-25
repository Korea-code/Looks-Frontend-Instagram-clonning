import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import FatText from "../FatText";
import Avatar from "../Avatar";
import TextareaAutosize from "react-autosize-textarea";

import {
  HeartEmptyIcon,
  HeartFullIcon,
  CommentIcon,
  ShareIcon,
  BookmarkEmptyIcon,
  BookmarkFillIcon
} from "../Icons";

const Post = styled.div`
  ${props => props.theme.whiteBox}
  width: 100%;
  max-width: 600px;
  user-select: none;
`;
const Header = styled.header`
  height: 60px;
  border-bottom: ${props => props.theme.boxBorder};
  display: flex;
  align-items: center;
  padding: 10px;
  padding-left: 15px;
`;

const UserColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 15px;
`;

const Location = styled.div`
  font-weight: 400;
  font-size: 0.8em;
  margin-top: 3px;
`;

const Files = styled.div`
  display: flex;
  overflow: hidden;

  /* scroll-snap-type: x mandatory; */
`;

const File = styled.img`
  width: 100%;
  /* opacity: ${props => (props.showing ? 1 : 0)}; */
  /* scroll-snap-align: start; */
  
`;
const Next = styled.button`
  position: absolute;
  top: -200px;
  right: 20px;
  opacity: 0.3;
  height: 50px;
  border-radius: 25px;
  width: 50px;
  background: none;
  border: none;
  cursor: pointer;
  :focus {
    outline: none;
  }
  :hover {
    opacity: 0.7;
  }
`;
const Before = styled.button`
  position: absolute;
  top: -200px;
  left: 10px;
  opacity: 0.3;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: none;
  border: none;
  cursor: pointer;

  :focus {
    outline: none;
  }
  :hover {
    opacity: 0.7;
  }
`;

const Meta = styled.div`
  border-bottom: ${props => props.theme.boxBorder};
  position: relative;
`;

const Buttons = styled.div`
  height: 45px;
  display: flex;
  width: 100%;
`;

const Button = styled.div`
  margin: 10px 3px;
  cursor: pointer;
  :first-child {
    margin-left: 15px;
  }
  :last-child {
    margin: 10px 10px 10px auto;
  }
`;
const LikeCount = styled.div`
  margin: 0 15px 5px 15px;
`;

const Content = styled.div`
  margin: 10px 15px;
`;
const TimeStemp = styled.div`
  margin: 10px 15px;
  font-size: 0.8em;
  /* font-weight: 400; */
  color: ${props => props.theme.darkGreyColor};
`;
const Dots = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  top: 12px;
`;
const GreyDot = styled.div`
  width: 6px;
  height: 6px;
  margin: 2px;
  border-radius: 5px;
  background-color: ${props => props.theme.darkGreyColor};
`;
const GreenDot = styled.div`
  width: 6px;
  height: 6px;
  margin: 2px;
  border-radius: 3px;

  background-color: ${props => props.theme.darkGreenColor};
`;
const Comments = styled.ul`
  margin: 10px 15px;
`;
const Comment = styled.li`
  margin: 5px 0;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  resize: none;
  line-height: 1.2em;
  font-size: 1.1em;
  padding: 15px;
  :focus {
    outline: none;
  }
`;
export default ({
  user: { username, avatar },
  location,
  files,
  isLiked,
  likeCount,
  caption,
  createdAt,
  currentFile,
  setCurrentFile,
  toggleLike,
  onKeyPress,
  newComment,
  comments,
  selfComments
}) => {
  // file changer button
  // I need to seperate this code from presenter
  const file_component = useRef();
  const beforeButton = () => {
    setCurrentFile(currentFile === 0 ? 0 : currentFile - 1);
  };

  const nextButton = () => {
    const MAX_LEN = files.length - 1;
    setCurrentFile(currentFile < MAX_LEN ? currentFile + 1 : currentFile);
  };

  useEffect(() => {
    const width = file_component.current.offsetWidth;
    let unitX = 140;
    if (file_component.current.scrollLeft <= width * currentFile) {
      const scrollTo = () => {
        if (file_component.current.scrollLeft < width * currentFile - 30) {
          if (unitX > 30) unitX *= 0.75;
          file_component.current.scrollLeft += unitX;
          requestAnimationFrame(scrollTo);
        } else {
          file_component.current.scrollLeft = width * currentFile;
        }
      };
      requestAnimationFrame(scrollTo);
    } else {
      const scrollTo = () => {
        if (file_component.current.scrollLeft > width * currentFile + 30) {
          if (unitX > 30) unitX *= 0.75;

          file_component.current.scrollLeft -= unitX;
          requestAnimationFrame(scrollTo);
        } else {
          file_component.current.scrollLeft = width * currentFile;
        }
      };
      requestAnimationFrame(scrollTo);
    }
  }, [currentFile]);
  // file changer button end
  return (
    <Post>
      <Header>
        <Avatar url={avatar} />
        <UserColumn>
          <FatText text={username} />
          {location && <Location>{location}</Location>}
        </UserColumn>
      </Header>
      <Files ref={file_component}>
        {files && files.map(file => <File id={file.id} src={file.url} />)}
      </Files>

      <Meta>
        {files.length > 1 && currentFile != 0 && (
          <Before onClick={beforeButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z" />
            </svg>
          </Before>
        )}
        {files.length > 1 && currentFile != files.length - 1 && (
          <Next onClick={nextButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.218 19l-1.782-1.75 5.25-5.25-5.25-5.25 1.782-1.75 6.968 7-6.968 7z" />
            </svg>
          </Next>
        )}
        <Dots>
          {files.map((_, index) => {
            if (currentFile === index) return <GreenDot />;
            else return <GreyDot />;
          })}
        </Dots>
        <Buttons>
          <Button onClick={toggleLike}>
            {isLiked ? (
              <HeartFullIcon size={33} />
            ) : (
              <HeartEmptyIcon size={33} />
            )}
          </Button>
          <Button>
            <CommentIcon size={33} />
          </Button>
          <Button>
            <ShareIcon size={33} />
          </Button>
          <Button>
            <BookmarkEmptyIcon size={33} />
          </Button>
        </Buttons>
        <LikeCount>
          <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
        </LikeCount>
        <Content>
          <FatText text={`${username} `} />
          {caption}
        </Content>
        <TimeStemp>{createdAt}</TimeStemp>
        {comments && (
          <Comments>
            {comments &&
              comments.map(comment => {
                return (
                  <Comment>
                    <FatText text={`${comment.user.username} `} />
                    {comment.text}
                  </Comment>
                );
              })}
            {selfComments &&
              selfComments.map(comment => {
                return (
                  <Comment>
                    <FatText text={`${comment.user.username} `} />
                    {comment.text}
                  </Comment>
                );
              })}
          </Comments>
        )}
      </Meta>

      <Textarea
        placeholder={"Add a comment..."}
        value={newComment.value}
        onChange={newComment.onChange}
        onKeyPress={onKeyPress}
      />
    </Post>
  );
};
