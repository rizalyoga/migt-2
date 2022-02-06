import React, { useState, useEffect, useRef } from "react";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";
import "./loginPage.css";
import { useDispatch, useSelector } from "react-redux";
import allStore from "../../store/actions/index";

const Login = () => {
  const dispatch = useDispatch();

  const loading = useSelector(({ loading }) => loading);
  const error = useSelector(({ error }) => error);

  const [vantaEffect, setVantaEffect] = useState(0);
  const myRef = useRef(null);

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  /* --------------------------- BACKGROUND VANTA JS -------------------------- */
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: myRef.current,
          THREE,
          minHeight: 300.0,
          minWidth: 300.0,
          color: 0xffffff,
          backgroundColor: 0x463465,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  /* ------------------------------ EVENT HANDLER ----------------------------- */

  const handlerError = () => {
    dispatch(allStore.setError(null));
  };

  const changeValue = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(allStore.UserLogin(formState));
  };

  return (
    <div style={{ height: "100vh" }} ref={myRef}>
      <div className="row-content row flex lg-flex-row">
        <div className="flex flex-col justify-center left-col basis-1/2 items-center " style={{ height: "100vh" }}>
          <div className="content-text">
            <h1 className="text-8xl font-bold text-white">WELCOME</h1>
            <p className="text-type anim-typewriter text-white text-3xl">To Dashboard Site</p>
          </div>
        </div>
        <div className="screen-tab flex flex-col justify-center items-center right-col basis-1/2 px-16" style={{ height: "100vh" }}>
          <div className="container-form ">
            <h3 className="mb-2 text-3xl font-bold text-center text-white">Please Login</h3>

            <form className="login-form px-10 py-2 w-full" onSubmit={submitHandler}>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                className="my-3 appearance-none text-center rounded-none relative block w-full py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                // autoComplete="off"
                onChange={changeValue}
                onFocus={() => handlerError()}
                required
              />
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className=" appearance-none text-center rounded-none relative block w-full py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                autoComplete="off"
                onChange={changeValue}
                onFocus={() => handlerError()}
                required
              />
              <p className="my-3 text-center text-red-500">{error ? <span>Error : {error}</span> : <></>}</p>
              <input
                type="submit"
                className="cursor-pointer my-3 text-center rounded-none relative block w-full py-2 border border-gray-300 text-white hover:bg-purple-900 focus:outline-none focus:ring-white-500 focus:border-white-500 focus:z-10 md:text-md"
                value={loading ? "please wait..." : "Sign in"}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
