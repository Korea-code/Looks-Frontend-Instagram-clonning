import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  min-height: 75vh;
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Temp = styled.div`
  ${props => props.theme.whiteBox}
  width: 300px;
  height: 70vh;
  @media (max-width: 887px) {
    display: none;
  }
`;
export default () => {
  const { data, loading } = useQuery(FEED_QUERY);
  return (
    <Wrapper>
      {loading && <Loader />}
      {!loading &&
        data &&
        data.seeFeed &&
        data.seeFeed.map(post => (
          <Post
            key={post.id}
            id={post.id}
            user={post.user}
            files={post.files}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.comments}
            createdAt={post.createdAt}
            location={post.location}
            caption={post.caption}
          />
        ))}
      <Temp />
    </Wrapper>
  );
};
