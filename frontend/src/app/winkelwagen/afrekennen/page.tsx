import authOptions from "@/lib/authOptions";
import { auth } from "@/auth";
import Cart from "./components/cart";

export default async function Checkout() {
  const session = await await auth();
  console.log(session);
  return <Cart user={session.user} />;
}
