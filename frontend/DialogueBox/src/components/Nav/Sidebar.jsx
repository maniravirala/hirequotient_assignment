import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { IoIosContacts } from "react-icons/io";
import {
  HiHome,
  HiUser,
  HiCog,
  HiPencilAlt,
  HiDocumentText,
  HiStatusOffline,
  HiStatusOnline,
} from "react-icons/hi";
import { BsChatDots } from "react-icons/bs";
import { RiLogoutBoxRLine } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import axioInst from "../../config/axiosInstance";
import { AuthContext } from "../../context/userContext";
const Sidebar = () => {
  const [status, setStatus] = useState(null);
  const [open, setOpen] = useState(false);
  const { authUser } = useContext(AuthContext);
  const currentUser = authUser._id;
  useEffect(() => {
    const getStatus = async () => {
      try {
        const res = await axioInst.get(`/api/user/get/status/${currentUser}`);
        setStatus(res.data.status);
        console.log(res.data.status);
      } catch (error) {
        console.log(error);
      }
    };
    getStatus();
  }, []);
  const handleStatus = async () => {
    if (status === "Available") {
      const res = await axioInst.post("/api/user/update/status", {
        status: "Busy",
        userId: currentUser,
      });
      setStatus("Busy");
      toast.success("Status set to Busy");
    } else {
      const res = await axioInst.post("/api/user/update/status", {
        status: "Available",
        userId: currentUser,
      });
      setStatus("Available");
      toast.success("Status set to Available");
    }
  };
  return (
    <>
      <aside className="flex flex-col items-center w-16 h-screen py-8 overflow-y-auto bg-white border-r rtl:border-l rtl:border-r-0 ">
        <nav className="flex flex-col flex-1 space-y-6">
          <Link
            to="/home"
            className="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg  hover:bg-gray-100"
          >
            <HiHome className="w-6 h-6" />
          </Link>

          <Link
            to="/invite"
            className="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg  hover:bg-gray-100"
          >
            <HiUser className="w-6 h-6" />
          </Link>

          <Link
            to="/accept"
            className="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg  hover:bg-gray-100"
          >
            <IoIosContacts className="w-6 h-6" />
          </Link>
        </nav>

        <div className="flex flex-col space-y-6">
          <button
            onClick={handleStatus}
            className="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg  hover:bg-gray-100"
          >
            {status === "Available" ? (
              <HiStatusOnline className="w-6 h-6" />
            ) : (
              <HiStatusOffline className="w-6 h-6" />
            )}
          </button>

          <button onClick={() => setOpen(!open)}>
            <img
              className="object-cover w-8 h-8 rounded-full"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100"
              alt=""
            />
          </button>
        </div>
        <Toaster />
      </aside>
      {open && (
        <div className="absolute top-1/2  transform left-20 w-96 h-96 rounded-2xl bg-black shadow-lg z-50">
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-6xl text-white capitalize mt-10 font-semibold">
                {authUser.username}
              </h2>
              <p
                className={`text-2xl ${
                  status === "Available" ? "text-green-500" : "text-red-500"
                }`}
              >
                {status === "Available" ? "Available" : "Busy"}
              </p>
            </div>
            <button onClick={() => setOpen(false)}>X</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
