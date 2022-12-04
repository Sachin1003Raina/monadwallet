import React, { useRef, useState } from "react";
import { verify, verifyOtpforRegistration } from "../../../store/actions/auth";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import OtpVerification from "../../../components/common/otpVerification";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

function VerifyOtp() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const webToken = useSelector((store) => store.auth.webToken);
  const dispatch = useDispatch();
  const one = useRef(null);
  const two = useRef(null);
  const three = useRef(null);
  const four = useRef(null);

  const onChangeEvent = (e, ref, blur = false) => {
    if (e.target.value.length == 1 && !blur) {
      ref.current.focus();
    }
    if (e.target.value.length == 1 && blur) {
      ref.current.blur();
    }
    console.log(e.target.value);
  };

  async function onSubmit(value) {
    console.log("value", value);
    try {
      await dispatch(verify(value, router.query.number, webToken));
    } catch (err) {
      console.log("err", err);
      toast.error(
        err?.response?.data?.message ?? "Something went Wrong",
        toast.POSITION.BOTTOM_CENTER
      );
    }

    // if (
    //   one.current.value &&
    //   two.current.value &&
    //   three.current.value &&
    //   four.current.value
    // ) {
    //   try {
    //     let value = `${one.current.value}${two.current.value}${three.current.value}${four.current.value}`
    //     const response = await verify(
    //       value,
    //       router.query.number,
    //       router.query.type ?? AuthType.Customer
    //     )
    //     setSuccess(response ?? 'Yayyy,Your Number is Verified.')
    //   } catch (err) {
    //     setError(err?.response?.data?.message ?? 'Something went Wrong')
    //   }
    // } else if (!one.current.value) {
    //   one.current.focus()
    // } else if (!two.current.value) {
    //   two.current.focus()
    // } else if (!three.current.value) {
    //   three.current.focus()
    // } else {
    //   four.current.focus()
    // }
  }

  return (
    <Fragment>
      <div className="relative mt-8 h-screen bg-background md:flex">
        <div className="md:bg-driving h-height w-full px-2 pt-3 md:flex md:flex-col md:items-center md:justify-center md:bg-cover ">
          <div className="mb-16 flex flex-col items-center md:mb-8 md:font-bold">
            <h1 className="mb-1 text-2xl ">Enter OTP</h1>
            <h1 className=" text-center text-sm   md:text-lg">
              Enter the verification code sent to your
              <br />
              mobile number {router.query.number}
            </h1>
          </div>
          <div className="rounded-md px-4 md:mx-5 md:w-1/2 md:bg-white md:px-8 md:py-8 md:shadow-lg xl:w-1/3">
            {/* <div className="mb-16 flex justify-center space-x-3 md:justify-between  md:space-x-0">
              <OtpInput
                name="1"
                refs={one}
                onChange={(e) => {
                  onChangeEvent(e, two)
                }}
              />
              <OtpInput
                name="2"
                refs={two}
                onChange={(e) => {
                  onChangeEvent(e, three)
                }}
              />
              <OtpInput
                name="3"
                refs={three}
                onChange={(e) => {
                  onChangeEvent(e, four)
                }}
              />
              <OtpInput
                name="4"
                refs={four}
                onChange={(e) => {
                  onChangeEvent(e, four, true)
                }}
              />
            </div> */}
            <OtpVerification
              firstRef={one}
              secondRef={two}
              thirdRef={three}
              fourthRef={four}
              onChangeEvent={onChangeEvent}
              verifyHandler={onSubmit}
              backHandler={() => {
                router.back();
              }}
            />

            <div className="mt-2 px-8 text-center text-sm">
              <span>Didn't receive the OTP? </span>
              <span
                className="text-primary"
                onClick={async () => {
                  try {
                    console.log("tap");

                    await axios({
                      method: "post",
                      url: `/api/auth/resend`,
                      data: { number: router.query.number },
                    });
                    toast.success(
                      `We have resent OTP on ${router.query.number}`,
                      {
                        position: toast.POSITION.BOTTOM_CENTER,
                      }
                    );
                  } catch (err) {
                    console.log(err);
                    setError("Something went wrong");
                  }
                }}
              >
                Resend
              </span>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        autoClose={2000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </Fragment>
  );
}

export default VerifyOtp;
