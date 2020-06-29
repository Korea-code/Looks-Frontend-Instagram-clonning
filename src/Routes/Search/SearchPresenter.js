import React from "react";
import styled from "styled-components";
import FatText from "../../Components/FatText";
import PropTypes from "prop-types";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import SquarePost from "../../Components/SquarePost";
const Wrapper = styled.div`
  min-height: 50vh;
  padding: 15px;
  width: 100%;
  text-align: center;
`;
const UserSection = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  justify-content: centser;
`;
const PostSection = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  justify-content: centser;
  & div {
    border-radius: ${props => props.theme.borderRadius};
  }
`;

const SearchPresenter = ({ searchTerm, loading, data }) => {
  return (
    <Wrapper>
      {loading && <Loader />}
      {searchTerm === undefined && (
        <FatText text={"Search for something"}></FatText>
      )}
      {!loading && data && data.searchUser && data.searchUser.length === 0 && (
        <FatText text={"No user found"} />
      )}
      <UserSection>
        {!loading &&
          data &&
          data.searchUser &&
          data.searchUser.map(user => (
            <UserCard
              key={user.id}
              username={user.username}
              isFollowing={user.isFollowing}
              url={user.avatar}
              isSelf={user.isSelf}
              id={user.id}
            />
          ))}
      </UserSection>
      {!loading && data && data.searchPost && data.searchPost.length === 0 && (
        <FatText text={"No post found"} />
      )}
      <PostSection>
        {!loading &&
          data &&
          data.searchPost &&
          data.searchPost.map(post => (
            <SquarePost
              key={post.id}
              id={post.id}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
              file={post.files[0].url}
            />
          ))}
      </PostSection>
    </Wrapper>
  );
};

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool
};
export default SearchPresenter;
