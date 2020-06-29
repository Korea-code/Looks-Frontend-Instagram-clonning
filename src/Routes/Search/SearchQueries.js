import { gql } from "apollo-boost";

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(word: $term) {
      files {
        url
      }
      likeCount
      commentCount
    }
    searchUser(word: $term) {
      id
      avatar
      username
      isFollowing
      isSelf
    }
  }
`;
