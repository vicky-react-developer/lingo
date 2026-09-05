import React from "react";
import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 bg-gradient-to-b from-[#f7f9fc] to-white">
      <div className="w-full max-w-[380px] bg-white text-center rounded-[18px] px-[25px] py-[35px] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <div className="text-[50px] mb-2.5">
          🚫
        </div>

        <h1 className="text-[70px] font-extrabold text-[#0d6efd] m-0">404</h1>

        <h5 className="font-semibold mt-2.5">
          Page Not Found
        </h5>

        <p className="text-sm text-[#6c757d] my-2.5 mb-5">
          The page you are looking for does not exist or has been moved.
        </p>

        <button
          className="w-full rounded-xl py-2.5 bg-[#0d6efd] text-white font-medium hover:bg-[#0b5ed7]"
          onClick={goHome}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;