
import {
    LoginLink,
    LogoutLink,
    RegisterLink,
  } from "@kinde-oss/kinde-auth-nextjs/components";
const Login = () => {
  return (
    <div className=" flex flex-row">
        <div className=" w-1/2 h-screen">
          <img src="/login.png" alt="Your Name" />
        </div>
        <div className=" w-1/2 h-screen bg-[#FCFCFC] flex flex-col items-center ">
          <h1 className=" text-2xl font-bold mt-1">Welcome to Repl</h1>
          <div className=" flex flex-col justify-center items-center w-full h-screen">
            <h1 className=" font-medium mb-4">Create a repl account</h1>
            <div className=" mb-3 w-[58%] h-[5.5%] bg-[#D3D1CF] rounded-md flex justify-center items-center cursor-pointer hover:scale-105 hover:translate-all">
              <RegisterLink className=" w-full flex justify-center items-center">Register</RegisterLink>
            </div>
            <div className=" w-[58%] h-[5.5%] bg-[#D3D1CF] rounded-md flex justify-center items-center cursor-pointer hover:scale-105 hover:translate-all">
              <LoginLink className=" w-full flex justify-center items-center">Login</LoginLink>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Login