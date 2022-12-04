import Image from "next/image";
import React from "react";

export default function AuthLogo({
  onClick,
  className = " md:gap-4  md:py-6 md:px-8",
}) {
  return (
    <div
      className={`hidden md:flex ml-20 md:items-center ${className} ${
        onClick && "cursor-pointer"
      }`}
      onClick={onClick}
    >
      <div className="relative h-8 w-32 ">
        <Image
          alt="Mountains"
          src={`/images/logo1.png`}
          layout="fill"
          objectFit="contain"
          className=" hidden shadow-lg"
        />
      </div>
    </div>
  );
}
