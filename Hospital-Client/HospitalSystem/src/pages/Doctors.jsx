import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // For accessing URL parameters
import dr1 from '../assets/dr1.jpg'; 
import dr2 from '../assets/dr2.jpg'; 
import axios from 'axios';
import {Link } from "react-router-dom";

function Doctors() {
  const [doctors, setDoctors] = useState([]); 
  const location = useLocation(); // To get the current URL and query params
  const queryParams = new URLSearchParams(location.search); // Extract query params from URL
  const specialization = queryParams.get('specialization'); // Get the specialization from the URL

  useEffect(() => {
    // Fetch doctors based on specialization when the component loads or specialization changes
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/drs?specialization=${specialization}`);
        setDoctors(response.data); 
         
        // Store the fetched doctors in state
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    if (specialization) {
      fetchDoctors(); // Fetch doctors only if a specialization is provided
    }
  }, [specialization]); // Dependency on specialization, refetch when it changes

  return (
    <div className="mx-auto my-10 max-w-screen-lg">
      <h1 className="text-2xl font-bold text-center mb-8">Doctors specializing in {specialization}</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div
              key={doctor.id} // Replace with actual doctor ID from database
              className="flex max-w-xs flex-col items-center rounded-xl border px-4 py-4 text-center md:max-w-lg md:flex-row md:items-start md:text-left"
            >
              <div className="mb-4 md:mr-6 md:mb-0">
                <img
                  alt={doctor.name}
                  className="h-56 rounded-lg object-cover md:w-56"
                  src={doctor.image || dr1} // Replace with actual doctor image
                />
              </div>
              <div>
                <p className="text-xl font-medium text-gray-700">{doctor.name}</p>
                <p className="mb-4 text-sm font-medium text-gray-500">{doctor.title}</p>
                <div className="flex space-x-2">
                  <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                    <p className="text-sm font-medium text-gray-500">years of experience</p>
                    <p className="text-3xl font-medium text-gray-600">{doctor.years_of_experience}</p>
                  </div>
                  <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                    <p className="text-sm font-medium text-gray-500">specialization</p>
                    <p className="text-2xl font-bold text-gray-600">{doctor.specialization}</p>
                  </div>
                  <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                    <p className="text-lg font-medium text-gray-500">Articles</p>
                    <p className="text-2xl font-bold text-gray-600">{3}</p>
                  </div>
                </div>
                <div className="mb-3" />
                <div className="flex space-x-2">
                  <button className="w-full rounded-lg border-2 bg-white px-4 py-2 font-medium text-gray-500">
                    Message
                  </button>
                  <button className="w-full rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white">
                    <Link to="/Appointment">
                    Book
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No doctors found for this specialization.</p>
        )}
      </div>
    </div>
  );
}

export default Doctors;
