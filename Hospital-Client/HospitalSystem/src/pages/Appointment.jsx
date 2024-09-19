import React from 'react';
import dr1 from '../assets/dr1.jpg'

function Appointment() {
 
    return (
      <div className='w-full'>
        <div className="w-full">
          <div className="relative border-8 border-grayRoot mx-auto mt-20 mb-3 max-w-screen-lg overflow-hidden rounded-t-xl bg-emerald-200/60 py-32 text-center shadow-xl shadow-gray-300">
            <h1 className="mt-2 ml-8 px-8 text-3xl font-bold text-white md:text-5xl">
              Book An Appointment
            </h1>
            <img
              className="absolute top-0 left-0 -z-10 w-[260px] h-[340px] object-cover"
              src={dr1}
              alt="Book Now"
            />
          </div>

          <div className="mx-auto grid max-w-screen-lg px-6 pb-20 border-8 border-grayRoot">
            <form>
              <div>
                <p className="font-serif text-xl font-bold text-blue-900 mt-12">
                  Select a service
                </p>
                <div className="mt-4 grid max-w-3xl gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
                  <div className="relative bg-grayRoot">
                    <input
                      className="peer absolute opacity-0"
                      id="radio_online"
                      type="radio"
                      name="service_type"
                      value="Online"
                    />
                    <label
                      className="flex h-full cursor-pointer flex-col items-center justify-center rounded-lg p-6 shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-emerald-500 hover:text-white peer-checked:bg-emerald-600 peer-checked:text-white"
                      htmlFor="radio_online"
                    >
                      <span className="mt-2 font-medium">On-Line</span>
                    </label>
                  </div>

                  <div className="relative bg-grayRoot">
                    <input
                      className="peer absolute opacity-0"
                      id="radio_onsite"
                      type="radio"
                      name="service_type"
                      value="Onsite"
                    />
                    <label
                      className="flex h-full cursor-pointer flex-col items-center justify-center rounded-lg p-6 shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-emerald-500 hover:text-white peer-checked:bg-emerald-600 peer-checked:text-white"
                      htmlFor="radio_onsite"
                    >
                      <span className="mt-2 font-medium text-emerald-900 peer-checked:text-white">
                        On-Site
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <p className="mt-8 font-serif text-xl font-bold text-blue-900">
                  Select a date
                </p>
                <div className="relative mt-4 w-56">
                  <input
                    type="date"
                    className="block w-full rounded-lg border p-2.5 text-emerald-800"
                  />
                </div>
              </div>

              <div>
                <p className="mt-8 font-serif text-xl font-bold text-blue-900">
                  Select a time
                </p>
                <div className="mt-4 grid grid-cols-4 gap-2 lg:max-w-xl">
                  <button
                    type="button"
                    className="rounded-lg px-4 py-2 font-medium bg-emerald-100 text-emerald-900"
                  >
                    12:00
                  </button>
                  <button
                    type="button"
                    className="rounded-lg px-4 py-2 font-medium bg-emerald-100 text-emerald-900"
                  >
                    14:00
                  </button>
                  <button
                    type="button"
                    className="rounded-lg px-4 py-2 font-medium bg-emerald-100 text-emerald-900"
                  >
                    09:00
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-[25%] bg-greenRoot border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-greenRoot hover:text-white mt-3"
              >
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }


export default Appointment;
