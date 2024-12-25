'use client'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { GiCapricorn } from 'react-icons/gi';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';

const Page = ({ params }) => {
  const [book, setBook] = useState({});
  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token).username
  useEffect(() => {
    const findBook = async () => {
      const response = await axios.get(`http://localhost:5000/api/books/getBookById/${params.slug}`);
      if (response) {
        setBook(response.data);
      }
    };
    findBook();
  }, [params.slug]);

  const handlePurchase = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/purchaseBook', {
        username: decodedToken, 
        bookId: params.slug
      });

      if (response.status === 200) {
     
        const link = document.createElement('a');
        link.href = response.data.bookPdf; 
        link.setAttribute('download', `${book.bookTitle}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error purchasing book:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row w-full h-screen items-stretch overflow-hidden font-sans bg-gradient-to-r from-black to-gray-800">
      <Link href="/home" className="absolute top-4 left-4 text-lg text-white">
        Back to Home
      </Link>
      <div className="flex w-full sm:w-1/3 h-2/3 sm:h-auto items-center justify-center">
        <img
          src={book.bookCover}
          alt={book.bookTitle}
          className="h-2/3 w-2/3"
        />
      </div>
      <div className="flex flex-col justify-center p-8 sm:p-12 text-white flex-1">
        <h1 className="text-4xl sm:text-6xl font-bold mb-8 font-sans">{book.bookTitle}</h1>
        <p className="text-lg sm:text-xl mb-4">{book.bookDescription}</p>
        <p className="text-lg sm:text-xl text-gray-400 mb-12">{book.username}</p>
        <button
          onClick={handlePurchase}
          className="flex flex-row text-lg sm:text-xl text-gray-900 bg-gradient-to-r from-white to-gray-400 hover:bg-gradient-to-l hover:from-white hover:to-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 font-medium rounded-lg px-6 py-3 text-center"
        >
          Buy For <span><GiCapricorn className="mt-1" /></span> {book.bookPrice}
        </button>
      </div>
    </div>
  );
};

export default Page;
