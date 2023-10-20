import { useDispatch, useSelector } from "react-redux";
import { Logo } from "../components/icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loading from "../components/loading";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { registerThunk } from "../../redux/auth/auth.thunk";
import { AnyAction } from "redux";

export default function Register() {
  const navigate = useNavigate();
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
    <>
    {status === "loading" ? (
      <div>
        {" "}
        <Loading />
      </div>
    ) : (
    
              <div className=" mx-3  px-5 py-7 rounded-lg bg-white h-full items-center  justify-between w-full sm:w-[40%]  flex flex-col">
              <Logo title="Chat IO" classes="font-semibold" size={40} />
                  <div className="flex flex-col max-w-sm">
                      <p className="my-3 font-semibold">Register</p> 
                      <p  className="my-5 text-gray-700"> Inter your Data, and become a member</p>
                    <form
                      className=""
                      onSubmit={handleSubmit(
                        async (
                          data 
                        ) => 
                        
                          Promise.resolve(
                            dispatch(registerThunk({ ...data }) as unknown as AnyAction)
                          ).then(({ payload }) => {
                            console.log(payload)
                          navigate('/auth/login')

                        
                          })
                      )}
                    >
                      <div className="flex flex-col mb-5 ">
                        <label className="text-gray-700 font-semibold mb-1" htmlFor="email">
                         Name
                        </label>
                        <input
                          {...register("name", { required: true })}
                          placeholder="Name"
                          type="text
                          "
                          className="input-style " 

                        />
                        <small className="text-red-500">
                          {" "}
                          {errors.name?.type === "required" &&
                            "name is required"}{" "}
                        </small>
                        <i className="bx bxl-flask"></i>
                      </div>
                      
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
                        Register
                      </button>

                      <div className="mt-5 text-sm">
                            <div className="flex flex-row">
                            <p>You allready have an account ?</p>
                              <Link to={"/auth/login"}>
                                <p className="text-primary font-semibold mx-2"> Login</p>
                                  
                              </Link>
                            </div>
                            <div>
                             
                            </div>
                      </div>
                    </form>
                    <div>
                    </div>
                  </div>


                <div><span>back</span></div>
            </div>
         
 
    )}
  </>
  )
}
