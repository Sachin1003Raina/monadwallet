import React from 'react'

export default function AuthHeader({
  title = 'Welcome Back',
  subTitle = 'Log in to your account',
}) {
  return (
    <div className="mt-8 flex flex-col  items-center md:mx-auto md:mb-4 md:w-2/3 md:items-start md:space-y-1 md:pl-5">
      <h1 className=" inline-block bg-textGradient bg-clip-text text-2xl font-semibold text-transparent md:text-3xl md:font-medium">
        {title}
      </h1>
      <h1 className=" text-primary md:text-lg">{subTitle}</h1>
    </div>
  )
}
