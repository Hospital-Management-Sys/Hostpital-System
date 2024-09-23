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
              <button
                onClick={() => window.open("http://localhost:3000/auth/google")}
                type="button"
                className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-xl font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path
                      fill="#4285F4"
                      d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                    />
                    <path
                      fill="#34A853"
                      d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                    />
                  </g>
                </svg>
                Login with Google
              </button>
              <InputField
                label="Your record ID for google login"
                type="text"
                id="number"
                name="number"
              />
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
