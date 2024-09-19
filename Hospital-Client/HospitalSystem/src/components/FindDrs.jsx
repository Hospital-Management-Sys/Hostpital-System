import React from 'react';
import doctors2 from '../assets/doctors2.jpg';
import DropDown from '../components/DropDown'

function FindDrs() {
  return (
    <div>
      <div
  key="1"
  className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8"
>
  <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
    <div>
      <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">
      Your health, your choice , now find a 
      {' '}
        <span className="text-[#FF9E9E]">
         doctor  !
        </span>
         
      </h1>
      <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">
        Hand-picked professionals and expertly crafted components, designed for any kind of entrepreneur.
      </p>
      
      <form className="flex items-center max-w-lg mx-auto">
  <label
    className="sr-only"
    htmlFor="voice-search"
  >
    Search
  </label>
  <div className="relative w-full">
    <div className="absolute inset-y-0 start-0  flex items-center ps-3 pointer-events-none">
      <svg
        aria-hidden="true"
        className="w-4 h-4 text-gray-500 dark:text-gray-400"
        fill="none"
        viewBox="0 0 21 21"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </div>
    <DropDown />
   
  </div>
  <button
    className="inline-flex items-center py-2.5 px-3 -ml-64 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    type="submit"
  >
    <svg
      aria-hidden="true"
      className="w-4 h-4 me-2"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
    Search
  </button>
      </form>
      <div className="mt-7 grid gap-3 w-full sm:inline-flex">
        
      </div>
     
    </div>
    <div className="relative ms-4">
      <img
        alt="Hero Image"
        className="w-full h-[700px] rounded-md"
        src={doctors2}
      />
      <div className="absolute inset-0 -z-[1] bg-gradient-to-tr from-gray-200 via-white/0 to-white/0 size-full rounded-md mt-4 -mb-4 me-4 -ms-4 lg:mt-6 lg:-mb-6 lg:me-6 lg:-ms-6 dark:from-neutral-800 dark:via-neutral-900/0 dark:to-neutral-900/0" />
      <div className="absolute bottom-0 start-0">
        <svg
          className="w-2/3 ms-auto h-auto text-white dark:text-neutral-900"
          fill="none"
          height="451"
          viewBox="0 0 630 451"
          width="630"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            fill="currentColor"
            height="99"
            width="99"
            x="531"
            y="352"
          />
          <rect
            fill="currentColor"
            height="99"
            width="106"
            x="140"
            y="352"
          />
          <rect
            fill="currentColor"
            height="49"
            width="64"
            x="482"
            y="402"
          />
          <rect
            fill="currentColor"
            height="49"
            width="63"
            x="433"
            y="402"
          />
          <rect
            fill="currentColor"
            height="50"
            width="49"
            x="384"
            y="352"
          />
          <rect
            fill="currentColor"
            height="50"
            width="50"
            x="531"
            y="328"
          />
          <rect
            fill="currentColor"
            height="58"
            width="49"
            x="99"
            y="303"
          />
          <rect
            fill="currentColor"
            height="50"
            width="49"
            x="99"
            y="352"
          />
          <rect
            fill="currentColor"
            height="59"
            width="49"
            x="99"
            y="392"
          />
          <rect
            fill="currentColor"
            height="49"
            width="66"
            x="44"
            y="402"
          />
          <rect
            fill="currentColor"
            height="49"
            width="62"
            x="234"
            y="402"
          />
          <rect
            fill="currentColor"
            height="49"
            width="50"
            x="334"
            y="303"
          />
          <rect
            fill="currentColor"
            height="49"
            width="49"
            x="581"
          />
          <rect
            fill="currentColor"
            height="64"
            width="49"
            x="581"
          />
          <rect
            fill="currentColor"
            height="49"
            width="49"
            x="482"
            y="123"
          />
          <rect
            fill="currentColor"
            height="24"
            width="49"
            x="507"
            y="124"
          />
          <rect
            fill="currentColor"
            height="99"
            width="99"
            x="531"
            y="49"
          />
        </svg>
        
      </div>
     
    </div>
  </div>
</div>
    </div>
  )
}

export default FindDrs;
