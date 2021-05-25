import Image from "next/image";
import {
  ChartBarIcon,
  ChartSquareBarIcon,
  MenuAlt1Icon,
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectTotalQty } from "../slices/basketSlice";

function Header() {
  const [session] = useSession();
  const router = useRouter();

  const itemsQty = useSelector(selectTotalQty);

  return (
    <header>
      {/* top nav */}
      <div className="bg-amazon_blue w-full flex items-center p-2 space-x-4 pr-4">
        <div className="flex items-center flex-grow sm:flex-grow-0 mt-2 cursor-pointer">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            height={38}
            width={140}
            objectFit="contain"
          />
        </div>
        {/* search */}
        <div className="hidden sm:flex items-center flex-grow bg-yellow-400 rounded-md hover:bg-yellow-500 cursor-pointer">
          <input
            type="text"
            className="flex-grow h-10 p-2 focus:outline-none rounded-l-md"
          />
          <SearchIcon className="h-10 p-2" />
        </div>
        {/* right side */}
        <div className="flex items-center space-x-6 text-white text-sm md:text-xs whitespace-none">
          <div
            onClick={!session ? signIn : signOut}
            className="hover:underline cursor-pointer"
          >
            <p>{session ? `Hello, ${session.user.name}` : "Sign In"}</p>
            <p className="font-bold text-sm">Account & Lists</p>
          </div>
          <div className="hover:underline cursor-pointer">
            <p>Returns</p>
            <p className="font-bold text-sm">& Orders</p>
          </div>
          <div
            onClick={() => router.push("/checkout")}
            className="flex items-center relative cursor-pointer"
          >
            <span className="absolute -top-1 right-0 sm:right-4 z-10 bg-yellow-400 text-black p-1 px-2 rounded-full text-xs">
              {itemsQty}
            </span>
            <ShoppingCartIcon className="h-11" />
            <p className="mt-4 hidden sm:inline text-sm font-bold">Cart</p>
          </div>
        </div>
      </div>
      {/* bottom nav */}
      <div className="flex items-center space-x-6 p-2 px-4 bg-amazon_blue-light text-white">
        <p className="flex items-center cursor-pointer">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className=" cursor-pointer">Best Seller</p>
        <p className=" cursor-pointer">Mobiles</p>
        <p className=" cursor-pointer">Prime</p>
        <p className=" cursor-pointer">Fashion</p>
        <p className="hidden sm:inline cursor-pointer">New Releases</p>
        <p className="hidden sm:inline cursor-pointer">Electronics</p>
        <p className="hidden sm:inline cursor-pointer">Customer Service</p>
        <p className="hidden sm:inline cursor-pointer">Today's Deals</p>
        <p className="hidden sm:inline cursor-pointer">Amazon Pay</p>
      </div>
    </header>
  );
}

export default Header;
