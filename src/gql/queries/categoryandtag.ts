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
}

export default CategoryAndTagQuery;
