import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CiMenuKebab } from "react-icons/ci";
import axioInst from "../../../config/axiosInstance";

const UserNav = ({ selectedUser }) => {
  const [status, setStatus] = useState("...");
  const getStatus = async () => {
    try {
      const res = await axioInst.get(
        `/api/user/get/status/${selectedUser?._id}`
      );
      setStatus(res.data.status);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStatus();
  }, [selectedUser]);
  return (
    <div className=" rounded-3xl">
      <div className="flex items-center px-10   rounded-3xl -z-1">
        <div className="ml-2 w-full flex  items-center justify-between">
          <div>
            <h2 className="text-3xl capitalize   mt-2  font-semibold">
              {selectedUser?.username}
            </h2>
            <div className="flex  items-center justify-left gap-2">
              <div className=" w-2 h-2 bg-green-500 rounded-full"></div>
              <p>{status}</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <CiSearch className=" text-3xl" />
            <CiMenuKebab className=" text-3xl" />
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default UserNav;
