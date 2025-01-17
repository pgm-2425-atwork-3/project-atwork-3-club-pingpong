import { Order } from "@/types/types";
import { getUncompletedOrders, completeOrder } from "@/graphql/orders";
import { request } from "graphql-request";
import OrderItem from "@/components/OrderItem";
import EmptyView from "@/components/views/EmptyView";
import "@/css/bestellingen.css";
import TabList from "@/components/TabList";

export default async function Orders() {
  async function fetchOrders() {
    try {
      const response = (await request(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`,
        getUncompletedOrders,
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

  const orders = await fetchOrders();

  const tabOrders = orders?.filter((order) => {
    return order.paymentMethod === "tab";
  });

  const payedOrders = orders?.filter((order) => {
    return order.paymentMethod !== "tab";
  });

  const filteredUsers = orders
    ? [
        ...new Set(
          orders
            .filter((order) => {
              return order.user_id.username;
            })
            .flatMap((order) => order.user_id.username)
        ),
      ]
    : [];

  if (!orders || orders.length === 0) {
    return <EmptyView text="Geen openstaande bestellingen" />;
  }

  return (
    <div className="orders">
      {filteredUsers.map((username) => {
        const userOrders = orders.filter(
          (order) => order.user_id.username === username
        );
        const userTabOrders = userOrders.filter(
          (order) => order.paymentMethod === "tab"
        );
        console.log(userTabOrders);
        const userPayedOrders = userOrders.filter(
          (order) => order.paymentMethod !== "tab"
        );

        return (
          <div key={username} className="orders__user-section">
            <h2 className="orders__user-title">{username}</h2>
            <div className="orders__section">
              {userTabOrders.length > 0 ? (
                <>
                  <h3 className="orders__title">Openstaande rekeningen</h3>

                  <TabList orders={userTabOrders} />
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="orders__section">
              <h3 className="orders__title">Online betaalde bestellingen</h3>
              {userPayedOrders.length > 0 ? (
                <ul className="orders__list">
                  {userPayedOrders.map((order, index) => (
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
