import SingleProduct from "./SingleProduct";

const ProductFeed = ({ products }) => {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-40 pb-8">
      {products.slice(0, 4).map((product) => {
        return <SingleProduct key={product.key} product={product} />;
      })}
      <img
        src="https://links.papareact.com/dyz"
        alt="image"
        className="md:col-span-full"
      />
      <div className="md:col-span-2">
        {products.slice(4, 5).map((product) => {
          return <SingleProduct key={product.key} product={product} />;
        })}
      </div>
      {products.slice(5, products.length).map((product) => {
        return <SingleProduct key={product.key} product={product} />;
      })}
    </div>
  );
};

export default ProductFeed;
