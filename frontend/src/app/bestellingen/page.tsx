import { Order } from "@/types/types";
import { getOrdersByFilter } from "@/graphql/orders";
import { request } from "graphql-request";
import OrderItem from "@/components/OrderItem";
import EmptyView from "@/components/views/EmptyView";
import "@/css/bestellingen.css";
import Link from "next/link";

export default async function Orders() {
  async function fetchOrders() {
    try {
      const response = (await request(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`,
        getOrdersByFilter,
        {
          filters: {
            isCompleted: {
              eq: false,
            },
          },
        }
      )) as { orders: Order[] };

      return response.orders;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function fetchTabs() {
    try {
      const response = (await request(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`,
        getOrdersByFilter,
        {
          filters: {
            paymentMethod: {
              eq: "tab",
            },
            isPaid: {
              eq: false,
            },
          },
        }
      )) as { orders: Order[] };

      return response.orders;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const unCompletedOrders = await fetchOrders();

  const tabs = await fetchTabs();

  const userTabOrders = [
    ...new Map(
      tabs?.map((order) => [order.user_id.documentId, {
        documentId: order.user_id.documentId,
        username: order.user_id.username,
      }])
    ).values(),
  ];
  console.log(userTabOrders);

  const filteredUsers = unCompletedOrders
    ? [
        ...new Set(
          unCompletedOrders
            .filter((order) => {
              return order.user_id.username;
            })
            .flatMap((order) => order.user_id.username)
        ),
      ]
    : [];

  if (!unCompletedOrders &&!tabs ) {
    return <EmptyView text="Geen openstaande bestellingen" />;
  }

  return (
    <div className="orders">
      {userTabOrders.length > 0 ? (
        <>
          <h3 className="orders__title">Openstaande rekeningen</h3>
          {userTabOrders.map((item, index) => (
            <Link
              key={index}
              href={`/bestellingen/gebruiker/${item.documentId}`}
              className="orders__tab"
            >
              {item.username}
            </Link>
          ))}
        </>
      ) : (
        <></>
      )}
      {filteredUsers.map((username) => {
        return (
          <div key={username} className="orders__user-section">
            <h3 className="orders__title">bestellingen</h3>
            <h2 className="orders__user-title">{username}</h2>
            <div className="orders__section"></div>

            <div className="orders__section">
              
              {unCompletedOrders.length > 0 ? (
                <ul className="orders__list">
                  {unCompletedOrders.map((order, index) => (
                    <OrderItem key={index} order={order} />
                  ))}
                </ul>
              ) : (
                <EmptyView text="Geen betaalde bestellingen" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
