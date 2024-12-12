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
        drink {
          documentId
          name
        }
      }
    }
  }
`;

export const createOrder = gql`
  mutation CreateOrder($data: OrderInput!) {
    createOrder(data: $data) {
      documentId
      user_id {
        documentId
      }
      paymentMethod
      total
    }
  }
`;

export const createOrderItem = gql`
  mutation CreateOrderItem($data: OrderItemInput!) {
    createOrderItem(data: $data) {
      drink {
        documentId
      }
      order {
        documentId
      }
      quantity
    }
  }
`;
