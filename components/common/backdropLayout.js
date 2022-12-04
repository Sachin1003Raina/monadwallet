import React from "react";
import Backdrop from "../common/backdrop";

export default function BackdropLayout({ cancelPopup, children }) {
  return (
    <div onClick={cancelPopup}>
      <Backdrop opacity="40" />
      {children}
    </div>
  );
}
