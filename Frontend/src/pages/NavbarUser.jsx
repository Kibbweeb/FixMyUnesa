import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-blue-700 text-white">
      <h1 className="text-xl font-bold w-full ml-10 p-4">FixMyUnesa</h1>
      <ul className="hidden md:flex w-full justify-end mr-4">
        <li className="p-4">Home</li>
        <li className="p-4">Report</li>
        <li className="p-4">ReportList</li>
        <li className="p-4">MyReports</li>
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div className={!nav ? "fixed md:hidden left-0 top-0  w-[300px] h-full border-r border-r-gray-900 bg-blue-700 z-50 ease-in-out duration-500": "fixed left-[-100%] md:hidden"}>
        <h1 className="text-xl font-bold w-full m-8">FixMyUnesa</h1>
        <ul className="p-4">
          <li className="p-4 border-b">Home</li>
          <li className="p-4 border-b">Report</li>
          <li className="p-4 border-b">ReportList</li>
          <li className="p-4 border-b">MyReports</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
