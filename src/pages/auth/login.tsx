import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { loginThunk, getUserThunk } from "../../redux/auth/auth.thunk";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { AnyAction } from "redux";
import Loading from "../components/loading";
import ErrorMessage from "../components/error";
import girlsvg from "../../assets/Girl-Workplace.svg";

export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const status = useSelector((state: any) => state.auth.status);
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    return () => {};
  }, [user]);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full h-full ">
      {status === "loading" ? (
        <div>
          {" "}
          <Loading />{" "}
        </div>
      ) : (
        <div className="flex flex-col w-full items-center sm:flex-row h-full">
          <div className=" mx-3  px-5 py-7 rounded-lg bg-white h-full items-center  justify-between w-full sm:w-[40%]  flex flex-col">
              <div>
                <span className="text-primary font-semibold">Chat IO</span>
              </div>
              <div className="flex flex-col max-w-sm">
                  <p className="my-3 font-semibold">Login</p> 
                  <p  className="my-5 text-gray-700"> with your Data that you entered during your  
                  Registration</p>
                <form
                  className=""
                  onSubmit={handleSubmit(
                    async (
                      data // if(data['email'] !== null && data['password'] !== null) {
                    ) =>
                      Promise.resolve(
                        dispatch(loginThunk({ ...data }) as unknown as AnyAction)
                      ).then(({ payload }) => {
                        dispatch(
                          getUserThunk({ ...payload }) as unknown as AnyAction
                        );
                      })
                  )}
                >
                  <div className="flex flex-col mb-5 ">
                    <label className="text-gray-700 font-semibold mb-1" htmlFor="email">
                      Email
                    </label>
                    <input
                      {...register("email", { required: true })}
                      placeholder="Email"
                      type="email"
                      className="input-style "
                    />
                    <small className="text-red-500">
                      {" "}
                      {errors.email?.type === "required" &&
                        "email is required"}{" "}
                    </small>
                    <i className="bx bxl-flask"></i>
                  </div>
                  <div className="flex flex-col mb-5">
                    <label className="text-gray-700 font-semibold  mb-1" htmlFor="email">
                      Password
                    </label>
                    <input
                      {...register("password", { required: true })}
                      placeholder=""
                      type="password"
                      className="input-style   "
                    />
                    <small className="text-red-500">
                      {" "}
                      {errors.password?.type === "required" &&
                        "password is required"}{" "}
                    </small>
                  </div>

                  <button
                    className="button-style"
                    type="submit"
                  >
                    login
                  </button>

                  <div className="mt-5 text-sm">
                        <div className="flex flex-row">
                        <p>Don't have account yet ?</p>
                          <Link to={"/auth/register"}>
                            <p className="text-primary font-semibold mx-2"> Register</p>
                              
                          </Link>
                        </div>
                        <div>
                          <Link to={"/auth/register"}>
                            <p> Forgot password</p>
                              
                          </Link>
                        </div>
                  </div>
                </form>
                <div>
                </div>
              </div>


            <div><span>back</span></div>
        </div>
        <div className="bg-primary w-full sm:w-[60%]  h-full flex items-center justify-center">
          <img src={girlsvg}  alt="" />
        </div>
        </div>
      )}
    </div>
  );
}
