import React from "react";
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
  overflow: scroll;
`;

const File = styled.img`
  width: 100%;
`;

const Meta = styled.div`
  border-bottom: ${props => props.theme.boxBorder};
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
const Comments = styled.div``;
const Comment = styled.p``;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  resize: none;
  height: 30px;
  line-height: 1.1em;
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
  createdAt
}) => {
  console.log(avatar);
  return (
    <Post>
      <Header>
        <Avatar url={avatar} />
        <UserColumn>
          <FatText text={username} />
          {location && <Location>{location}</Location>}
        </UserColumn>
      </Header>
      <Files>
        {files && files.map(file => <File id={file.id} src={file.url} />)}
      </Files>
      <Meta>
        <Buttons>
          <Button>
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
      </Meta>
      <Textarea placeholder={"Add a comment..."} />
    </Post>
  );
};
