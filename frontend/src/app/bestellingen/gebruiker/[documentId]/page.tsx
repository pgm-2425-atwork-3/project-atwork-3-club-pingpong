import { Order } from "@/types/types";
import { getOrdersByFilter } from "@/graphql/orders";
import { request } from "graphql-request";
import TabList from "@/components/TabList";
import "@/css/bestellingen.css";
import EmptyView from "@/components/views/EmptyView";

export default async function Page({ params }: { params: any }) {
  const documentId = (await params).documentId;

  async function fetchOrder() {
    try {
      const response = await request(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`,
        getOrdersByFilter,
        {
          filters: {
            user_id: {
              documentId: { eq: documentId },
            },
            isPaid: { eq: false },
          },
        }
      );
      return response as { orders: Order[] };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  const orders = await fetchOrder();

  return orders ? (
    <TabList orders={orders.orders} />
  ) : (
    <EmptyView text="Geen openstaande rekening gevonden" />
  );
}
