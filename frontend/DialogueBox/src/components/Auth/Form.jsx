import React, { useContext, useState } from "react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { TbPassword } from "react-icons/tb";
import axioInst from "../../config/axiosInstance";
import { Link } from "react-router-dom";
// import { useAuthContext } from "../../context/userContext";
import { AuthContext } from "../../context/userContext";
import { SocketContext } from '../../context/socketContext';

const Form = (props) => {
  const {authUser, setAuthUser} = useContext(AuthContext);
  const { login } = props;
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const socket = useContext(SocketContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };


  const handleSubmission = async (e) => {
    e.preventDefault();
    if(login){
      return handleLogin(e);
    }
    try {
      const response = await axioInst.post("/api/auth/register", user , {withCredentials : true});
      console.log(response);
      setUser({
        email: "",
        username: "",
        password: "",
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axioInst.post("/api/auth/login", user);
      console.log(response);
      setUser({
        email: "",
        password: "",
      });
      localStorage.setItem("chatjwt" , response.data.token)
      localStorage.setItem("chatuser" , JSON.stringify(response.data.user))
      setAuthUser(response.data.user);
      console.log(authUser)
      socket.emit("user-connected", response.data.user._id);
      response.data.user && window.location.replace("/home");
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div>
      <form className="w-full lg:max-w-xl " onSubmit={handleSubmission}>
        <div className="relative flex items-center py-4">
          <span className="absolute mx-4">
            <MdOutlineAlternateEmail />
          </span>
          <input
            type="email"
            name="email"
            value={user.email}
            autoComplete="email"
            onChange={handleChange}
            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11   dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Email address"
          />
        </div>
        {login}
        {login ? null : (
          <div className="relative flex items-center pb-4">
            <span className="absolute mx-4">
              <CiUser />
            </span>
            <input
              type="text"
              autoComplete="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11   dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="User Name"
            />
          </div>
        )}
        <div className="relative flex items-center">
          <span className="absolute mx-4">
            <TbPassword />
          </span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={user.password}
            onChange={handleChange}
            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11   dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Password"
          />
        </div>
        <div className="mt-8 md:flex md:items-center">
          <button
            type="submit"
            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg md:w-1/2 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
          {
            login ? "Login" : "Register"
          }
          </button>
        </div>
        <div>
          <Link to="/login" className="text-blue-500 dark:text-blue-400">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Form;
