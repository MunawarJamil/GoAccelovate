"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const handleSwitchToSignup = () => {
    setIsLogin(false);
  };

  const handleSwitchToLogin = () => {
    setIsLogin(true);
  };

  // fullname , email , password , confirmpassword

  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [fullname, setName] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const endpoint = isLogin ? '/api/login' : '/api/register';

  //   try {
  //     const response = await fetch(endpoint, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         email,
  //         password,
  //         ...(isLogin ? {} : { fullname, confirmPassword }),
  //       }),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       alert(data.message); // Success response
  //     } else {
  //       alert(data.message || "An error occurred");
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     alert("Something went wrong, please try again.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email,fullname,password,confirmPassword);

    //api/register for user registration
    //endpoints
    const endpoints = isLogin ? "/api/login" : "api/register";
    if (!isLogin && password !== confirmPassword) {
      return; // Prevent submission if passwords don't match
    }

    if (password.length < 8) {
      alert("Passwords should be atleast minmum 8 characters!");
      return;
    }

    try {
      const response = await fetch(endpoints, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          ...(isLogin ? {} : { fullname, confirmPassword }),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setIsLogin(true);
        if (isLogin) router.push("/");
      } else {
        alert(data.message || "An error occured while login");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong, please try again.");
    }
    //api/signin for signing the user
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-slate-900 to-slate-600">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="flex w-full"></div>

        <div className="relative flex items-center justify-between  mt-8 mb-4 border border-gray-300 rounded-full">
          <input
            type="radio"
            name="slide"
            id="login"
            checked={isLogin}
            onChange={handleSwitchToLogin}
            className="hidden"
          />
          <input
            type="radio"
            name="slide"
            id="signup"
            checked={!isLogin}
            onChange={handleSwitchToSignup}
            className="hidden"
          />
          <label
            htmlFor="login"
            className={`cursor-pointer w-1/2 text-center py-3 font-medium transition-colors duration-500 ${
              isLogin ? "text-white z-10" : "text-black"
            }`}
            onClick={handleSwitchToLogin}
          >
            Login
          </label>
          <label
            htmlFor="signup"
            className={`cursor-pointer w-1/2 text-center py-3 font-medium transition-colors duration-500 ${
              !isLogin ? "text-white z-10" : "text-black"
            }`}
            onClick={handleSwitchToSignup}
          >
            Signup
          </label>
          <div
            className={`absolute w-1/2 h-full bg-gradient-to-r from-blue-800 to-blue-600 rounded-full transition-transform duration-500 ${
              isLogin ? "translate-x-0" : "translate-x-full"
            }`}
          ></div>
        </div>

        <div
          className="flex w-full transform transition-transform duration-500"
          style={{ transform: `translateX(${isLogin ? "0" : "-1%"})` }}
        >
          <form onSubmit={handleSubmit} className="w-full">
            {!isLogin && (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div className="mb-4">
              <input
                type="text"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {!isLogin && (
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {isLogin && (
              <div className="mb-4 text-right">
                <a href="#" className="text-blue-500 hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-800 to-blue-600 rounded-xl transition-all duration-300 ease-in-out hover:left-0"></div>
              <input
                type="submit"
                value={isLogin ? "Login" : "Signup"}
                className="relative z-10 w-full p-3 font-medium text-white bg-transparent rounded-full cursor-pointer focus:outline-none"
              />
            </div>

            {isLogin && (
              <>
                <div className="flex justify-center  mt-2 text-gray-400">
                  Or Login with
                </div>

                <div className="relative mt-2">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-400 to-slate-600 rounded-xl transition-all duration-300 ease-in-out hover:left-0"></div>
                  <input
                    type="submit"
                    value="Google"
                    className="relative z-10 w-full p-3 font-medium text-white bg-transparent rounded-full cursor-pointer focus:outline-none"
                  />
                </div>
              </>
            )}

            {isLogin ? (
              <div className="mt-8 text-center ">  
                Not a member?{" "}
                <a
                  href="#"
                  onClick={handleSwitchToSignup}
                  className="text-blue-500 hover:underline"
                >
                  Signup now
                </a>
              </div>
            ) : (
              <div className="mt-4 text-center">
                Already a member?{" "}
                <a
                  href="#"
                  onClick={handleSwitchToLogin}
                  className="text-blue-500 hover:underline"
                >
                  Login
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
