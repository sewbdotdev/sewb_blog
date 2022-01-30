import { gql } from "graphql-request";

class PostQuery {
  static getPostsByCategory() {
    return gql`
      query getPostsByCategory($slug: String!, $page: Int!, $pageSize: Int!) {
        posts(
          filters: { category: { slug: { eq: $slug } } }
          pagination: { page: $page, pageSize: $pageSize }
        ) {
          data {
            id
            attributes {
              title
              publishedAt
              slug
              description
              readTime
              tags {
                data {
                  id
                  attributes {
                    title
                    slug
                  }
                }
              }
              category {
                data {
                  id
                  attributes {
                    title
                    slug
                  }
                }
              }
              authors {
                data {
                  id
                  attributes {
                    username
                  }
                }
              }
              featuredImage {
                data {
                  id
                  attributes {
                    width
                    height
                    alternativeText
                    caption
                    url
                  }
                }
              }
            }
          }
          meta {
            pagination {
              total
              page
              pageSize
              pageCount
            }
          }
        }
      }
    `;
  }
  static getPostsByTags() {
    return gql`
      query getPostsByCategory($slug: String!, $page: Int!, $pageSize: Int!) {
        posts(
          filters: { tags: { slug: { eq: $slug } } }
          pagination: { page: $page, pageSize: $pageSize }
        ) {
          data {
            id
            attributes {
              title
              publishedAt
              slug
              description
              readTime
              tags {
                data {
                  id
                  attributes {
                    title
                    slug
                  }
                }
              }
              category {
                data {
                  id
                  attributes {
                    title
                    slug
                  }
                }
              }
              authors {
                data {
                  id
                  attributes {
                    username
                  }
                }
              }
              featuredImage {
                data {
                  id
                  attributes {
                    width
                    height
                    alternativeText
                    caption
                    url
                  }
                }
              }
            }
          }
          meta {
            pagination {
              total
              page
              pageSize
              pageCount
            }
          }
        }
      }
    `;
  }
}

export default PostQuery;
