import { gql } from "graphql-request";

class CategoryAndTagQuery {
  static getAllCategories() {
    return gql`
      query getAllCategories($page: Int!, $pageSize: Int!) {
        categories(pagination: { page: $page, pageSize: $pageSize }) {
          data {
            id
            attributes {
              title
              slug
            }
          }
          meta {
            pagination {
              pageCount
              total
              pageSize
              page
            }
          }
        }
      }
    `;
  }
  static getAllTags() {
    return gql`
      query getAllTags($page: Int!, $pageSize: Int!) {
        tags(pagination: { page: $page, pageSize: $pageSize }) {
          data {
            id
            attributes {
              title
              slug
            }
          }
          meta {
            pagination {
              pageCount
              total
              pageSize
              page
            }
          }
        }
      }
    `;
  }

  static getOneCategory() {
    return gql`
      query getOneCategory($id: Int!) {
        category(id: $id) {
          data {
            id
            attributes {
              title
              slug
            }
          }
        }
      }
    `;
  }
  static getOneTag() {
    return gql`
      query getOneTag($id: Int!) {
        tag(id: $id) {
          data {
            id
            attributes {
              title
              slug
            }
          }
        }
      }
    `;
  }
}

export default CategoryAndTagQuery;
