'use client';
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
    if (isClient && (token || localStorage.getItem("token"))) {
      router.push("/");
    }
  }, [isClient, token, router]);

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

  if (!isClient || token || localStorage.getItem("token")) {
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
          <label htmlFor="name">User name</label>
          <input
            type="text"
            className="form-control"
            value={registerGroup.values.name}
            onChange={registerGroup.handleChange}
            autoComplete="on"
            onBlur={registerGroup.handleBlur}
            id="name"
            placeholder="Enter name"
          />
          {registerGroup.errors.name && registerGroup.touched.name && (
            <small className="form-text text-danger">
              {registerGroup.errors.name}
            </small>
          )}
        </div>

        
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            value={registerGroup.values.email}
            onChange={registerGroup.handleChange}
            autoComplete="on"
            onBlur={registerGroup.handleBlur}
            id="email"
            placeholder="Enter email"
          />
          {registerGroup.errors.email && registerGroup.touched.email && (
            <small className="form-text text-danger">
              {registerGroup.errors.email}
            </small>
          )}
        </div>

     
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            value={registerGroup.values.dateOfBirth}
            onChange={registerGroup.handleChange}
            autoComplete="on"
            onBlur={registerGroup.handleBlur}
            id="dateOfBirth"
            placeholder="Enter date of birth"
          />
          {registerGroup.errors.dateOfBirth &&
            registerGroup.touched.dateOfBirth && (
              <small className="form-text text-danger">
                {registerGroup.errors.dateOfBirth}
              </small>
            )}
        </div>

        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            value={registerGroup.values.password}
            onChange={registerGroup.handleChange}
            
            onBlur={registerGroup.handleBlur}
            id="password"
            placeholder="Enter password"
          />
          {registerGroup.errors.password && registerGroup.touched.password && (
            <small className="form-text text-danger">
              {registerGroup.errors.password}
            </small>
          )}
        </div>

       
        <div className="form-group">
          <label htmlFor="rePassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            value={registerGroup.values.rePassword}
            onChange={registerGroup.handleChange}
            onBlur={registerGroup.handleBlur}
            id="rePassword"
            placeholder="Re-enter password"
          />
          {registerGroup.errors.rePassword &&
            registerGroup.touched.rePassword && (
              <small className="form-text text-danger">
                {registerGroup.errors.rePassword}
              </small>
            )}
        </div>

     
        <div className="form-group">
          <label>Gender</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={registerGroup.handleChange}
              onBlur={registerGroup.handleBlur}
              checked={registerGroup.values.gender === "female"}
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="male"
              onChange={registerGroup.handleChange}
              onBlur={registerGroup.handleBlur}
              checked={registerGroup.values.gender === "male"}
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>
          {registerGroup.errors.gender && registerGroup.touched.gender && (
            <small className="form-text text-danger">
              {registerGroup.errors.gender}
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
