import React from "react";

import { followImages } from "../../../assets/home/follow/followImages";

// react icons
import { AiOutlineInstagram, AiOutlineMail } from "react-icons/ai";
import { BsBox } from "react-icons/bs";
import { CgLockUnlock } from "react-icons/cg";

const Follow = () => {
  const shipping = [
    {
      name: "Entrega rápida e segura",
      desc: "Trabalhamos com parceiros confiáveis ​​para garantir que seus perfumes cheguem com segurança até você.",
      icon: <BsBox className="h-6 w-6" />,
    },
    {
      name: "Pagamento Presencial",
      desc: "A sua segurança é a nossa prioridade! Na hora da entrega presencial, garantimos um processo de pagamento seguro e sem preocupações.",
      icon: <CgLockUnlock className="h-6 w-6" />,
    },
    {
      name: "Contacte-nos",
      desc: "E-mail : good@all.com / Telefone : 923 476 534",
      icon: <AiOutlineMail className="h-6 w-6" />,
    },
  ];

  return (
    <section className="flex w-full items-center bg-bgcolor2 md:min-h-screen justify-center">
      <div className="container mx-auto py-16 px-6 lg:px-16">
        <div className="space-y-6 text-center md:space-y-12">
          {/* text div */}
          <h1 className="font-gotu text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
            Segue nos @goodal
          </h1>

          {/* grid div */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {followImages.map((item) => (
              <div key={item.id} className="group relative h-40 md:h-48">
                <div className="transition duration-200 ease-in md:opacity-0 md:group-hover:opacity-100">
                  <div className="absolute top-[75%] bottom-0 left-0 right-0 z-0 md:top-0">
                    <div className="h-full w-full bg-black opacity-30"></div>
                  </div>

                  <AiOutlineInstagram className="absolute left-[40%] top-[77%] h-8 w-8 text-white md:top-[45%]" />
                </div>

                <img
                  src={item.img}
                  alt={item.img}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* SHIPPING div */}
          <div className="grid gap-10 px-6 pt-10 text-secondary md:grid-cols-3 md:px-12">
            {shipping.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div>{item.icon}</div>

                <h2 className="font-bold">{item.name}</h2>

                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Follow;
