"use client";
import { authcontext } from "@/_contexts/Authcontextme";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";

export default function Login() {
  const router = useRouter();
  const { token, setToken } = useContext(authcontext);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && (token || localStorage.getItem("token"))) {
      router.push("/");
    }
  }, [token, router, isClient]);

  const registerGroup = useFormik({
    initialValues: {
      email: "mazin.safwat34123222245@gmail.com",
      password: "Pas$w0rd",
    },
    onSubmit: function (values) {
      axios
        .post("https://linked-posts.routemisr.com/users/signin", values)
        .then(function (res) {
          if (isClient) {
            router.push("/");
            localStorage.setItem("token", res.data.token);
            setToken(res.data.token);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Email is required")
        .email("Enter a valid email"),
      password: yup
        .string()
        .required("Password is required")
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must be strong."),
    }),
  });

  if (!isClient || (token || localStorage.getItem("token"))) {
    return null;
  }

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
      <form className="w-75 mx-auto p-4 shadow rounded" onSubmit={registerGroup.handleSubmit}>
        <h2 className="text-center">Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            value={registerGroup.values.email}
            onChange={registerGroup.handleChange}
            onBlur={registerGroup.handleBlur}
            id="email"
            placeholder="Enter email"
          />
          {registerGroup.errors.email && registerGroup.touched.email ? (
            <small className="form-text text-danger">{registerGroup.errors.email}</small>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            className="form-control"
            value={registerGroup.values.password}
            onChange={registerGroup.handleChange}
            onBlur={registerGroup.handleBlur}
            id="password"
            placeholder="Enter password"
          />
          {registerGroup.errors.password && registerGroup.touched.password ? (
            <small className="form-text text-danger">{registerGroup.errors.password}</small>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
