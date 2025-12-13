import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Userlogin = ({ handleUserAuth }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = data;
    console.log(formData);
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {/* User Login */}
      <div className="px-5 py-2 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* input field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email">Email Address</label>
            <input
              {...register("email")}
              type="email"
              name="email"
              placeholder="Email address"
              className="px-3 py-1 rounded-md border outline-none border-gray-300"
              required
            />
          </div>

          {/* password field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="password"
              className="px-3 py-1 rounded-md border outline-none border-gray-300"
              required
            />
          </div>

          <Link className="underline flex items-center justify-center mt-2">
            Forgot password?
          </Link>

          <button className="w-full bg-red-500 text-white text-center py-2 text-lg rounded-md mt-4">
            Log In
          </button>
        </form>

        <p className="flex items-center gap-2 justify-center mt-2">
          Don't have an account? <span onClick={handleUserAuth}>Sign up</span>
        </p>
      </div>
    </>
  );
};

export default Userlogin;
