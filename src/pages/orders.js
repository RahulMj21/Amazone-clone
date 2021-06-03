import { getSession, useSession } from "next-auth/client";
import Header from "../components/Header";
import { db } from "../../firebase";
import moment from "moment";
import { useRouter } from "next/router";
import Order from "../components/Order";
import Head from "next/head";

const Orders = ({ orders }) => {
  const router = useRouter();
  const [session] = useSession();
  return (
    <div>
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>

        {!session ? (
          <h2>Please sign in to see your orders</h2>
        ) : !orders.length ? (
          <div className="flex flex-col items-center">
            <h1>You don't have any orders to show</h1>
            <button
              className="button mx-auto mt-5"
              onClick={() => router.push("/")}
            >
              Back to Home
            </button>
          </div>
        ) : (
          <>
            <h2>{orders.length} orders</h2>
            {orders.map((order) => (
              <Order key={order.id} {...order} />
            ))}
          </>
        )}
      </main>
    </div>
  );
};

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  //Get the user's logged in credentials
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  //Firebase db
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  //stripe orders

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  //return the orders
  return {
    props: {
      orders,
    },
  };
}
