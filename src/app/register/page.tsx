"use client";
import { authcontext } from "@/_contexts/Authcontextme";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";

export default function Register() {
  const router = useRouter();
  const { token } = useContext(authcontext);
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
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    onSubmit: function (values) {
      console.log("Submitted Values", values);

      axios
        .post("https://linked-posts.routemisr.com/users/signup", values)
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Name is required")
        .min(3, "Name should be at least 3 characters")
        .max(20, "Name should not exceed 20 characters"),
      email: yup
        .string()
        .required("Email is required")
        .email("Enter a valid email"),
      password: yup
        .string()
        .required("Password is required")
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Password must be strong."
        ),
      rePassword: yup
        .string()
        .required("Password confirmation is required")
        .oneOf([yup.ref("password")], "Passwords must match"),
      dateOfBirth: yup.string().required("Date of birth is required"),
      gender: yup.string().required("Gender is required"),
    }),
  });

  if (!isClient || (token || localStorage.getItem("token"))) {
    return null;
  }


  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <form
        onSubmit={registerGroup.handleSubmit}
        className="w-75 mx-auto p-4 shadow rounded"
      >
        <h2 className="text-center">Sign up</h2>
        <div className="form-group">
          <label htmlFor="name">User Name</label>
          <input
            type="text"
            className="form-control"
            value={registerGroup.values.name}
            onChange={registerGroup.handleChange}
            onBlur={registerGroup.handleBlur}
            id="name"
            placeholder="Enter your name"
          />
          {registerGroup.errors.name && registerGroup.touched.name && (
            <small className="form-text text-danger">
              {registerGroup.errors.name}
            </small>
          )}
        </div>
       
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
