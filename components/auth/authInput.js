import React, { Fragment, useState } from "react";
import EyeIcon from "../icons/eyeIcon";
import EyeOffIcon from "../icons/eyeOffIcon";
import Lock from "../icons/lock";
import Phone from "../icons/phone";

export default function AuthInput({
  title = false,
  label,
  maxLength,
  showError = true,
  name,
  type,
  onBlur,
  onChange,
  checkError = false,
  errors,
  touched,
  className = "bg-white border-1px border-black border-opacity-5",
  value,
}) {
  const [inputType, setInputType] = useState(type);
  console.log(checkError && errors[name]);
  return (
    <div className="flex-1">
      {title && (
        <div className="mb-0.5 ml-1 text-sm md:mb-1.5 md:text-base">
          {label}
        </div>
      )}
      <input
        type={inputType}
        maxLength={maxLength}
        spellCheck={false}
        name={name}
        className={` h-12 w-full  rounded-md px-2  text-sm text-gray-500 placeholder:text-xs   placeholder:text-secondaryText focus:outline-none md:text-base  md:placeholder:text-sm ${className}`}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={label}
        value={value}
      />
      {errors[name] && touched[name] && showError && (
        <span className="ml-1 text-10px font-light text-red-400">
          {errors[name]}
        </span>
      )}
    </div>
  );
}

export function AuthInputWithLogo({
  label,
  name,
  type,
  onBlur,
  onChange,
  errors,
  touched,
  className = "bg-gray-50",
  value,
}) {
  const [inputType, setInputType] = useState(type);
  let body;
  if (type == "password") {
    body = (
      <div
        className={`flex  items-center overflow-hidden rounded-md pr-2 font-light  text-black text-opacity-90 ${className} `}
      >
        <div className=" ">
          <Lock className="h-6 w-6 pl-2 pr-1" />
        </div>

        <input
          type={inputType}
          spellCheck={false}
          name={name}
          className="h-12 w-full flex-1 border-none bg-gray-50 pl-1 text-sm  placeholder:text-xs placeholder:font-light placeholder:text-black placeholder:text-opacity-60 focus:border-none  focus:outline-none"
          onBlur={onBlur}
          onChange={onChange}
          placeholder={label}
          value={value}
        />
        {inputType == "text" ? (
          <div>
            <EyeOffIcon
              className=" h-5 w-5 text-gray-500"
              onClick={() => setInputType("password")}
            />
          </div>
        ) : (
          <div>
            <EyeIcon
              className=" h-5 w-5 text-gray-500"
              onClick={() => setInputType("text")}
            />
          </div>
        )}
      </div>
    );
  } else {
    body = (
      <div className={`flex items-center rounded-md ${className}`}>
        <Phone className={`h-6 w-6 pl-2 pr-1 `} />
        <input
          type={inputType}
          spellCheck={false}
          name={name}
          className={` h-12 w-full flex-1 rounded-md  px-2 pl-1 text-sm  font-light text-black  text-opacity-90   placeholder:text-xs placeholder:font-light placeholder:text-black placeholder:text-opacity-60  focus:outline-none ${className}`}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={label}
          value={value}
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-0.5">
      {body}
      {errors[name] && touched[name] && (
        <span className="ml-1 text-10px font-light text-red-400">
          {errors[name]}
        </span>
      )}
    </div>
  );
}
