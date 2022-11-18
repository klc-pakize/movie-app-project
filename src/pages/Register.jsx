import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../assets/icons/GoogleIcon";
import { currentUser, singUpWithGoogle } from "../auth/firebase";

const APIKEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}`;

const Register = () => {
  const navigate = useNavigate();
  const [firstname, setFirstsname] = useState("");
  const [lastname, setLastsname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pictures, setPicture] = useState([]);
  const picture = pictures[Math.floor(Math.random() * pictures.length)];

  useEffect(() => {
    getPicure(FEATURED_API);
    // console.log("gelmeeyeb", getMovies(FEATURED_API));
  }, []);
  const getPicure = async (FEATURED_API) => {
    const { data } = await axios.get(FEATURED_API);
    setPicture(data.results);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = `${firstname} ${lastname}`;
    currentUser(navigate, email, password, displayName);
    console.log(firstname);
  };

  const handleGoogle = () => {
    singUpWithGoogle(navigate);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="form-image hidden md:block">
          <img
            src={`https://image.tmdb.org/t/p/original${picture?.poster_path}`}
            alt="sample-movie"
            className="object-cover h-screen w-[1000px]"
          />
        </div>
        <div className="overflow-hidden flex-1 h-screen justify-center items-center bg-[#000000] ">
          <div
            className={`mt-[20vh] mx-auto overflow-hidden relative w-[380px] h-[620px] rounded-[8px] bg-[#000000] before:content-[""] before:absolute before:w-[380px] before:h-[420px] before:top-[-50%] before:left-[-50%] after:content-[""] after:absolute after:w-[380px] after:h-[420px] after:top-[-50%] after:left-[-50%] custom-linear-gradient`}
          >
            <form
              onSubmit={handleSubmit}
              className="absolute inset-[2px] rounded-[8px] bg-[#000000] z-[10] form flex flex-col p-20"
            >
              <h2 className="text-[#ff4b45] text-2xl font-[500] text-center tracking-[0.1em]">
                Sign Up
              </h2>
              <div className="relative w-[300px] mt-[35px] inputbox">
                <input
                  type="text"
                  required
                  onChange={(e) => setFirstsname(e.target.value)}
                  className="relative w-[100%] inputbox-input bg-transparent outline-none  text-white font-[1em] tracking-[0.05em]"
                />
                <span className="absolute left-0 inputbox-span font-[1em] text-white tracking-[0.05em]">
                  First Name
                </span>
                <i className="absolute left-0 bottom-0 w-[100%] h-[2px] bg-[#ff4b45] rounded-[4px]"></i>
              </div>
              <div className="relative w-[300px] mt-[35px] inputbox">
                <input
                  type="text"
                  required
                  onChange={(e) => setLastsname(e.target.value)}
                  className="relative w-[100%] inputbox-input bg-transparent outline-none  text-white font-[1em] tracking-[0.05em]"
                />
                <span className="absolute left-0 inputbox-span font-[1em]  text-white  tracking-[0.05em]">
                  Last Name
                </span>
                <i className="absolute left-0 bottom-0 w-[100%] h-[2px] bg-[#ff4b45] rounded-[4px]"></i>
              </div>
              <div className="relative w-[300px] mt-[35px] inputbox">
                <input
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative w-[100%] inputbox-input bg-transparent outline-none  text-white  font-[1em] tracking-[0.05em]"
                />
                <span className="absolute left-0 inputbox-span font-[1em]  text-white tracking-[0.05em]">
                  Email
                </span>
                <i className="absolute left-0 bottom-0 w-[100%] h-[2px] bg-[#ff4b45] rounded-[4px]"></i>
              </div>
              <div className="relative w-[300px] mt-[35px] inputbox">
                <input
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative w-[100%] inputbox-input bg-transparent outline-none  text-white font-[1em] tracking-[0.05em]"
                />
                <span className="absolute left-0 inputbox-span font-[1em]  text-white  tracking-[0.05em]">
                  Password
                </span>
                <i className="absolute left-0 bottom-0 w-[100%] h-[2px] bg-[#ff4b45] rounded-[4px]"></i>
              </div>
              <input
                className=" flex justify-between border-none outline-none text-white  w-[300px] mt-[20px]   cursor-pointer"
                type="submit"
                value="Register"
              />
              <button
                className="flex justify-between border-none outline-none text-white  w-[300px] mt-[20px]   cursor-pointer "
                type="button"
                onClick={handleGoogle}
              >
                Continue with Google
                <GoogleIcon color="currentColor" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
