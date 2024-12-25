'use client';
import { useState } from 'react';
import { GiCapricorn } from "react-icons/gi";
import useAuthRedirect from "@/app/hooks/redirectLoginHook";
import { FaBars } from "react-icons/fa";
import Link from "next/link";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Ensure you have this package installed

export default function Home() {
  useAuthRedirect();
  
  const [bookTitle, setBookTitle] = useState('');
  const [bookDescription, setBookDescription] = useState('');
  const [bookPrice, setBookPrice] = useState('');
  const [bookCover, setBookCover] = useState('');
  const [bookPdf, setBookPdf] = useState('');

  const handleFileInput = (e, setFile) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFile(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Get token from localStorage
    const decoded = jwtDecode(token); // Decode the token to get the username
    const username = decoded.username; // Adjust this based on your JWT structure

    const formData = {
      bookTitle,
      bookDescription,
      bookPrice,
      bookCover,
      bookPdf,
      username,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/books/createBook', formData);
      if (response.status === 201) {
        // Redirect to home page upon successful book creation
        window.location.href = '/home';
      }
    } catch (error) {
      console.error('Error creating book:', error.response?.data || error.message);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-r from-black to-gray-800 items-start justify-start">
      <nav className="flex flex-row items-center justify-between h-navHeight w-full mt-4 pl-8 pr-8 md:pl-12 md:pr-12 lg:pl-16 lg:pr-16">
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
          </ul>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center w-full h-bodyHeight">
        <form className="w-3/4" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="book-title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book Title</label>
            <input
              type="text"
              id="book-title"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Enter Book Title"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="book-description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book Description</label>
            <textarea
              id="book-description"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Enter Book Description"
              value={bookDescription}
              onChange={(e) => setBookDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-5">
            <label htmlFor="book-price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book Price</label>
            <input
              type="number"
              id="book-price"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Enter Book Price"
              value={bookPrice}
              onChange={(e) => setBookPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="book-cover" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book Cover</label>
            <input
              type="file"
              id="book-cover"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              onChange={(e) => handleFileInput(e, setBookCover)}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="book-pdf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book PDF</label>
            <input
              type="file"
              id="book-pdf"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              onChange={(e) => handleFileInput(e, setBookPdf)}
              required
            />
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
      </div>
    </div>
  );
}
