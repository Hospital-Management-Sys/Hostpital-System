import React from 'react';

function DropDown({ onSelect }) {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onSelect(selectedValue); // Call the onSelect prop with the selected value
  };

  return (
    <select onChange={handleChange} className="w-full p-2.5 text-gray-700 bg-white border rounded-md">
      <option value="">Select Specialization</option>
      <option value="Cardiology">Cardiology</option>
      <option value="Neurology">Neurology</option>
      <option value="Orthopedics">Orthopedics</option>
      {/* Add more specializations as needed */}
    </select>
  );
}

export default DropDown;
