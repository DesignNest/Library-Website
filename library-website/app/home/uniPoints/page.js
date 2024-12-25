'use client'
import { useState, useEffect } from "react";
import { GiCapricorn } from "react-icons/gi";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import useAuthRedirect from "@/app/hooks/redirectLoginHook";
import { jwtDecode } from "jwt-decode";
export default function Home() {
  useAuthRedirect();
  const [unipoints, setUnipoints] = useState(0); 
  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token).username
  const username = decodedToken

  const handleLogOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };


  useEffect(() => {
    const fetchUnipoints = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/unipoints/showUniPoints', { username });
        setUnipoints(response.data.uniPoints);
      } catch (error) {
        console.error('Error fetching unipoints:', error.response?.data || error.message);
      }
    };
    fetchUnipoints();
  }, []);

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-r from-black to-gray-800 items-start justify-start sm:h-content">
      <nav className="flex flex-row items-center justify-between h-navHeight w-full pl-8 pr-8 md:pl-12 md:pr-12 lg:pl-16 lg:pr-16 mt-4">
        <div className="flex cursor-pointer">
          <span className="text-white text-2xl mr-2"><GiCapricorn /></span>
          <h1 className="text-white font-sans font-bold text-2xl">Book.</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="md:hidden">
            <FaBars className="text-white text-2xl" />
          </div>
          <ul className="hidden md:flex space-x-4 text-white font-sans items-center">
            <li className="ml-4"><Link href='http://localhost:3000/home/createBook'>Books</Link></li>
            <li className="ml-4"><Link href='http://localhost:3000/home/createBook'>Create Book</Link></li>
            <li className="ml-4"><Link href='http://localhost:3000/home/uniPoints'>Uni Points</Link></li>
            <li className="ml-8 flex items-center text-center">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-white to-gray-400 hover:bg-gradient-to-l hover:from-white hover:to-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex items-center" onClick={handleLogOut}>
                <FaSignOutAlt className="text-md mr-2" /> Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="flex flex-col items-start justify-center h-bodyHeight w-full">
      <div className="flex flex-col justify-start items-start p-0 pl-8 pt-4 h-auto w-full">
        <h1 className="text-white font-sans font-bold text-xl w-full text-left mt-2 pl-4">Your Unipoints</h1>
      </div>
      <div className="flex flex-grow justify-center items-center w-full">
        <h1 className="text-white font-bold text-6xl font-sans flex"><GiCapricorn className="mr-2" /> {unipoints}</h1>
      </div>
      </div>
    </div>
  );
}
