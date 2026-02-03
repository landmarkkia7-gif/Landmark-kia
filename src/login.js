import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import toast from "react-hot-toast";
import { AuthContext } from "./context/AuthContext";
import { auth } from "./lib/firebase";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(email, password);
      const userData = await signInWithEmailAndPassword(auth, email, password);
      console.log("userData: ", userData);
      navigate("/admin/Analytics");
      dispatch({ type: "LOGIN", payload: userData });
    } catch (error) {
      const errorCode = error.code;
      console.log(errorCode);
      if (errorCode === "auth/user-not-found") {
        toast.error("User not found!");
      }
      if (errorCode === "auth/wrong-password") {
        toast.error("Invalid Credentials!");
      }
      if (errorCode === "auth/configuration-not-found") {
        toast.error("Something went wrong!");
      }
      if (errorCode === "auth/too-many-requests") {
        toast.error(
          "Access to this account has been temporarily disabled due to many failed login attempts."
        );
      }
    }
    setLoading(false);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden py-40 max-h-screen bg-no-repeat bg-cover bg-[url('https://static.vecteezy.com/system/resources/thumbnails/011/635/825/small/abstract-square-interface-modern-background-concept-fingerprint-digital-scanning-visual-security-system-authentication-login-vector.jpg')]">
      <div className="container h-full px-4 mx-auto">
        <div className="flex items-center content-center justify-center h-full">
          <div className="w-full px-4 lg:w-4/12">
            <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="flex-auto px-4 py-10 lg:px-10">
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-4">
                    <label
                      className="block mb-1 text-sm font-semibold text-purple-600"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="px-3 py-3 bg-[#f5f8fa] rounded text-sm w-full focus:border focus:border-gray-200 focus:outline-none"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      autoFocus
                    />
                  </div>

                  <div className="relative w-full mb-4">
                    <label
                      className="block mb-1 text-sm font-semibold text-purple-600"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="px-3 py-3  bg-[#f5f8fa] rounded text-sm w-full focus:border focus:border-gray-200 focus:outline-none"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="w-5 h-5 ml-1 text-purple-700 transition-all duration-150 ease-linear border-0 rounded form-checkbox"
                      />
                      <span className="ml-2 text-sm font-semibold text-black">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="mt-6 text-center">
                    <button
                      className="w-full px-6 py-3 mb-1 mr-1 text-sm text-white uppercase transition-all duration-150 ease-linear bg-black rounded shadow outline-none active:bg-purple-600 hover:shadow-lg focus:outline-none"
                      type="submit"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <CgSpinner className="w-5 h-5 mr-2 text-white animate-spin" />
                          Loading...
                        </div>
                      ) : (
                        "sign in"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
