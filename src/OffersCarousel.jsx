import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useRef, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";

const carOffers = [
  { name: "Hyundai IONIQ 5", price: "₹7,05,000*", image: "/images/ioniq_thumbnail_pc.png" },
  { name: "Hyundai Verna", price: "₹55,000*", image: "/images/verna.png" },
  { name: "Hyundai Venue", price: "₹60,000*", image: "/images/Venue.png" },
  { name: "Hyundai i20", price: "₹80,000*", image: "/images/i20.png" },
  { name: "Hyundai Aura", price: "₹33,000*", image: "/images/Aura.webp" },
  { name: "Hyundai Grand i10 NIOS", price: "₹75,000*", image: "/images/Grand _10_Nios.png" },
  { name: "Hyundai Alcazar", price: "₹50,000*", image: "/images/HYUNDAI-ALCAZAR.png" },
  { name: "Hyundai EXTER", price: "₹75,000*", image: "/images/EXTER.png" },
  { name: "Hyundai TUCSON", price: "₹25,000*", image: "/images/Hyundai_Tucson.png" },
  { name: "Hyundai Creta", price: "₹5,000*", image: "/images/creta-suvpc.png" },
];

export default function OffersCarousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    if (swiper) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  return (
    <section className="py-14 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
      <h2 className="mb-10 text-4xl font-bold text-center text-white">
        Hyundai Exclusive Offers
      </h2>

      <div className="relative px-6 mx-auto max-w-7xl">
        {/* NAV BUTTONS */}
        <button
          ref={prevRef}
          className="absolute z-10 p-3 text-black -translate-y-1/2 rounded-full shadow left-2 top-1/2 bg-white/90 hover:bg-white"
        >
          ❮
        </button>

        <button
          ref={nextRef}
          className="absolute z-10 p-3 text-black -translate-y-1/2 rounded-full shadow right-2 top-1/2 bg-white/90 hover:bg-white"
        >
          ❯
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
          onSwiper={setSwiper}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {carOffers.map((car, i) => (
            <SwiperSlide key={i}>
              <div className="relative overflow-hidden transition-all bg-white shadow-lg group rounded-2xl hover:-translate-y-2 hover:shadow-2xl">
                
                {/* OFFER TAG */}
                <span className="absolute z-10 px-4 py-1 text-xs font-semibold text-white bg-red-600 rounded-full left-4 top-4">
                  LIMITED OFFER
                </span>

                {/* IMAGE */}
                <div className="overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="object-contain w-full h-48 transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {car.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Save up to
                  </p>

                  <p className="text-xl font-bold text-red-600">
                    {car.price}
                  </p>

                  <button className="mt-4 w-full rounded-lg bg-[#203a43] py-2 text-sm font-semibold text-white hover:bg-[#2c5364]">
                    Enquire Now
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <p className="px-6 mx-auto mt-6 text-xs text-right text-gray-300 max-w-7xl">
        *Terms & Conditions apply
      </p>
    </section>
  );
}
