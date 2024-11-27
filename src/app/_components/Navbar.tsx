"use client";
import { authcontext } from "@/_contexts/Authcontextme";
import Link from "next/link";

import React, { useContext, useState } from "react";
import Navbllank from "./Navbllank";
import Navauth from "./Navauth";

export default function Navbar() {
  const { token } = useContext(authcontext);
  const [click, setclick] = useState(false);
  function handleClick() {
    setclick(!click);
    console.log(click);
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
      <Link className="navbar-brand" href="/">
        Navbar
      </Link>
      <button
        onClick={handleClick}
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded={click?'true':'false'}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
     
        <div
          className={`collapse navbar-collapse justify-content-end ${click?'show':''}`}
          id="navbarSupportedContent"
        >
          <div className="form-inline my-2 d-flex gap-2 my-lg-0">
            {token ? <Navbllank /> : <Navauth />}
          </div>
        </div>
     
    </nav>
  );
}
