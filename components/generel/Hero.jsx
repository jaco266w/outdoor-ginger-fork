import React from "react";
import Image from "next/image";

function Hero({
  children,
  title,
  height = "h-96 md:h-[80vh]",
  bgPos = "bg-center",
  bg,
  padding = "pb-20 md:pb-32",
  imageSrc,
  objPos = "object-center",
}) {
  const leftSideChildren = React.Children.toArray(children).filter(
    (child) => child.props.id === "left",
  );
  const rightSideChildren = React.Children.toArray(children).filter(
    (child) => child.props.id === "right",
  );
  return (
    <section className={`relative mb-6 ${bg} ${bgPos} bg-cover px-8 md:px-8 `}>
      <div
        className={`overflow-hidden flex flex-col justify-end gap-0  md:grid grid-cols-2 max-w-7xl mx-auto ${padding} ${height}`}
      >
        <div className="place-self-end z-30 w-full flex flex-col justify-end h-fit order-2 md:order-0">
          <h1 className="text-5xl md:text-7xl font-bold text-ogBG-base uppercase m-0 tracking-tight leading-none">
            {title}
          </h1>
          {leftSideChildren}
        </div>
        <div className="z-40 place-self-end h-fit w-full md:order-2">
          {rightSideChildren}
        </div>
      </div>
      <div className="rounded-t-[3rem] bg-ogBG-base col-span-2 h-12 z-30 absolute bottom-0 left-0 w-full"></div>
      <div className=" bg-gradient-to-tr from-ogLabel-base to-transparent  w-full h-full absolute top-0 left-0 z-20 opacity-50"></div>
      {!bg && (
        <Image
          src={imageSrc}
          alt=""
          width={1920}
          height={1080}
          className={`object-cover ${bgPos} ${objPos} w-full h-full absolute top-0 left-0 z-10 outline`}
          placeholder="blur"
          blurDataURL={`${imageSrc}?blur=50`}
          priority={true}
        />
      )}
    </section>
  );
}

export default Hero;
