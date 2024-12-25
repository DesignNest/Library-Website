'use client'
import Image from "next/image";
import Link from "next/link";
import { GiCapricorn } from "react-icons/gi";
import { FaArrowRight, FaBars } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useAuthRedirect from "./hooks/redirectLoginHook";

export default function Home() {
  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-start justify-start w-full h-screen bg-gradient-to-r from-black to-gray-800">
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
        }
        .shake:hover {
          animation: shake 0.5s linear;
        }
      `}</style>
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
            <li className="ml-4"><Link href='/'>Home</Link></li>
            <li className="ml-4"><Link href='/'>Books</Link></li>
            <li className="ml-4"><Link href='/'>About Us</Link></li>
            <li className="ml-4"><Link href='/'>Contact</Link></li>
            <li className="ml-8 flex items-center text-center">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-white to-gray-400 hover:bg-gradient-to-l hover:from-white hover:to-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex items-center" onClick={handleGetStartedClick}>
                <FaArrowRight className="text-sm mr-2 shake" /> Get Started
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="flex flex-col justify-center items-center w-full h-bodyHeight mt-5 px-4 md:px-12 lg:px-16">
        <h2 className="text-green-600 font-sans tracking-widest font-normal text-lg mb-2 md:text-xl lg:text-lg text-center flex-wrap">Read, Buy, and Sell Books from Your Personal Library</h2>
        <h1 className="text-4xl font-sans text-white font-bold text-center mb-6 md:text-5xl lg:text-6xl flex-wrap">Love Books?<br/>Perfect Place For You</h1>
        <p className="text-white font-sans w-full md:w-2/3 lg:w-1/2 text-center mb-4 text-sm md:text-base lg:text-lg flex-wrap">Whether you’re looking to dive into a new story, expand your literary collection, or pass on the books you’ve loved, our platform is here to help you connect with fellow book enthusiasts.</p>
        <button type="button" className="text-black bg-gradient-to-r from-white to-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 font-medium text-sm px-10 py-2.5 text-center me-2 mb-2 flex items-center hover:shadow-lg rounded-lg" onClick={handleGetStartedClick}>
          <FaArrowRight className="text-sm mr-2 shake" /> Get Started
        </button>
      </div>
    </div>
  );
}
