import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute h-32 left-0 bottom-0 w-full bg-gradient-to-t from-gray-100 to-transparent z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        interval={4000}
      >
        <div>
          <img loading="lazy" src="https://links.papareact.com/gi1" />
        </div>
        <div>
          <img loading="lazy" src="https://links.papareact.com/6ff" />
        </div>
        <div>
          <img loading="lazy" src="https://links.papareact.com/7ma" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
