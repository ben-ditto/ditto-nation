import { useState } from "react";
import Image from "next/image";
//Swiper
import { Swiper } from "swiper";
import { Swiper as SwiperSlider, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Lazy } from "swiper";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-flip";

//Hooks
import useMedia from "lib/useMedia";
import { Image as ProductImage } from "src/generated/graphql";

interface IProps {
  images: ProductImage[];
}

const ProductView: React.FC<IProps> = ({ images }) => {
  const [swiper, setSwiper] = useState<Swiper>();

  const isDesktop = useMedia();

  return (
    <div>
      <SwiperSlider
        // install Swiper modules
        modules={[Navigation, Pagination]}
        preloadImages
        spaceBetween={20}
        slidesPerView={1}
        centeredSlides={true}
        navigation
        autoHeight={isDesktop}
        onSwiper={setSwiper}
        // onSlideChange={() => console.log("slide change")}
      >
        {images.map((image) => {
          return (
            <SwiperSlide
              className=" flex justify-center items-center"
              key={image.id}
            >
              <Image
                src={image.url}
                alt={image.altText}
                width={image.width}
                height={image.height}
                priority
                // blurDataURL={image.url} //automatically provided
                // placeholder="blur" // Optional blur-up while loading
              />
              {/* </div> */}
            </SwiperSlide>
          );
        })}
      </SwiperSlider>
    </div>
  );
};

export default ProductView;
