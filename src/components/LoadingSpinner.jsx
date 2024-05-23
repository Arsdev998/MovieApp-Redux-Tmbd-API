import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col min-h-[60vh] justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-r-4 border-primary mb-5"></div>
      <p className='text-primary font-mono font-bold'>Loading Bro..</p>
    </div>
  );
};

export default LoadingSpinner;
