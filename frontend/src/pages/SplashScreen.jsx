import React, { useEffect } from "react";
import { Logo } from "../helpers/Constants";
import { useNavigate } from "react-router";
import "./SplashScreen.css"

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('login')
    }, 2000)
  }, [])

  return (
    <div className="splash-container d-flex flex-column justify-content-between">
      <div></div>

      <div className="text-center">
        <img src={Logo} alt="logo" className="app-logo" />

        <h1 className="app-title mt-4 mont-italic">
          Lingo<span className="mont-boldItalic">Refresh</span>
        </h1>

        <p className="app-subtitle mont-italic fs-14">Refresh your spoken english</p>
      </div>

      <div className="text-center pb-4">
        <p className="powered-by-text mb-0 fs-12 mont-regular">Powered By</p>
        <p className="fs-18 mont-semiBold">Praistma Technologies</p>
      </div>

    </div>
  );
};

export default SplashScreen;
