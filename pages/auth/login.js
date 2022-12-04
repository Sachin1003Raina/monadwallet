import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import { login } from "../../store/actions/auth";
import Link from "next/link";

import Image from "next/dist/client/image";

import { AuthInputWithLogo } from "../../components/auth/authInput";

import AuthHeader from "../../components/auth/authHeader";

import AuthLogo from "../../components/common/authLogo";
import AuthSide from "../../components/common/authSide";
import { toast } from "react-toastify";

const phoneRegExp = /^[6-9]\d{9}$/;

const SigninSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Too Short!")
    .max(12, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
});

export default function Login({}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const webToken = useSelector((store) => store.auth.webToken);
  const [error, setError] = useState(null);

  return (
    <div className="h-screen border-2 bg-white  md:flex  ">
      <AuthSide />
      <div className="md:order-2 md:flex md:h-full  md:flex-1 md:flex-col md:bg-white ">
        <AuthLogo />
        <div className="md:order-2 md:flex  md:flex-1 md:flex-col md:justify-center ">
          <AuthHeader title="Welcome to Monad" />
          <Formik
            initialValues={{ number: "", password: "" }}
            validationSchema={SigninSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await dispatch(login(values.password, values.number));
                console.log("after dispatch");
                setSubmitting(false);
                // router.replace('/')
              } catch (err) {
                toast.error(
                  err?.response?.data?.message ?? "Something went Wrong",
                  toast.POSITION.BOTTOM_CENTER
                );
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form
                onSubmit={handleSubmit}
                className="mt-6 px-4 md:mx-auto  md:w-2/3"
              >
                <div className="space-y-5 md:space-y-8">
                  <AuthInputWithLogo
                    type="number"
                    name="number"
                    label="Phone Number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    value={values.number}
                  />

                  <AuthInputWithLogo
                    type="password"
                    name="password"
                    label="Password"
                    onChange={handleChange}
                    errors={errors}
                    touched={touched}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </div>

                <Link href="/auth/forgot/number">
                  <div className="mb-8 mt-2 cursor-pointer text-right text-sm text-primary underline ">
                    Forgot Password?
                  </div>
                </Link>
                <button
                  className=" flex h-10 w-full flex-col items-center justify-center rounded-lg bg-gradient  font-semibold text-white shadow-xl focus:outline-none "
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className=" flex items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
                    </div>
                  ) : (
                    "Proceed"
                  )}
                </button>
                <h3 className="mt-2 text-center text-xs font-extralight text-secondaryText md:text-base">
                  Don't have an account ?{" "}
                  <Link href="/auth/signup">
                    <span className="cursor-pointer text-primary underline ">
                      Create an account
                    </span>
                  </Link>
                </h3>
                {/* <div className="text-center">
              <LoginDivider />

              <SocialLogo />
            </div> */}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
