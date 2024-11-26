"use client";
import { authcontext } from "@/_contexts/Authcontextme";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import * as yup from "yup";

export default function Register() {
  const router = useRouter();
  const { token } = useContext(authcontext);

  useEffect(() => {
    if (token || localStorage.getItem("token")) {
      router.push("/");
    }
  }, [token, router]);

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

  if (token || localStorage.getItem("token")) {
    return null;
  }

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{height:'100vh'}}>
      <form onSubmit={registerGroup.handleSubmit} className="w-75 mx-auto p-4 shadow rounded">
      <h2 className="text-center">Sign up</h2>
        <div className="form-group">
          <label htmlFor="name">user name</label>
          <input
            type="text"
            className="form-control"
            value={registerGroup.values.name}
            onChange={registerGroup.handleChange}
            onBlur={registerGroup.handleBlur}
            id="name"
            placeholder="Enter name"
          />
          {registerGroup.errors.name && registerGroup.touched.name ? (
            <small className="form-text text-danger">
              {registerGroup.errors.name}
            </small>
          ) : (
            ""
          )}
        </div>
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
            <small className="form-text text-danger">
              {registerGroup.errors.email}
            </small>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label htmlFor="name">Date of birth</label>
          <input
            type="date"
            className="form-control"
            value={registerGroup.values.dateOfBirth}
            onChange={registerGroup.handleChange}
            onBlur={registerGroup.handleBlur}
            id="dateOfBirth"
            placeholder="Enter dateOfBirth"
          />
          {registerGroup.errors.dateOfBirth &&
          registerGroup.touched.dateOfBirth ? (
            <small className="form-text text-danger">
              {registerGroup.errors.dateOfBirth}
            </small>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Password</label>
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
            <small className="form-text text-danger">
              Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one digit, and one special character.
            </small>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Password</label>
          <input
            type="text"
            className="form-control"
            value={registerGroup.values.rePassword}
            onChange={registerGroup.handleChange}
            onBlur={registerGroup.handleBlur}
            id="rePassword"
            placeholder="Enter rePassword"
          />
          {registerGroup.errors.rePassword &&
          registerGroup.touched.rePassword ? (
            <small className="form-text text-danger">
              password confirmation dont match
            </small>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender" // This must match the form field in Formik
                id="female"
                value="female" // Unique value for this option
                onChange={registerGroup.handleChange}
                onBlur={registerGroup.handleBlur}
                checked={registerGroup.values.gender === "female"} // Binding the checked state
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender" // This must match the form field in Formik
                id="male"
                value="male" // Unique value for this option
                onChange={registerGroup.handleChange}
                onBlur={registerGroup.handleBlur}
                checked={registerGroup.values.gender === "male"} // Binding the checked state
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
