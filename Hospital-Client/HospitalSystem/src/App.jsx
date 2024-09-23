import { Provider } from "react-redux";
import store from "./redux/store/store";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// admin imports

import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import ManageUsers from "./components/admin/ManageUsers";
import ManagePatients from "./components/admin/ManagePatients";
import ManageDoctors from "./components/admin/ManageDoctors";
import ManageAppointments from "./components/admin/ManageAppointments";
import ViewFeedback from "./components/admin/ViewFeedback";
import ManagePayments from "./components/admin/ManagePayments";
import ManageAvailableHours from "./components/admin/ManageAvailableHours";
import ManageDoctorSchedules from "./components/admin/ManageDoctorSchedules";
import Navbar from "./layouts/navbar"; // Adjust path as needed
import HomePage from "./pages/home";
import Footer from "./layouts/footer";
import Doctors from "./pages/Doctors";
import Appointment from "./pages/Appointment";
import AppointmentCalendar from "./pages/AppointmentCalendar";
import FindDrs from "./pages/FindDrs";
import DoctorProfile from "./components/doctorprofile";
import AboutUsSection from "./pages/about";
import Booking from "./pages/Booking";
import LoginForm from "./components/loginForm";
import UserProfile from "./pages/userProfile/userProfile";
import ContactForm from "./components/contactus";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/FindDrs" element={<FindDrs />} />
          <Route path="/Doctors" element={<Doctors />} />
          <Route path="/Appointment" element={<Appointment />} />
          <Route
            path="/AppointmentCalendar"
            element={<AppointmentCalendar />}
          />
          <Route path="/doctorP" element={<DoctorProfile />} />
          <Route path="/about" element={<AboutUsSection />} />

          <Route path="/Appointment" element={<Appointment />} />
          <Route
            path="/AppointmentCalendar"
            element={<AppointmentCalendar />}
          />

          <Route path="/login" element={<LoginForm />} />
          <Route path="/contact-us" element={<ContactForm />} />
          {/* Admin Routes */}
          <Route path="/admin/AdminLogin" element={<AdminLogin />} />
          <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/admin/ManageUsers" element={<ManageUsers />} />
          <Route path="/admin/ManagePatients" element={<ManagePatients />} />
          <Route path="/admin/ManageDoctors" element={<ManageDoctors />} />
          <Route
            path="/admin/ManageAppointments"
            element={<ManageAppointments />}
          />
          <Route path="/admin/ViewFeedback" element={<ViewFeedback />} />
          <Route path="/admin/ManagePayments" element={<ManagePayments />} />
          <Route
            path="/admin/ManageAvailableHours"
            element={<ManageAvailableHours />}
          />
          <Route
            path="/admin/ManageDoctorSchedules"
            element={<ManageDoctorSchedules />}
          />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
