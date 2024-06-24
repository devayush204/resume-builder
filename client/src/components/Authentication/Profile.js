import React from 'react'
import { Auth } from '../../objects/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';

const Profile = () => {
    const [user] = useAuthState(Auth);
  return (
    <div className="p-4 mt-20">
        <p className='text-5xl font-bold mt-4'>My Dashboard</p>
    <h2 className="text-2xl font-bold my-8 flex gap-2 items-center">Welcome back, <p className='bg-amber-400 px-2'>{user?.displayName || (user?.email && user.email.split("@")[0])}!</p> You have pending documents</h2>
    
    <div className="flex space-x-4 mb-4 items-center justify-center ">
      <button className="bg-green-100 text-green-600 p-6 rounded w-[70%]">
        <a href='/build/personaldetails' className="text-2xl">+ New resume</a>
        <p className="text-sm mt-2">TIP: Did you know that if you tailor your resume to the job description, you double your chances to get an interview?</p>
      </button>
      
    </div>

    <div className="flex flex-wrap">
      {/* Document Card - Cover Letter */}
      <div className="bg-white rounded-lg shadow-md p-4 m-2 w-full md:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">New Resume (1)</h2>
          <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">Resume </span>
        </div>
        <div className="text-gray-600 text-sm mb-4">Edited 1 month ago</div>
        <p>Ayush Bhatt -  Full Stack Developer</p>
        <div className="flex justify-between items-center mt-4">
          <button className="text-green-600">Edit</button>
          <button className="text-blue-600">Duplicate</button>
          <button className="text-red-600">Delete</button>
        </div>
        <div className="text-gray-400 text-xs mt-2">Created on Apr 26, 2024</div>
      </div>

      {/* Document Card - Resume */}
      <div className="bg-white rounded-lg shadow-md p-4 m-2 w-full md:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">New Resume (2)</h2>
          <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">Resume</span>
        </div>
        <div className="text-gray-600 text-sm mb-4">Edited 1 month ago</div>
        <p >Ayush Bhatt - Software Developer</p>
        <div className="flex justify-between items-center mt-4">
          <button className="text-green-600">Edit</button>
          <button className="text-blue-600">Duplicate</button>
          <button className="text-red-600">Delete</button>
        </div>
        <div className="text-gray-400 text-xs mt-2">Created on May 25, 2024</div>
      </div>
    </div>
  </div>
  )
}

export default Profile