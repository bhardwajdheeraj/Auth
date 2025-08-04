import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { AppContent } from '../context/AppContext.jsx';

const Header = () => {
  const { userData, setIsLoggedin, setUserData } = useContext(AppContent);
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔐 Remove token from localStorage
    localStorage.removeItem("token");

    // 🧹 Reset context
    setIsLoggedin(false);
    setUserData({});

    // 🔁 Optional: Redirect to login
    navigate('/login');
  };

  return (
    <div className='flex flex-col items-center text-center px-4 mt-20 text-gray-800'>
      {/* Profile Image */}
      <img
        src={assets.header_img}
        alt="Developer"
        className='w-36 h-36 rounded-full mb-6'
      />

      {/* Greeting with Emoji */}
      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>
        Hey {userData && userData.name ? userData.name : 'Developer'} 
        <img
          className='w-8 aspect-square'
          src={assets.hand_wave}
          alt="Wave"
        />
      </h1>

      {/* Professional Heading */}
      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>
        Defense Starts with Authentication
      </h2>

      {/* Subheading */} 
      <h3 className='text-xl sm:text-2xl text-gray-700 mb-2'>
        Build trust. Protect data. Authenticate like a pro.
      </h3>

      {/* Description Paragraph */}
      <p className='mb-8 max-w-md text-sm sm:text-base text-gray-600'>
        Whether you're building an MVP or scaling your product, Defender MERN Auth gives you the tools to manage users, protect routes, and verify identity with confidence.
      </p>

      {/* CTA Button */}
      <button className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all'>
        🚀 Start Securing Your App
      </button>

      {/* 👋 Logout Button (only if logged in) */}
      {userData && userData.name && (
        <button
          onClick={handleLogout}
          className='mt-6 text-sm text-red-500 underline hover:text-red-700 transition-all'
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
