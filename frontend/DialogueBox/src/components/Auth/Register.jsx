import React, { useState, useEffect } from "react";
import Form from "./Form";

const RegistrationForm = ({login}) => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="container px-6 py-24 mx-auto lg:py-32 border-2 rounded-3xl bg-blue-300/10 p-20 flex-wrap-reverse">
        <div className="lg:flex px-20">
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-semibold">Dialouge Box</h1>
            <h1 className="mt-4 font-bold text-blue-600 text-7xl">
              Welcome back
            </h1>
          </div>

          <div className="mt-8 lg:w-1/2 lg:mt-0">
            <h1 className="mt-4 text-xl font-medium text-gray-800 capitalize ">
          {
            login ? "Login to your Account " : "Create an Account"
          }
            </h1>
            <Form  login={login} />
          </div>
        </div>

        <div className="mt-8 md:mt-24 sm:flex sm:items-center">
          <h3 className="text-blue-500 dark:text-blue-400 sm:w-1/2">
            Social networks
          </h3>
          <div className="flex items-center mt-4 sm:mt-0 -mx-1.5 sm:w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
