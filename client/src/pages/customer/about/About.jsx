import React from "react";

import goodal from "../../../assets/about/goodal.mp4";

import { aboutImages } from "../../../assets/about/aboutImages";

const About = () => {
  return (
    <main className="min-h-screen w-full bg-bgcolor2">
      <div className="container mx-auto space-y-16 py-6 px-6 md:space-y-32 md:pb-32 lg:px-16">
        {/* header */}
        <div className="mt-20 flex flex-col items-center space-y-8">
          <h1 className="font-urbanist text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
            Good for ALL
          </h1>
          <p className="flex w-4/5 flex-col space-y-6 text-center font-gotu text-lg text-secondary md:text-2xl lg:text-3xl">
            <span>Goodal da junção de "good + all".</span>
            <span>
              Acreditamos em fazer bons produtos para a pele que são bons para todos.
              Bons cuidados com a pele devem ser simples, não complicados ou esmagadores.
            </span>

            <span>
            Goodal colheu plantas que cresceram em diversas mudanças ambientais
               em temporada. Com tecnologia moderna, filtramos cuidadosamente
               impurezas fervendo lentamente as matérias-primas e extraindo apenas
               ingredientes ativos frescos.
            </span>
          </p>
        </div>

        <div className="flex justify-center">
          <video
            className="rounded-xl shadow-md md:w-4/5  max-h-screen"
            src={goodal}
            autoPlay
            loop
            muted

          />
        </div>

        {/* grid container */}
        <div className="grid gap-8 p-6 md:grid-cols-2 md:gap-24">
          {/* way 1 */}
          <div className="space-y-4 self-center">
            <h2 className="font-urbanist text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
              {aboutImages[0].name}
            </h2>
            <p className="font-gotu text-base text-secondary md:text-lg lg:text-xl">
              {aboutImages[0].desc}
            </p>
          </div>

          <img
            className="h-64 w-full overflow-hidden rounded-lg object-cover shadow-2xl md:h-96"
            src={aboutImages[0].img}
            alt="/"
          />

          {/* way 2 */}
          <div className="space-y-4 self-center md:col-start-2 md:row-start-2">
            <h2 className="font-urbanist text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
              {aboutImages[1].name}
            </h2>
            <p className="font-gotu text-base text-secondary md:text-lg lg:text-xl">
              {aboutImages[1].desc}
            </p>
          </div>

          <img
            className="h-64 w-full overflow-hidden rounded-lg object-cover shadow-2xl md:h-96"
            src={aboutImages[1].img}
            alt="/"
          />

          {/* way 3 */}
          <div className="space-y-4 self-center">
            <h2 className="font-urbanist text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
              {aboutImages[2].name}
            </h2>
            <p className="font-gotu text-base text-secondary md:text-lg lg:text-xl">
              {aboutImages[2].desc}
            </p>
          </div>

          <img
            className="h-64 w-full overflow-hidden rounded-lg object-cover shadow-2xl md:h-96"
            src={aboutImages[2].img}
            alt="/"
          />
        </div>
      </div>
    </main>
  );
};

export default About;
