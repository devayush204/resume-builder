// NavBar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SmallNav from "./SmallNav";
import axios from "axios";

const NavBar = () => {
  const navigate = useNavigate();
  const [smallNav, setSmallNav] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsAuthChecked(true);
          return;
        }

        const response = await axios.get("http://localhost:5000/api/auth/checkAuth", {
          headers: {
            Authorization: token,
          },
        });

        setUser(response.data.user);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("User is not authenticated");
        } else {
          console.error("Authentication check failed:", error);
        }
      } finally {
        setIsAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50 overflow-hidden">
      <div className="flex w-full fixed justify-between items-center h-20 bg-nav p-4">
        <div className="flex justify-between items-center">
          <p className="ml-2 text-3xl max-lg:text-2xl font-medium text-white">
            build
            <span className="font-bold text-3xl max-lg:text-2xl text-amber-300">
              MY
            </span>
            resume
          </p>
        </div>
        <div className="flex text-white font-medium text-xl items-center relative">
          <Link
            to={"/"}
            className="cursor-pointer max-lg:hidden mr-20 hover:border-b-2 hover:border-amber-300"
          >
            Home
          </Link>
          <Link
            to={"/build/personaldetails"}
            className="cursor-pointer max-lg:hidden mr-20 hover:border-b-2 hover:border-amber-300"
          >
            Build
          </Link>
          {user ? (
            <div className="relative">
              <p
                onClick={() => setShowProfileOptions(!showProfileOptions)}
                className="text-amber-400 cursor-pointer mr-5 hover:underline"
              >
                {user.name}
              </p>
              {showProfileOptions && (
                <div className="absolute mt-3 shadow-xl right-0 bg-white w-[130px] rounded-lg border border-gray-200">
                  <ul className="divide-y divide-gray-200">
                    <Link
                      to="/profile"
                      className="text-gray-800 cursor-pointer hover:text-amber-400 py-2 px-4"
                    >
                      Profile
                    </Link>
                    <li
                      onClick={logOut}
                      className="text-gray-800 cursor-pointer hover:text-amber-400 py-2 px-4"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            isAuthChecked && (
              <Link
                to="/signup"
                className="bg-amber-400 rounded-md font-semibold text-base px-3 py-1 text-black"
              >
                Get Started
              </Link>
            )
          )}
        </div>

        <div onClick={() => setSmallNav(!smallNav)} className="lg:hidden cursor-pointer">
          <div className="w-7 h-0.5 bg-white mt-2"></div>
          <div className="w-7 h-0.5 bg-white mt-2"></div>
          <div className="w-7 h-0.5 bg-white mt-2"></div>
        </div>
      </div>
      <div>{smallNav && <SmallNav setSmallNav={setSmallNav} />}</div>
    </div>
  );
};

export default NavBar;