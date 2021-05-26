import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

const CheckoutProduct = ({
  id,
  title,
  price,
  rating,
  description,
  image,
  hasPrime,
  qty,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-5 space-y-4">
      {/* left */}
      <Image src={image} height={200} width={200} objectFit="contain" />
      {/* middle */}
      <div className="col-span-3 px-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => {
              return <StarIcon className="h-5 text-yellow-500" key={i} />;
            })}
        </div>
        <p className="text-xs">{qty} Pcs</p>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency
          quantity={qty === 1 ? price * 70 : price * qty * 70}
          currency="INR"
        />

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              src="https://links.papareact.com/fdw"
              alt="prime delivery"
              loading="lazy"
              className="w-12"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      {/* right */}
      <div className="flex flex-col my-auto justify-self-end space-y-2">
        <button
          onClick={() => dispatch(addToBasket({ id, price }))}
          className="button"
        >
          Add Another
        </button>
        <button
          className="button"
          onClick={() => dispatch(removeFromBasket({ id }))}
        >
          Remove Item
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
