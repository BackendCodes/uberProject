import { IoIosArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/auth')
  };

  return (
    <div className="h-dvh relative bg-cover bg-center  bg-[url('mobile_view_home_bg.png')] w-full bg-red-300">
      <div>
        <div className="px-5 py-4">
          <h1 className="font-semibold text-xl">UBER</h1>
        </div>

        {/* Get Started Sections */}

        <div className="bg-white px-5 py-2 rounded-md absolute bottom-0 w-full flex flex-col gap-5">
          <h2 className="text-2xl tracking-tight font-semibold">
            Get Started With Uber
          </h2>
          <button
            onClick={handleContinue}
            className="flex cursor-pointer  justify-center text-xl items-center  bg-black text-white gap-5 rounded-md w-full py-2"
          >
            <h1 className="">Continue</h1>
            <IoIosArrowDropright />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
