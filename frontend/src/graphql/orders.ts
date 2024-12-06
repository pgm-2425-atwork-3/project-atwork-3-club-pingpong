import { gql, request } from "graphql-request";

export const getOrders = gql`
  query Orders {
    orders {
      documentId
      paymentMethod
      user_id {
        documentId
        username
      }
      order_items {
        documentId
        quantity
        drink_id {
          name
          unit_price
          documentId
        }
      }
    }
  }
`;

export const createOrder = gql`
  mutation CreateOrder($data: OrderInput!) {
    createOrder(data: $data) {
      documentId
      paymentMethod
      user_id {
        documentId
      }
      order_items {
        documentId
      }
    }
  }
`;
