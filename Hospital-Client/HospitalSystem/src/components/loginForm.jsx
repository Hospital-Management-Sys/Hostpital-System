import { useState } from "react";
import useAuth from "../hooks/authHook";
import { Checkbox } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/slices/authSlice/authSlice";

const InputField = ({ label, type, id, name }) => (
  <div className="mb-6">
    <label
      htmlFor={id}
      className="block text-2xl font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      className="w-full px-6 py-4 border-4 border-secondary rounded-full focus:outline-none focus:ring-4 focus:ring-orange-500 text-xl"
      required
    />
  </div>
);


const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { handleSubmit, role } = useAuth();
  const dispatch = useDispatch();
  const toggleForm = () => {
    setIsLogin(!isLogin);
    dispatch(setLogin());
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-bubblegum bg-white p-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-4xl border-8 border-primary">
        <h2 className="text-5xl font-bold mb-8 text-center text-primary">
          {isLogin ? "Welcome Back, Friend!" : "Join Our Fun Adventure!"}
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <InputField
                label="Your Awesome Name"
                type="text"
                id="name"
                name="name"
              />
              <InputField
                label="Your Phone number"
                type="text"
                id="number"
                name="number"
              />
              <InputField
                label="Your Record ID"
                type="text"
                id="record"
                name="record"
              />
              <InputField
                label="Your Awesome Picture"
                type="file"
                id="picture"
                name="picture"
              />
            </>
          )}
          <InputField
            label="Magic Email"
            type="email"
            id="email"
            name="email"
          />
          <InputField
            label="Super Secret Code"
            type="password"
            id="password"
            name="password"
          />
          {isLogin ? (
            <div className="flex justify-end items-center gap-5">
              <label htmlFor="">Login as A doctor</label>
              <input
                type="checkbox"
                name="isDoctor"
                id=""
                className="rounded-md"
              />
            </div>
          ) : (
            ""
          )}
          <button
            type="submit"
            className="w-full bg-secondary text-primary text-2xl font-bold py-4 px-8 rounded-full hover:bg-opacity-90 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            {isLogin ? "Start the Adventure!" : "Join the Club!"}
          </button>
        </form>

        {isLogin && (
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-6">
            
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-xl text-gray-600">
          {isLogin
            ? "New to our world? Come play with us!"
            : "Already part of our club?"}
          <button
            onClick={toggleForm}
            className="ml-2 text-primary hover:underline focus:outline-none font-bold"
          >
            {isLogin ? "Sign Up Now!" : "Login Here!"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
