import { gql } from "graphql-request";

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
      dateCreated
    }
  }
`;

export const getOrdersByFilter = gql`
  query Orders($filters: OrderFiltersInput) {
    orders(filters: $filters) {
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
          unit_price
        }
        quantity
      }
      paymentMethod
      dateCreated
      isCompleted
      isPaid
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

export const completeOrder = gql`
  mutation Mutation($documentId: ID!, $data: OrderInput!) {
    updateOrder(documentId: $documentId, data: $data) {
      isCompleted
    }
  }
`;

export const GetOrderById = gql`
  query GetOrderById($documentId: ID!) {
    order(documentId: $documentId) {
      isCompleted
      order_items {
        drink {
          name
          unit_price
        }
        quantity
      }
      paymentMethod
      total
      user_id {
        username
      }
    }
  }
`;
