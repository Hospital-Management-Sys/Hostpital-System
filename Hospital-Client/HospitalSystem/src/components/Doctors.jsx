import React from 'react';
import dr1 from '../assets/dr1.jpg'
import dr2 from '../assets/dr2.jpg'
function Doctors() {
  return (
    <div className="mx-auto my-10 max-w-screen-lg">
      <div className="flex flex-wrap justify-center gap-8">
        {/* Card 1 */}
        <div className="flex max-w-xs flex-col items-center rounded-xl border px-4 py-4 text-center md:max-w-lg md:flex-row md:items-start md:text-left">
          <div className="mb-4 md:mr-6 md:mb-0">
            <img
              alt=""
              className="h-56 rounded-lg object-cover md:w-56"
              src={dr1}
            />
          </div>
          <div>
            <p className="text-xl font-medium text-gray-700">James Edward</p>
            <p className="mb-4 text-sm font-medium text-gray-500">Senior Editor</p>
            <div className="flex space-x-2">
              <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                <p className="text-sm font-medium text-gray-500">Articles</p>
                <p className="text-3xl font-medium text-gray-600">13</p>
              </div>
              <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                <p className="text-sm font-medium text-gray-500">Papers</p>
                <p className="text-3xl font-medium text-gray-600">7</p>
              </div>
              <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                <p className="text-sm font-medium text-gray-500">Speciality</p>
                <p className="text-sm font-medium text-gray-600">Pediatric Surgeon</p>
              </div>
            </div>
            <div className="mb-3" />
            <div className="flex space-x-2">
              <button className="w-full rounded-lg border-2 bg-white px-4 py-2 font-medium text-gray-500">
                Message
              </button>
              <button className="w-full rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white">
                Book
              </button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex max-w-xs flex-col items-center rounded-xl border px-4 py-4 text-center md:max-w-lg md:flex-row md:items-start md:text-left">
          <div className="mb-4 md:mr-6 md:mb-0">
            <img
              alt=""
              className="h-56 rounded-lg object-cover md:w-56"
              src={dr2}
            />
          </div>
          <div>
            <p className="text-xl font-medium text-gray-700">Emma Watson</p>
            <p className="mb-4 text-sm font-medium text-gray-500">Junior Editor</p>
            <div className="flex space-x-2">
              <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                <p className="text-sm font-medium text-gray-500">Articles</p>
                <p className="text-3xl font-medium text-gray-600">20</p>
              </div>
              <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                <p className="text-sm font-medium text-gray-500">Papers</p>
                <p className="text-3xl font-medium text-gray-600">10</p>
              </div>
              <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                <p className="text-sm font-medium text-gray-500">Speciality</p>
                <p className="text-sm font-medium text-gray-600">Pediatric Surgeon</p>
              </div>
            </div>
            <div className="mb-3" />
            <div className="flex space-x-2">
              <button className="w-full rounded-lg border-2 bg-white px-4 py-2 font-medium text-gray-500">
                Message
              </button>
              <button className="w-full rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white">
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doctors;
