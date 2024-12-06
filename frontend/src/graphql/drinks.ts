import { gql, request } from "graphql-request";

export const getDrinks = gql`
  query Drinks {
    drinks {
      documentId
      name
      drink_image {
        url
        alternativeText
      }
      unit_price
    }
  }
`;
