import React from 'react';

const Dashboard = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900 text-white'>
      <h1 className='text-4xl font-bold mb-4'>Welcome to Dashboard 🚀</h1>
      <p className='text-lg'>This is a private route. Only logged-in users can see this!</p>
    </div>
  );
};

export default Dashboard;
