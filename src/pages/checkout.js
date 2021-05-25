import Image from "next/image";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { selectItems, selectTotalPrice } from "../slices/basketSlice";
import { useRouter } from "next/router";
import CheckoutProduct from "../components/CheckoutProduct";
import { clearBasket } from "../slices/basketSlice";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/client";
import Currency from "react-currency-formatter";

const Checkout = () => {
  const [session] = useSession();

  const items = useSelector(selectItems);
  const totalPrice = useSelector(selectTotalPrice);

  const dispatch = useDispatch();

  const router = useRouter();

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
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
        <div className="text-center w-full md:w-80 mx-auto sm:mt-8 sm:ml-20 p-5 mr-10 flex flex-col items-center space-y-7">
          {items.length ? (
            <Currency quantity={totalPrice * 70} currency="INR" />
          ) : (
            ""
          )}
          <button
            className={`button  ${
              (!session || !items.length) && "gray cursor-not-allowed"
            } mt-4 `}
            disabled={!session || !items.length ? true : false}
          >
            Checkout Products
          </button>
          <h4 className="pb-4 italic text-gray-500">Proceed to Checkout</h4>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
