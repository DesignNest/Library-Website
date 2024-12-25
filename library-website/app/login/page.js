'use client'
import { useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/authHook';

export default function Auth() {
  useAuth()
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const response = await axios.post(isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register', { username, email, password });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/home';
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-black to-gray-800 flex flex-col items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-start bg-slate-50 w-full max-w-sm md:max-w-md lg:max-w-lg p-6 md:p-8 lg:p-10 shadow-xl rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{isLogin ? 'Login' : 'Register'}</h2>
        <p className="text-sm text-gray-600 mb-6">{isLogin ? 'Login to your account' : 'Create a new account'}</p>
        
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">Username</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-[#E6E6FA] placeholder-gray-500 text-gray-500 text-sm rounded-lg w-full mb-4 py-3.5 px-2.5 focus:outline-none" placeholder="Your Username"/>
        
        {!isLogin && (
          <>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-[#E6E6FA] placeholder-gray-500 text-gray-500 text-sm rounded-lg w-full mb-4 py-3.5 px-2.5 focus:outline-none" placeholder="Your Email"/>
          </>
        )}
        
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-[#E6E6FA] placeholder-gray-500 text-gray-500 text-sm rounded-lg w-full mb-4 py-3.5 px-2.5 focus:outline-none" placeholder="Your Password"/>
        
        <button type="submit" className="w-full bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
          {isLogin ? 'Login' : 'Register'}
        </button>
        
        <p className="text-sm text-gray-600 mt-4">
          {isLogin ? (
            <>Don’t have an account? <a onClick={() => setIsLogin(false)} className="text-blue-600 hover:underline cursor-pointer">Create Now</a></>
          ) : (
            <>Already have an account? <a onClick={() => setIsLogin(true)} className="text-blue-600 hover:underline cursor-pointer">Login</a></>
          )}
        </p>
      </form>
    </div>
  );
}
