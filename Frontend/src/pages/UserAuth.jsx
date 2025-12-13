import React, { useState } from "react";
import Userlogin from "./Userlogin";
import UserRegistration from "./UserRegistration";

const UserAuth = () => {
  const [userAuth, setUserAuth] = useState("login");
  const handleUserAuth = () => {
    setUserAuth((prev) => (prev === "login" ? "register" : "login"));
  };
  return (
    <div className="bg-zinc-200 w-full  h-dvh flex items-center justify-center">
      <div className="bg-white w-[90%] md:w-3/5 lg:w-2/5 rounded-md shadow-md py-4 px-2 flex flex-col gap-4">
        <div className="w-full text-4xl font-semibold text-center">
          <h1>UBER</h1>
        </div>

        <div className="text-center">
          <button>Rider</button>
        </div>

        {userAuth === "login" ? (
          <Userlogin handleUserAuth={handleUserAuth} />
        ) : (
          <UserRegistration handleUserAuth={handleUserAuth} />
        )}
      </div>
    </div>
  );
};

export default UserAuth;
