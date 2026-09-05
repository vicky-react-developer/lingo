import React, { useEffect } from "react";
import { Logo } from "../helpers/Constants";
import { useNavigate } from "react-router";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('login')
    }, 2000)
  }, [])

  return (
    <div className="h-screen w-full flex flex-col justify-between text-white px-5 bg-gradient-to-b from-[#2342a8] to-[#4a1ea8]">
      <div></div>

      <div className="text-center">
        <img src={Logo} alt="logo" className="w-[110px] h-[110px] object-contain rounded-full mx-auto" />

        <h1 className="text-[30px] italic tracking-[0.5px] mt-4">
          Lingo<span className="italic font-bold">Refresh</span>
        </h1>

        <p className="italic text-sm opacity-85 -mt-[5px]">Refresh your spoken english</p>
      </div>

      <div className="text-center pb-4">
        <p className="text-xs opacity-70 mb-0">Powered By</p>
        <p className="text-lg font-semibold">Praistma Technologies</p>
      </div>
    </div>
  );
};

export default SplashScreen;