import React from 'react'

export function OtpInput({ name, refs, onChange, size = 14 }) {
  return (
    <div className={`h-${size} w-${size} overflow-hidden bg-white `}>
      <input
        type="number"
        name={name}
        className="focus:outline-nfirstRef h-full w-full rounded-lg border bg-transparent p-2 text-center text-lg font-semibold text-primary focus:bg-secondary focus:bg-opacity-40"
        ref={refs}
        onChange={onChange}
      />
    </div>
  )
}

export default function OtpVerification({
  firstRef,
  secondRef,
  thirdRef,
  fourthRef,
  onChangeEvent,
  margin = 'mb-16',
  verifyHandler = () => {},
  backHandler,
}) {
  const onSubmit = async () => {
    if (
      firstRef.current.value &&
      secondRef.current.value &&
      thirdRef.current.value &&
      fourthRef.current.value
    ) {
      let value = `${firstRef.current.value}${secondRef.current.value}${thirdRef.current.value}${fourthRef.current.value}`

      await verifyHandler(value)
    } else if (!firstRef.current.value) {
      firstRef.current.focus()
    } else if (!secondRef.current.value) {
      secondRef.current.focus()
    } else if (!thirdRef.current.value) {
      thirdRef.current.focus()
    } else {
      fourthRef.current.focus()
    }
  }
  return (
    <div className="space-y-4">
      <div
        className={`flex justify-between space-x-3 md:justify-between  md:space-x-4 ${margin}`}
      >
        <OtpInput
          name="1"
          refs={firstRef}
          onChange={(e) => {
            onChangeEvent(e, secondRef)
          }}
        />
        <OtpInput
          name="2"
          refs={secondRef}
          onChange={(e) => {
            onChangeEvent(e, thirdRef)
          }}
        />
        <OtpInput
          name="3"
          refs={thirdRef}
          onChange={(e) => {
            onChangeEvent(e, fourthRef)
          }}
        />
        <OtpInput
          name="4"
          refs={fourthRef}
          onChange={(e) => {
            onChangeEvent(e, fourthRef, true)
          }}
        />
      </div>
      <div className="mb-4 flex justify-between space-x-5 px-8">
        <button
          className="focus:outline-nfirstRef h-10 w-6/12 rounded-md border-2 border-primary"
          onClick={backHandler}
        >
          Back
        </button>
        <button
          className="text-heading focus:outline-nfirstRef h-10 w-6/12 rounded-md bg-gradient"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            onSubmit()
          }}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
