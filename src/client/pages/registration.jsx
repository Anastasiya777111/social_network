import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.scss";
const Registration = () => {
  const { auth } = useSelector((state) => state);
  const history = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      cf_password: "",
      gender: "male",
    },
  });

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit(console.log)}>
        <h3 className="text-uppercase text-center mb-4">World of Friends</h3>

        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            {...register("fullname", { required: true })}
            type="text"
            className="form-control"
            id="fullname"
            name="fullname"
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input
            {...register("username", { minLength: 2 })}
            type="text"
            className="form-control"
            id="username"
            name="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            {...register("email", {
              required: "required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>

          <div className="pass">
            <input
              {...register("password", {
                required: "required",
                minLength: {
                  value: 5,
                  message: "min length is 5",
                },
              })}
              type={typePass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              name="password"
            />

            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? "Hide" : "Show"}
            </small>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="cf_password">Confirm Password</label>

          <div className="pass">
            <input
              {...register("cf_password", {
                required: "required",
                minLength: {
                  value: 5,
                  message: "min length is 5",
                },
              })}
              type={typeCfPass ? "text" : "password"}
              className="form-control"
              id="cf_password"
              name="cf_password"
            />

            <small onClick={() => setTypeCfPass(!typeCfPass)}>
              {typeCfPass ? "Hide" : "Show"}
            </small>
          </div>
        </div>

        <div className="row justify-content-between mx-0 mb-1">
          <label htmlFor="male">
            Male:{" "}
            <input
              {...register("male")}
              type="radio"
              id="male"
              name="gender"
              defaultChecked
            />
          </label>

          <label htmlFor="female">
            Female:{" "}
            <input
              {...register("female")}
              type="radio"
              id="female"
              name="gender"
            />
          </label>

          <label htmlFor="other">
            Other:{" "}
            <input
              {...register("other")}
              type="radio"
              id="other"
              name="gender"
            />
          </label>
        </div>

        <button type="submit" className="btn btn-dark w-100">
          Register
        </button>

        <p className="my-2">
          Already have an account?{" "}
          <Link to="/" style={{ color: "crimson" }}>
            Login Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;
