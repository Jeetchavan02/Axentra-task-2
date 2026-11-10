import { useEffect, useState, useRef } from "react";

import axios from "axios";
// import { BsGoogle } from "react-icons/bs";
import { removeToken, setToken } from "@src/auth/auth";
import { useNavigate } from "react-router-dom";
// import { ArrowBigLeft, Check, ChevronsLeft, Eye, EyeOff, StepBack } from "lucide-react";

// below imports for icons are from my file
import { Eye, EyeOff, ArrowBigLeft } from "lucide-react";
// import { FaApple } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


export default function LoginPage() {
  /* ------------ hooks ------------ */
  
  const navigate = useNavigate();
  // module context part

  /* ------------ state ------------ */
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password] = useState("");
  const [step, setStep] = useState<
    | "email"
    | "login"
    | "register"
    | "reset-email"
    | "code"
    | "new-password"
    | "success"
  >("email");
  const [showPassword, setShowPassword] = useState(false);
  //reset password
  // const [verificationCode, setVerificationCode] = useState('');

  /* password rules (spaces excluded from length) */
  // const trimmedPwd = password.replace(/\s/g, '');
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [, setIsValidLength] = useState(false);
  const [, setIsPasswordValid] = useState(false);
  // const [hasSpaces, setHasSpaces] = useState(false);

  // below are new variables created for the user registration page

  const [isDropdownOpen] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const inputClasses =
    "w-full h-[8vh] rounded-lg border border-gray-300 bg-white p-4 text-base text-zinc-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200";

  // For text links like "Change", "Forgot Password?"
  const linkTextClasses = "text-sm font-medium text-black hover:underline";


  useEffect(() => {
    // This function runs when the `isDropdownOpen` state changes.

    if (isDropdownOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDropdownOpen]);

  /* ------------ effects ------------ */
  useEffect(() => {
    setHasUpperCase(/[A-Z]/.test(password));
    setHasLowerCase(/[a-z]/.test(password));
    setHasNumber(/[0-9]/.test(password));
    setHasSpecialChar(/[!@#$%^&*()\-_=+\[\]{}|;:'",.<>/?]/.test(password));
    setIsValidLength(password.length >= 8 && password.length <= 18);
    setIsPasswordValid(
      hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSpecialChar &&
        (password.length >= 8 && password.length <= 18)
    );
  }, [password]);



  /* ------------ API calls ------------ */
  const handleEmailCheck = async () => {
    if (!email) {
    //   toast("Email Required", "Enter a valid email address.", "error");
      return;
    }


    setIsLoading(true);
    try {
      // const { data } = await axios.post("http://localhost:8000/merchant/check_validation/", { email });
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/auth_user/check_user/?email=${email}`,
      );
      const exists = data?.data?.exists;
      if (exists === true) {
        // Email exists → LOGIN
        setStep("login");
       
      } else if (exists === false) {
        // Email does not exist → REGISTER
        setStep("register");
       
      } else {
        // Safety fallback (unexpected response shape)
        // toast("Error", "Unable to verify email. Please try again.", "error");
      }
    } catch (err: any) {
      if (err?.response?.status === 404) {
        // email does not exist
        setStep("register");
       
      } else {
        
      }
    } finally {
      setIsLoading(false);
    }
  };

  // below function is for Enter key press
  const handleKeyPress = (event: React.KeyboardEvent) => {
    // Check if the key pressed was 'Enter'
    if (event.key === "Enter") {
      // Prevent the default form submission behavior if this input is inside a <form> tag
      event.preventDefault();
      handleEmailCheck();
    }
  };

 

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // const actualPassword = passwordRef.current?.value || password;
      const actualPassword = passwordRef.current?.value || passwordRef.current?.defaultValue || password;

      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", actualPassword);

      const { data } = await axios.post(
        `http://localhost:8000/api/v1/auth_user/login/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

     
      console.log("Data", data);
      console.log("ddfsdfvsdvfd", data?.data?.token);
      console.log("ddfsdfvsdvfd", data?.data?.token?.access);
      if (data?.data?.token) {
        setToken(JSON.stringify(data.data.token), data?.data?.app ?? "");
      }
      // Store outlet list
      const outlets = data?.data?.all_outlets?.outlets || [];

      if (outlets.length > 0) {
        localStorage.setItem("outletList", JSON.stringify(outlets));
      }
     
      const customData = JSON.stringify({
        app: data.data.app,
        user: data?.data?.user,
        outlet_details: {
          ...data?.data?.outlet_details,
          outlet_id: data?.outlet_id,
        },
        apiKey: data.data.outlet_details?.api_key,
        member_profile: data?.data?.member_profile,
        user_role: data.data.member_profile?.user_position,
        user_status: data.data.member_profile?.status,
        super_user: "",
        multi_user_key: "",
        web_url: data?.data?.outlet_details?.web_url || "",
      });
      console.log("Data for custom data", customData);

      // setUserPermissions(customData);
      localStorage.setItem("userPermission", customData);
      
      navigate("/");
    } catch (err: any) {
      console.error(err);
      removeToken();
     
    } finally {
      setIsLoading(false);
    }
  };



  /* ------------ render ------------ */
  return (
    <>
   
      <div className="w-full min-h-auto md:h-[80vh] bg-gray-200 flex items-start justify-center p-4">
        <div className="w-[90vw] h-auto md:h-[76vh] flex flex-col lg:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Left card */}
          <div className="w-full  p-8 md:p-10 flex flex-col justify-center">
            <div className="w-full mx-auto">
              <div className="mb-4 text-center">
                <h2 className="text-3xl lg:text-5xl text-left font-extrabold uppercase text-zinc-900 font-intertight">
                  {step === "email" && "Welcome"}
                  {step === "login" && "Welcome Back"}
                 
                </h2>
                <p className="text-lg text-gray-600 text-left leading-relaxed font-intertight mb-6">
                  {step === "email" && "Enter your email to get started."}
                  {step === "login" &&
                    "Sign in with your password to access your account."}
                  
                </p>
              </div>

              {/* --- Render correct step based on state --- */}

              {step === "email" && (
                <div className="w-full mx-auto space-y-6">
                  <div className="h-[8vh] flex items-center border border-zinc-300 rounded-lg overflow-hidden bg-white">
                    <div className="flex items-center px-4 border-r border-zinc-300">
                      <MdEmail size={30} className="text-zinc-500" />
                    </div>
                    {/* below is vertical line */}
                    {/* <div className="h-[60%] w-px bg-zinc-300"></div> */}
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Email"
                      className="flex-1 px-4 outline-none text-zinc-900 h-full"
                    />
                  </div>

                  <button
                    onClick={handleEmailCheck}
                    disabled={isLoading}
                    className="w-full p-6 h-[8vh] rounded-lg bg-zinc-900 text-white font-semibold text-base cursor-pointer flex items-center justify-center hover:bg-zinc-700 disabled:opacity-50"
                    style={{ fontFamily: '"Inter Tight", sans-serif' }}
                  >
                    {isLoading ? "Checking…" : "Continue"}
                  </button>
                  <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-zinc-300"></div>
                    <span className="mx-4 text-sm text-zinc-500 uppercase font-medium">
                      or
                    </span>
                    <div className="flex-grow h-px bg-zinc-300"></div>
                  </div>

                </div>
              )}

              {step === "login" && (
                <div className="w-full mx-auto space-y-6">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleLogin();
                    }}
                    className="w-full mx-auto space-y-6"
                  >
                    <div>
                      <label className="uppercase font-semibold text-lg text-gray-600 mb-2 block">
                        Enter Password
                      </label>
                      <div className="relative">
                        <input
                          ref={passwordRef}
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          // value={password}
                          // onChange={(e) => setPassword(e.target.value)}
                          // onKeyDown={handleLoginOnEnter}
                          placeholder="Enter your password"
                          className={inputClasses}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => !p)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600"
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>

                    </div>
                    <button
                      type="submit"
                      // onClick={handleLogin}
                      disabled={isLoading}
                      className="w-full p-6 rounded-lg bg-zinc-900 text-white font-semibold text-base cursor-pointer hover:bg-zinc-700 disabled:opacity-50"
                    >
                      {isLoading ? "Logging in…" : "Sign In With Password"}
                    </button>
                  </form>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setStep("email")}
                      className={`${linkTextClasses} flex items-center gap-1`}
                    >
                      <ArrowBigLeft size={25} />
                      <span>Back</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right image */}
        
        </div>
      </div>

    </>
  );
}