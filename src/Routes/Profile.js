import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "react-apollo-hooks";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loader from "../Components/Loader";
import Avatar from "../Components/Avatar";
import FatText from "../Components/FatText";
import SquarePost from "../Components/SquarePost";
import FollowButton from "../Components/FollowButton";
import Button from "../Components/Button";

const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      username
      avatar
      fullName
      isSelf
      isFollowing
      postCount
      followingCount
      followersCount
      bio
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`;

const LOCAL_LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

const Wrapper = styled.div`
  width: 90%;
  min-height: 60vh;
  text-align: center;
`;

const UserInfo = styled.div`
  ${props => props.theme.whiteBox}
  width: 100%;
  margin: 30px 0;
  padding: 50px;
  display: flex;
`;

const PostSection = styled.div`
  margin: 20px 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  justify-content: centser;
  & div {
    border-radius: ${props => props.theme.borderRadius};
  }
`;
const UserData = styled.div`
  margin-left: 70px;
  text-align: left;
  width: 60%;
  button {
    margin: 9px;
    display: inline-block;
    width: 120px;
    height: 30px;
    font-size: 16px;
    padding: 6px;
  }
`;
const Username = styled.p`
  font-size: 45px;
  font-weight: 300;
  margin-right: 30px;
  float: left;
`;
const UserDetails = styled.div`
  height: 45px;
  padding: 15px;
  display: flex;
`;
const UserDetail = styled.div`
  margin-right: 25px;
  font-size: 18px;
`;
const EditProfile = styled(Link)`
  margin: 9px;
  display: inline-block;
  width: 120px;
  height: 28px;
  color: black;
  font-size: 16px;
  padding: 6px;
  text-align: center;
  ${props => props.theme.whiteBox}
`;

const FollowButton_Edited = styled(FollowButton)``;
const UserProfile = styled.div`
  display: block;
  min-height: 33%;
  padding: 15px;
  div {
    margin-top: 10px;
  }
`;

const Profile = ({ history: { location } }) => {
  const username = location.pathname.split("/")[1];

  const { data, loading } = useQuery(GET_USER, { variables: { username } });
  const [logOut] = useMutation(LOCAL_LOG_OUT);
  return (
    <>
      <Helmet>
        <title>LUCKLE {username}</title>
      </Helmet>
      <Wrapper>
        {loading ? (
          <Loader />
        ) : (
          <>
            <UserInfo>
              <Avatar size="lg" url={data.seeUser.avatar} />
              <UserData>
                <Username>{data.seeUser.username}</Username>
                {data.seeUser.isSelf ? (
                  <>
                    <EditProfile to={"/editProfile"}>Edit Profile</EditProfile>
                    <Button onClick={logOut} text={"Log Out"} />
                  </>
                ) : (
                  <FollowButton_Edited
                    id={data.seeUser.id}
                    isFollowing={data.seeUser.isFollowing}
                  />
                )}
                <UserDetails>
                  <UserDetail>{data.seeUser.postCount} posts</UserDetail>
                  <UserDetail>
                    {data.seeUser.followersCount} followers
                  </UserDetail>
                  <UserDetail>
                    {data.seeUser.followingCount} following
                  </UserDetail>
                </UserDetails>
                <UserProfile>
                  <FatText text={data.seeUser.fullName}></FatText>
                  {data.seeUser.bio && <div>{data.seeUser.bio}</div>}
                </UserProfile>
              </UserData>
            </UserInfo>
            <PostSection>
              {data.seeUser.posts.length !== 0 ? (
                data.seeUser.posts.map(post => (
                  <SquarePost
                    key={post.id}
                    id={post.id}
                    likeCount={post.likeCount}
                    commentCount={post.commentCount}
                    file={post.files[0].url}
                  />
                ))
              ) : (
                <>
                  <div></div> {/* for align center */}
                  <FatText text={"No Posts"}></FatText>
                </>
              )}
            </PostSection>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default withRouter(Profile);
