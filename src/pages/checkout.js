import Image from "next/image";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import {
  selectItems,
  selectTotalPrice,
  selectTotalQty,
} from "../slices/basketSlice";
import { useRouter } from "next/router";
import CheckoutProduct from "../components/CheckoutProduct";
import { clearBasket } from "../slices/basketSlice";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/client";
import Currency from "react-currency-formatter";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Head from "next/head";

const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout = () => {
  const [session] = useSession();
  const items = useSelector(selectItems);
  const totalPrice = useSelector(selectTotalPrice);
  const totalQty = useSelector(selectTotalQty);

  const dispatch = useDispatch();

  const router = useRouter();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    //call the backend to create a checkout session...
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });

    //Redirect user/customer to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) console.log(result.error.message);
  };

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header />
      <main className="lg:flex max-w-screen-2xl space-x-6 mx-auto justify-between">
        {/* left */}
        <div>
          <Image
            src="https://links.papareact.com/ikj"
            height={250}
            width={1020}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length ? "Your Shopping Basket" : "Basket Empty"}
            </h1>
            {!items.length ? (
              <div className="flex flex-col items-center p-5">
                <img
                  loading="lazy"
                  className="h-96 w-full object-contain -mt-10"
                  src="https://mykit.in/public/img/images/emptycart.svg"
                  alt="Empty Basket"
                />
                <button
                  onClick={() => router.push("/")}
                  className="button text-lg px-8"
                >
                  Add Some Item
                </button>
              </div>
            ) : (
              <>
                {items.map((item, index) => (
                  <CheckoutProduct key={index} {...item} />
                ))}
                <button
                  onClick={() => dispatch(clearBasket())}
                  className="button"
                >
                  Clear Basket
                </button>
              </>
            )}
          </div>
        </div>

        {/* right */}
        <div className="text-center block bg-white min-w-1/3 ml-auto p-5 ">
          <div className="font-semibold whitespace-nowrap mt-8">
            Sub-Total ({totalQty} items) :
            {items.length ? (
              <Currency quantity={totalPrice * 70} currency="INR" />
            ) : (
              <Currency quantity={0} currency="INR" />
            )}
          </div>
          <button
            onClick={createCheckoutSession}
            role="link"
            className={`button block mx-auto  ${
              (!session || !items.length) && "gray cursor-not-allowed"
            } mt-4 `}
            disabled={!session || !items.length ? true : false}
          >
            Proceed to Checkout
          </button>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
