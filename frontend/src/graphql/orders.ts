import { gql, request } from "graphql-request";

export const getOrders = gql`
  query Orders {
    orders {
      documentId
      user_id {
        username
        documentId
      }
      total
      order_items {
        documentId
        drink {
          name
        }
        quantity
      }
      paymentMethod
    }
  }
`;

export const createOrder = gql`
  mutation CreateOrder($data: OrderInput!) {
    createOrder(data: $data) {
      documentId
      dateCreated
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
