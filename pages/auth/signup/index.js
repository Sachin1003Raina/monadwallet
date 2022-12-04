import React, { Fragment, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { signUp } from "../../../store/actions/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Link from "next/link";

import { AuthInputWithLogo } from "../../../components/auth/authInput";

import AuthHeader from "../../../components/auth/authHeader";

import AuthLogo from "../../../components/common/authLogo";
import AuthSide from "../../../components/common/authSide";
import { toast } from "react-toastify";

const phoneRegExp = /^[6-9]\d{9}$/;
export const passwordRegexp =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

const SignupSchema = Yup.object().shape({
  // email: Yup.string()
  //   .matches(emailRegExp, 'Email is invalid')
  //   .required('Required'),
  number: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  password: Yup.string()
    .matches(
      passwordRegexp,
      "Password length must be more than 8 characters and contain at least 1 capital letter, 1 number and one special character."
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Passwords must match."),
});

function Signup() {
  const router = useRouter();

  const [error, setError] = useState(false);
  const dispatch = useDispatch(null);

  return (
    <Fragment>
      <div className="h-screen border-2 bg-white  md:flex  ">
        <AuthSide />
        <div className="md:order-2 md:flex md:h-full  md:flex-1 md:flex-col md:bg-white ">
          <AuthLogo />
          <div className="md:order-2 md:flex  md:flex-1 md:flex-col md:justify-center ">
            <AuthHeader title="Register" subTitle="Create your new account" />

            <Formik
              initialValues={{
                number: "",
                password: "",
                username: "",
                confirmPassword: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await signUp({
                    number: values.number,
                    username: values.username,
                    password: values.confirmPassword,
                  });
                  setSubmitting(false);
                  router.replace({
                    pathname: "/auth/signup/verify",
                    query: { number: values.number },
                  });
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
                  <div className="space-y-4 md:space-y-8">
                    <AuthInputWithLogo
                      type="text"
                      name="username"
                      label="User Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors}
                      touched={touched}
                      value={values.username}
                    />
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
                      onBlur={handleBlur}
                      errors={errors}
                      touched={touched}
                      value={values.password}
                    />

                    <AuthInputWithLogo
                      type="password"
                      name="confirmPassword"
                      label="Confirm Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors}
                      touched={touched}
                      value={values.confirmPassword}
                    />
                  </div>

                  <button
                    className=" mt-8 flex h-10 w-full flex-col items-center justify-center rounded-lg bg-gradient  font-semibold text-white shadow-xl focus:outline-none "
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
                    Already have an account?{" "}
                    <Link href="/auth/login">
                      <span className="cursor-pointer text-primary underline ">
                        Login
                      </span>
                    </Link>
                  </h3>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Signup;
