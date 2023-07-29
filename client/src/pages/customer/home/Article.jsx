import React, { useEffect } from "react";

import Button from "../../../components/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { articleImages } from "../../../assets/home/article/articleImages";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import { readCustomerProducts } from "../../../features/customer/product/productCustomerSlice";
import { Link } from "react-router-dom";

const Article = () => {
  const dispatch = useDispatch()
  const products = useSelector(
    (store) => store.productsCustomer.products
  );
  useEffect(()=>{
    dispatch(readCustomerProducts())
  },[])
  return (
    <section className="flex w-full items-center bg-bgcolor md:min-h-screen">
      <div className="container mx-auto py-16 px-6 lg:px-16">
        <div className="space-y-4 md:space-y-8">
          {/* text div */}
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center md:gap-0">
            <h1 className="font-gotu text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
              Produtos recentes
            </h1>

            <Button
              navigateTo="/products"
              btnStyle="btn-primary"
              text="Ver mais produtos"
            />
          </div>

          {/* slider div */}
          <div>
            <Swiper
              className="relative"
              modules={[Navigation]}
              loop={true}
              navigation={{
                nextEl: ".button-next-slide",
                prevEl: ".button-prev-slide",
              }}
              breakpoints={{
                "@0.00": {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                "@0.75": {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                "@1.00": {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
            >
              {products.productsData?.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="grid">
                  <Link
                          to={`/products/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                          state={{ item }}
                        >
                  <div key={item._id} className="space-y-3 text-center bg-gray-100 rounded-lg shadow-sm m-2 shadow-black">
                  
                    <div className="relative">
                      <div className="group relative grid h-44 justify-center md:h-80">
                        
                          <img
                            className="absolute inset-0 h-full m-auto  object-cover transition duration-500 ease-in-out group-hover:opacity-0 "
                            src={item.imgOne.url}
                            alt={item.name}
                          />

                          <img
                            className="absolute inset-0 h-full m-auto w-full rounded-lg object-cover opacity-0 shadow-xl transition duration-500 ease-in-out group-hover:opacity-100 "
                            src={item.imgTwo.url}
                            alt={item.name}
                          />
                       

                       
                      </div>

                     
                    </div>
          
                    <div className="flex h-14 items-center justify-center">
                      <p className="font-urbanist text-base text-secondary md:text-lg lg:text-xl">
                        {item.name}
                      </p>
                    </div>

                    <div className="flex items-center justify-center">
                      <span className="font-urbanist text-base font-bold text-secondary md:text-lg lg:text-xl">
                        {item.price} Kz
                      </span>
                    </div>
                  </div>
                  </Link>
                  </div>
                </SwiperSlide>
              ))}

              <button className="button-prev-slide absolute top-[23%] left-0 z-10 grid h-10 w-10 place-items-center bg-zinc-900/90 text-bgcolor transition duration-300 ease-in  hover:bg-zinc-900 hover:text-bgcolor2">
                <IoIosArrowBack />
              </button>

              <button className="button-next-slide absolute top-[23%] right-0 z-10 grid h-10 w-10 place-items-center bg-zinc-900/90 text-bgcolor transition duration-300 ease-in hover:bg-zinc-900  hover:text-bgcolor2">
                <IoIosArrowForward />
              </button>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Article;
