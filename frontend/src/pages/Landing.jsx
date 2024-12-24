import React, { useState } from 'react';

const Landing = () => {
  const token = localStorage.getItem("jsonwebtoken");

  return (
    <div>
      <div className="bg-[#F4F2EC]">
        <header className="bg-[#FCF8F1] bg-opacity-30">
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              <div className="flex-shrink-0">
                <a href="#" title="" className="flex">
                  <h1 className="text-3xl font-semibold">PassValley</h1>
                </a>
              </div>

              <button type="button" className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100">
                <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"></path>
                </svg>

                <svg className="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
                <a href="#" title="" className="text-base text-black transition-all duration-200 hover:text-opacity-80"> Features </a>
                <a href="#" title="" className="text-base text-black transition-all duration-200 hover:text-opacity-80"> Solutions </a>
                <a href="#" title="" className="text-base text-black transition-all duration-200 hover:text-opacity-80"> Resources </a>
                <a href="#" title="" className="text-base text-black transition-all duration-200 hover:text-opacity-80"> Pricing </a>
              </div>

              {token ? (
                <a href="/dashboard" title="" className="lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full" role="button"> Go to Dashboard </a>
              ) : (
                <a href="/login" title="" className="lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full" role="button"> Login </a>
              )}
            </div>
          </div>
        </header>

        <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">PassValley</p>
                <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">Save your passwords with security vault</h1>
                <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">Manage passwords at one place</p>
              </div>

              <div>
                <img className="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png" alt="" />
              </div>
            </div>
          </div>
        </section>
        <div className='flex justify-center py-10'>
          <video loop autoPlay muted className='h-[500px] w-auto rounded-lg' src="landingvid.mp4"></video>
        </div>
      </div>
    </div>
  );
};

export default Landing;
