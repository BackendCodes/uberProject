import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const UserRegistration = ({ handleUserAuth }) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formData = JSON.stringify(data);
    console.log(formData);

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 px-3">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* First and last name sections */}
          <div className="flex w-full gap-4">
            <div className="w-[50%] flex gap-1.5 flex-col">
              <label htmlFor="firstName">First Name</label>
              <input
                {...register("firstname")}
                type="text"
                className="px-3 w-full py-1 rounded-md border outline-none border-gray-300"
                placeholder="First"
              />
            </div>
            <div className="w-[50%] flex gap-1.5 flex-col">
              <label htmlFor="lastName">Last Name</label>
              <input
                {...register("lastname")}
                type="text"
                className="px-3 py-1  w-full rounded-md border outline-none border-gray-300"
                placeholder="Last"
              />
            </div>
          </div>

          {/* input field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email">Email Address</label>
            <input
              {...register("email")}
              type="email"
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

          <button className="w-full bg-red-500 text-white text-center py-2 text-lg rounded-md">
            Create Account
          </button>
        </form>

        <p className="flex items-center gap-2 justify-center mt-2">
          Already have an account? <span onClick={handleUserAuth}>Log In</span>
        </p>
      </div>
    </>
  );
};

export default UserRegistration;
