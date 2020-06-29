import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import useInput from "../Hooks/useInput";
import { FeedIcon, DMIcon, ExploreIcon, NotificationIcon } from "./Icons";

const ICON_SIZE = 24;

const Container = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  justify-content: space-between;
  padding: 9px 20px;
  background-color: white;
  border-bottom: ${props => props.theme.boxBorder};
  @media (max-width: 760px) {
    & form {
      display: none;
    }
  }
`;

const Logo = styled.div`
  line-height: 32px;
  font-size: 28px;
  font-weight: 600;
  font-family: ${props => props.theme.logoFont};
  margin-bottom: 52px;
  min-width: 200px;
  color: ${props => props.theme.blackColor};
`;
const SearchBar = styled.form`
  min-width: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &:focus-within {
    svg {
      left: 20px;
    }
  }
`;

const Search = styled.input`
  height: 26px;
  width: 225px;
  padding: 0 5px;
  background-color: ${props => props.theme.bgColor};
  border-radius: ${props => props.theme.borderRadius};
  border: ${props => props.theme.boxBorder};
  text-align: center;
  &::placeholder {
    opacity: 0.7;
    font-weight: 300;
  }
  &:focus {
    outline: none;
    text-align: start;
    padding-left: 30px;
  }
`;
const IconSearch = styled.svg`
  position: absolute;
  top: 12px;
  left: 80px;
  opacity: 0.35;
`;
const Icons = styled.div`
  min-width: 240px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconFeed = styled(Link)``;
const IconDM = styled(Link)``;
const IconExplore = styled(Link)``;
const IconNotification = styled(Link)``;

const IconProfile = styled(Link)``;
const Profile = styled.div`
  width: ${ICON_SIZE}px;
  height: ${ICON_SIZE}px;
  border-radius: 16px;
  border: ${props => props.theme.boxBorder};
  margin-bottom: 3px;
  background-image: url(${props => props.bg});
  background-position: center;
  background-size: cover;
`;

const ME = gql`
  query {
    myProfile {
      username
      avatar
    }
  }
`;

const Header = ({ history }) => {
  const search = useInput("");
  const { data, loading } = useQuery(ME);
  console.log(data);

  const onSearchSubmit = e => {
    e.preventDefault();
    if (search.value === undefined || search.value === "")
      history.push("/search");
    else history.push(`/search?term=${search.value}`);
  };
  return (
    <Container>
      <Link to="/">
        <Logo>LUCKLE</Logo>
      </Link>
      <SearchBar onSubmit={onSearchSubmit}>
        <IconSearch
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
        >
          <path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z" />
        </IconSearch>
        <Search
          value={search.value}
          onChange={search.onChange}
          placeholder="Search"
        ></Search>
      </SearchBar>
      <Icons>
        <IconFeed to="/">
          <FeedIcon size={ICON_SIZE} />
        </IconFeed>
        <IconDM>
          <DMIcon size={ICON_SIZE} />
        </IconDM>
        <IconExplore to="/explore">
          <ExploreIcon size={ICON_SIZE} />
        </IconExplore>
        <IconNotification to="/notification">
          <NotificationIcon size={ICON_SIZE} />
        </IconNotification>
        {loading ? (
          <IconProfile to="/#">
            <Profile />
          </IconProfile>
        ) : (
          <IconProfile to={data.myProfile.username}>
            <Profile bg={data.myProfile.avatar} />
          </IconProfile>
        )}
      </Icons>
    </Container>
  );
};
export default withRouter(Header);
