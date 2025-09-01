import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import api from '../axios';    // ✅ Axios Instance
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState('SignUp'); // 'SignUp' or 'Login'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmithandler = async (e) => {
    e.preventDefault();

    if (!email || !password || (state === 'SignUp' && !name)) {
      return toast.error("All fields are required");
    }

    try {
      let endpoint = `/api/auth/${state === 'SignUp' ? 'register' : 'login'}`;
      let payload = { email, password };

      if (state === 'SignUp') {
        payload = { name, email, password };
      }

      // Axios instance should have withCredentials: true for cookies
      const { data } = await api.post(endpoint, payload);

      if (data.success) {
        toast.success(data.message || `${state} successful!`);
        if (state === 'SignUp') {
          // After registration, redirect to login page
          setState('Login');
        } else {
          setIsLoggedin(true);
          await getUserData();
          setTimeout(() => navigate('/'), 100);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={() => navigate('/')} src={assets.logo} alt="Logo"
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />

      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>
          {state === 'SignUp' ? 'Create account' : 'Login'}
        </h2>
        <p className='text-center text-sm mb-6'>
          {state === 'SignUp' ? 'Create your account' : 'Login to your account!'}
        </p>

        <form onSubmit={onSubmithandler}>
          {state === 'SignUp' && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="Person Icon" />
              <input
                onChange={e => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none text-white placeholder-white w-full"
                type="text"
                name="fullName"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="Mail Icon" />
            <input
              onChange={e => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none text-white placeholder-white w-full"
              type="email"
              name="email"
              placeholder="Email ID"
              required
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="Lock Icon" />
            <input
              onChange={e => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none text-white placeholder-white w-full"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>

          <p onClick={() => navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer'>
            Forgot password?
          </p>
          <button type="submit" className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>
            {state}
          </button>
        </form>

        {state === 'SignUp' ? (
          <p className='text-gray-400 text-center text-xs mt-4'>
            Already have an account?{' '}
            <span onClick={() => setState('Login')} className='text-blue-400 cursor-pointer underline'>Login here</span>
          </p>
        ) : (
          <p className='text-gray-400 text-center text-xs mt-4'>
            Don't have an account?{' '}
            <span onClick={() => setState('SignUp')} className='text-blue-400 cursor-pointer underline'>Sign Up</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
