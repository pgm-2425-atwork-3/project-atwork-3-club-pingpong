import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Cart from "./components/cart";

export default async function Checkout() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return <Cart user={session} />;
}
