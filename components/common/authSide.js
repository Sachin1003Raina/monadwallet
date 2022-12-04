import Image from "next/image";
import React, { Fragment } from "react";

export default function AuthSide() {
  return (
    <Fragment>
      <div className=" relative h-60  md:order-5 md:hidden md:flex-1">
        <Image
          alt="Mountains"
          src={`/images/loginFrame.jpg`}
          layout="fill"
          objectFit="cover"
          className=" shadow-lg"
        />
      </div>
      <div className=" hidden  h-60 md:relative md:order-5 md:block md:h-full md:flex-1">
        <Image
          alt="Mountains"
          src={`/images/deskLogin.jpg`}
          layout="fill"
          objectFit="cover"
          className=" hidden shadow-lg"
        />
      </div>
    </Fragment>
  );
}
