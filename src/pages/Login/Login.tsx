import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Inputs = {
  userName: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-15 items-start mt-4 p-6">
        {/* Image Container */}
        <div className="relative w-[520px] h-[380px]">
          <img
            className=" w-full h-full object-cover rounded-lg"
            src="./src/assets/why-srilanka3.jpg"
          />
          <div className="absolute inset-0 flex bottom-7 items-center justify-center pb-4">
            <p className="bg-blue-800 text-white text-4xl font-bold p-2">
              Start travling today.
            </p>
          </div>
        </div>
        <div className="w-96">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-8 pt-6 pb-8 mb-4"
          >
            <p className="font-semibold text-3xl mb-5">Login Account</p>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                {...register("userName", { required: true })}
                className="border border-gray-300 rounded-md  transition-all duration-150 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="username"
                type="text"
                placeholder="Username"
              />
              {errors.userName && <span>This field is required</span>}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                {...register("password", { required: true, min: 6, max: 16 })}
                className="border border-gray-300 rounded-md  transition-all duration-150 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                id="password"
                placeholder="6+ characters"
              />
              {errors.password && <span>This field is required</span>}
            </div>
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
            <p className="text-sm mb-4">
              By sigining up you agree to{" "}
              <a className="text-blue-600" href="">
                terms and conditions
              </a>{" "}
              at zoho
            </p>
            <button
              type="submit"
              className="bg-blue-700 w-full p-3 text-2xl border rounded cursor-pointer text-white hover:bg-blue-800"
            >
              Login
            </button>
            <br></br>
            <button
              onClick={() => navigate("/SignUp")}
              className="text-black text-2xl w-full mt-3 cursor-pointer hover:text-blue-800"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
