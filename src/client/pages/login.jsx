import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "../styles/auth.scss";
const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [typePass, setTypePass] = useState(false);

  return (
    <div className="auth_page">
     <form onSubmit={handleSubmit(console.log)}>
        <h3 className="text-uppercase text-center mb-4">World of Friends</h3>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input     {...register("email", {
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
            aria-describedby="emailHelp"
          />

          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>

          <div className="pass">
            <input  {...register("password", {
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

        <button
          type="submit"
          className="btn btn-dark w-100"
        >
          Login
        </button>

        <p className="my-2">
          You don't have an account?{" "}
          <Link to="/registration" style={{ color: "crimson" }}>
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
