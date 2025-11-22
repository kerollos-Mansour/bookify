import { Form } from "react-router-dom";

export default function Login() {


  return (
    <>
    <div className="flex flex-wrap justify-center gap-15 items-start mt-4 p-6">
      {/* Image Container */}
      <div className="relative w-[520px] h-[380px]">
      <img className=" w-full h-full object-cover rounded-lg" src="./src/assets/why-srilanka3.jpg"/>
      <div className="absolute inset-0 flex bottom-7 items-center justify-center pb-4">
      <p className="bg-blue-800 text-white text-4xl font-bold p-2">Lanka Stay.</p>
      </div>
      </div>
      <div className="w-96">
      <form className="px-8 pt-6 pb-8 mb-4">
        <p className="font-semibold text-3xl mb-5">Login Account</p>
          <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
        </div>
        <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" id="password" placeholder="6+ characters" />
        </div>
        {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
        <p className="text-sm mb-4">By sigining up you agree to <a className="text-blue-600" href="">terms and conditions</a> at zoho</p>
        <button className="bg-blue-700 w-full p-3 text-2xl border rounded text-white">Login</button><br></br>
        <button className="text-black text-2xl w-full mt-3">Create Account</button>
        </form> 
        </div>
    </div>
    </>
  )
}

 
