'use client'
import { useState, useEffect } from "react";
import { GiCapricorn } from "react-icons/gi";
import useAuthRedirect from "../hooks/redirectLoginHook";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useAuthRedirect();
  const handleLogOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const [books, setBooks] = useState([]);


  const handleBookClick = (bookID) => {
router.push(`/home/${bookID}`)
  };
  
  const fetchBooks = async () => {
    try{
      const response = await axios.get('http://localhost:5000/api/books/showBook');
      const booksData = response.data.map(book => ({
        ...book,
        cover: `http://localhost:5000/uploads/${book.bookCover.split('/').pop()}`,
        title: book.bookTitle, 
        price: book.bookPrice ,
        id: book.bookId
      }));
      console.log(booksData); 
      setBooks(booksData);
    } catch (error) {
      console.error('Error fetching books:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [])
  return (
    <div className="h-content w-full flex flex-col bg-gradient-to-r from-black to-gray-800 items-start justify-start sm:h-content">
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
      <div className='flex flex-col w-full h-content items-center justify-start p-4 sm:p-6 md:p-8 lg:p-12 min-h-[90vh]'>
        <h1 className="font-sans font-regular text-2xl text-white w-full text-left mb-4">Books</h1>
        <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {books.map((book, index) => (
            <div key={index} className="relative group overflow-hidden bg-gray-800 rounded-lg shadow-lg"  onClick={()=>{handleBookClick(book.id)}}>
              <img 
                src={book.cover}
                alt={book.title} 
                className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform"
              />
              <div className="p-4">
                <h2 className="text-lg text-white font-bold">{book.title}</h2>
                <p className="text-gray-400 mt-1 flex items-center">
                  <GiCapricorn className="mr-1" /> {book.price}
                </p>
              </div>
            
            </div>
             
          ))}
        </div>
      </div>
   
    </div>
  );
}
