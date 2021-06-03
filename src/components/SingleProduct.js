import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";
import Aos from "aos";
import "aos/dist/aos.css";

const SingleProduct = ({ product }) => {
  const { id, title, category, description, image, price } = product;
  const [rating] = useState(Math.ceil(Math.random() * (5 - 1) + 1));
  const [hasPrime] = useState(Math.random() < 0.5);

  const dispatch = useDispatch();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  });

  const addItem = () => {
    dispatch(addToBasket({ ...product, hasPrime, rating, qty: 1 }));
  };

  return (
    <div key={id} data-aos="fade-up" className="m-5 z-30">
      <div className="relative h-full w-full flex flex-col  p-10 bg-white transition duration-500 ease-in-out transform hover:-translate-y-4">
        <p className="absolute top-4 right-4 text-xs italic text-gray-400">
          {category}
        </p>
        <Image height={200} width={200} objectFit="contain" src={image} />
        <h3 className="my-3">{title}</h3>
        <div className="flex text-yellow-500">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5" />
            ))}
        </div>

        <p className="text-xs my-2 line-clamp-2">{description}</p>
        <div className="mb-5">
          <Currency quantity={price * 70} currency="INR" />
        </div>
        {hasPrime && (
          <div className="flex items-center space-x-2 -mt-5">
            <img
              src="https://links.papareact.com/fdw"
              alt="prime image"
              className="w-12"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}

        <button onClick={() => addItem()} className="mt-auto button w-full">
          Add to Basket
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
