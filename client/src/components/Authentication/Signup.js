import React, { useEffect, useState } from 'react';
import { FaLightbulb } from 'react-icons/fa';
import { FaFire } from 'react-icons/fa6';
import { MdMoreTime } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Auth, Provider } from '../../objects/firebase-config';
import axios from 'axios';

const Signup = ({ setAuthenticated }) => {
  const navigate = useNavigate();
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // Signing in with Provider (Google)
  const signInProvider = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(Auth, Provider);
      console.log("Login successful");
      setAuthenticated(true);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Google sign-in failed');
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
      localStorage.setItem("token", response.data.token);
      console.log(response.data);
      setAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error(error);
      console.log(error)
      setError('Error creating account');
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', { email, password });
      localStorage.setItem("token", response.data.token);
      console.log(response.data);
      setAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error(error);
      console.log(error);
      setError('Invalid email or password');
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // User is already authenticated, redirect to home page
          navigate("/");
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="h-[100vh] flex items-center justify-center bg-zinc-200">
      <div className="flex absolute p-4 left-0 top-0 justify-between items-center">
        <p className="ml-2 text-3xl max-lg:text-2xl font-medium text-black">
          build
          <span className="font-bold text-3xl max-lg:text-2xl text-amber-300">
            MY
          </span>
          resume
        </p>
      </div>
      <div className="w-full h-full shadow-lg rounded-lg overflow-hidden flex">
        {/* Left Side */}
        <div className="w-[40%]  p-8 hidden lg:flex flex-col justify-center items-center">
          <div className='px-20'>
            <h2 className="text-3xl text-black font-semibold mb-6">Create a resume you are proud of</h2>
            <ul className="space-y-8 pr-5 py-4">
              <li className="flex items-center gap-2">
                <MdMoreTime className='w-8 h-8'/>
                <span className='text-lg text-zinc-500'>Save time with hassle-free templates</span>
              </li>
              <li className="flex items-center gap-4">
                <FaLightbulb className='w-8 h-8'/>
                <span className='text-lg text-zinc-500'>Beat the competition using actionable, contextual advice</span>
              </li>
              <li className="flex items-center gap-3">
                <FaFire className='w-8 h-8' />
                <span className='text-lg text-zinc-500'>Highlight key achievements with memorable visuals</span>
              </li>
            </ul>
          </div>
          <p className="mt-5 text-black flex gap-1">Get inspired by <p className='font-bold'>Free Resume Examples and Templates</p> </p>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 px-8 lg:px-12 py-6 flex flex-col justify-center">
          <div className='w-[90%] px-32 h-[100vh] bg-white flex flex-col items-center justify-center'>
            {isCreatingAccount ? (
              <>
                <h2 className="text-2xl font-semibold mb-10">Create your account</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="flex justify-between ">
                  <button className="flex gap-2 border-[1px] border-gray-400 rounded-md px-5 items-center justify-center text-red-500 font-semibold text-lg py-2 " onClick={signInProvider}>
                    <svg className='w-7' viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z" fill="#4285F4" />
                      <path d="M16.2863 29.9998C20.1434 29.9998 23.3814 28.7553 25.7466 26.6086L21.2386 23.1863C20.0323 24.0108 18.4132 24.5863 16.2863 24.5863C12.5086 24.5863 9.30225 22.1441 8.15929 18.7686L7.99176 18.7825L3.58208 22.127L3.52441 22.2841C5.87359 26.8574 10.699 29.9998 16.2863 29.9998Z" fill="#34A853" />
                      <path d="M8.15964 18.769C7.85806 17.8979 7.68352 16.9645 7.68352 16.0001C7.68352 15.0356 7.85806 14.1023 8.14377 13.2312L8.13578 13.0456L3.66917 9.651L3.52543 9.71633C2.55856 11.6645 2.00195 13.7687 2.00195 16.0001C2.00195 18.2314 2.55856 20.3356 3.52543 22.2838L8.15964 18.769Z" fill="#FBBC05" />
                      <path d="M16.2863 7.41341C18.8443 7.41341 20.5813 8.53562 21.4916 9.38252L25.8377 5.20618C23.3712 3.0117 20.1434 2.00195 16.2863 2.00195C10.699 2.00195 5.87359 5.14434 3.52441 9.71764L8.14342 13.2318C9.30225 9.85634 12.5086 7.41341 16.2863 7.41341Z" fill="#EB4335" />
                    </svg>
                    Google
                  </button>
                </div>
                <form onSubmit={handleEmailSignUp} className="w-full flex flex-col items-center">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="w-full mt-4 p-2 border rounded-md"
                    aria-label="Name"
                    required
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full mt-4 p-2 border rounded-md"
                    aria-label="Email"
                    required
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full mt-4 p-2 border rounded-md"
                    aria-label="Password"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md"
                  >
                    Create Account
                  </button>
                </form>
                <p className="mt-4 text-sm">
                  Already have an account?{' '}
                  <span
                    onClick={() => setIsCreatingAccount(false)}
                    className="text-blue-500 cursor-pointer"
                  >
                    Sign in
                  </span>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-10">Sign in to your account</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="flex justify-between ">
                  <button className="flex gap-2 border-[1px] border-gray-400 rounded-md px-5 items-center justify-center text-red-500 font-semibold text-lg py-2 " onClick={signInProvider}>
                    <svg className='w-7' viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z" fill="#4285F4" />
                      <path d="M16.2863 29.9998C20.1434 29.9998 23.3814 28.7553 25.7466 26.6086L21.2386 23.1863C20.0323 24.0108 18.4132 24.5863 16.2863 24.5863C12.5086 24.5863 9.30225 22.1441 8.15929 18.7686L7.99176 18.7825L3.58208 22.127L3.52441 22.2841C5.87359 26.8574 10.699 29.9998 16.2863 29.9998Z" fill="#34A853" />
                      <path d="M8.15964 18.769C7.85806 17.8979 7.68352 16.9645 7.68352 16.0001C7.68352 15.0356 7.85806 14.1023 8.14377 13.2312L8.13578 13.0456L3.66917 9.651L3.52543 9.71633C2.55856 11.6645 2.00195 13.7687 2.00195 16.0001C2.00195 18.2314 2.55856 20.3356 3.52543 22.2838L8.15964 18.769Z" fill="#FBBC05" />
                      <path d="M16.2863 7.41341C18.8443 7.41341 20.5813 8.53562 21.4916 9.38252L25.8377 5.20618C23.3712 3.0117 20.1434 2.00195 16.2863 2.00195C10.699 2.00195 5.87359 5.14434 3.52441 9.71764L8.14342 13.2318C9.30225 9.85634 12.5086 7.41341 16.2863 7.41341Z" fill="#EB4335" />
                    </svg>
                    Google
                  </button>
                </div>
                <form onSubmit={handleEmailSignIn} className="w-full flex flex-col items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full mt-4 p-2 border rounded-md"
                    aria-label="Email"
                    required
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full mt-4 p-2 border rounded-md"
                    aria-label="Password"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md"
                  >
                    Sign In
                  </button>
                </form>
                <p className="mt-4 text-sm">
                  Don't have an account?{' '}
                  <span
                    onClick={() => setIsCreatingAccount(true)}
                    className="text-blue-500 cursor-pointer"
                  >
                    Create one
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
