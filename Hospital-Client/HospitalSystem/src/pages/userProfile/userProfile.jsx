import { useState } from "react";
import img from "../../assets/20.jpg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserData,
  updateUserData,
} from "../../redux/thunks/authThunks/authThunk";
import { Card, CardBody, CardFooter, Button } from "@material-tailwind/react";
import axios from "../../api/axios";
const TabButton = ({ active, onClick, children, icon }) => (
  <button
    className={`px-4 py-2 font-semibold transition-all duration-300 flex items-center ${
      active
        ? "bg-white text-blue-600 border-b-2 border-blue-600"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{children}</span>
  </button>
);

const InputField = ({ label, id, type = "text", value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);

const UserProfile = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, date: "2024-09-25", time: "10:00 AM", doctor: "Dr. John Doe" },
    { id: 2, date: "2024-09-27", time: "2:30 PM", doctor: "Dr. Jane Smith" },
    { id: 3, date: "2024-09-30", time: "11:15 AM", doctor: "Dr. Mike Johnson" },
  ]);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);
  const [activeTab, setActiveTab] = useState("personal-information");
  const [patientName, setPatientName] = useState(userData.name);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [patientEmail, setPatientEmail] = useState(userData.email);
  const [currentPassword, setCurrent] = useState("");
  const [phone, setPhone] = useState(userData.phone);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const userDataUpdated = new FormData();
    userDataUpdated.append("name", patientName);
    userDataUpdated.append("phone", phone);
    userDataUpdated.append("email", patientEmail);
    userDataUpdated.append("password", userData.password);
    userDataUpdated.append("currentPassword", currentPassword);
    userDataUpdated.append("newPassword", newPassword);

    dispatch(updateUserData(userDataUpdated));
  };

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal-information":
        return (
          <form onSubmit={handleSubmit}>
            <InputField
              label="Patient Name"
              id="patientName"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
            <div className="mb-4">
              <InputField
                label="Email"
                id="patientName"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <InputField
                label="Phone-Number"
                id="patientName"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <InputField
                label="Current Password"
                id="patientName"
                onChange={(e) => setCurrent(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <InputField
                label="New Password"
                id="patientName"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
            >
              Update Personal Information
            </button>
          </form>
        );
      case "appointments":
        return (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardBody className="pt-6">
                  <p className="font-bold">{appointment.doctor}</p>
                  <p>Date: {appointment.date}</p>
                  <p>Time: {appointment.time}</p>
                </CardBody>
                <CardFooter>
                  <Button variant="filled" className="bg-red">
                    Cancel Appointment
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        );
      case "Record":
        return <></>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white mt-10 rounded-3xl shadow-lg">
      <div className="mb-8 p-6 text-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-2xl">
        <img
          src={img}
          alt="Dr. Jane Smith"
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
        />
        <h1 className="text-4xl font-bold text-blue-800 mb-2">
          {userData.name}
        </h1>
      </div>

      <div className="mb-6 flex justify-center bg-gray-100 rounded-full p-1">
        <TabButton
          active={activeTab === "personal-information"}
          onClick={() => setActiveTab("personal-information")}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            </svg>
          }
        >
          Personal-information
        </TabButton>
        <TabButton
          active={activeTab === "appointments"}
          onClick={() => setActiveTab("appointments")}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 9V2H4v7H3v1h7V9z" />
            </svg>
          }
        >
          Appointments
        </TabButton>
        <TabButton
          active={activeTab === "Record"}
          onClick={() => setActiveTab("Record")}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 4a1 1 0 000 2h14a1 1 0 100-2H3z" />
            </svg>
          }
        >
          Record
        </TabButton>
      </div>

      <div>{renderTabContent()}</div>
    </div>
  );
};

export default UserProfile;
