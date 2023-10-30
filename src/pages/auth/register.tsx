import { useDispatch, useSelector } from "react-redux";
import { Logo } from "../components/icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loading from "../components/loading";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { registerThunk } from "../../redux/auth/auth.thunk";
import { AnyAction } from "redux";
import useFilePreview from "@/hooks/useimage";
import ImageUploader from "@/components/image-uplaoder";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  
    watch
  } = useForm();
  const dispatch = useDispatch();
  const status = useSelector((state: any) => state.auth.status);
  const user = useSelector((state: any) => state.auth.user);

  const File = watch(["image"]);
   const image =  File[0];
  const [filePreview] = useFilePreview(image);
  
  useEffect(() => {
    return () => {};
  }, [user]);

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <>
    { (
    
              <div className=" mx-3  px-5 py-7 rounded-lg bg-white h-full items-center  justify-between w-full sm:w-[40%]  flex flex-col">
              <Logo title="Chat IO" classes="font-semibold" size={40} />

              {
                status === "loading" ? (
                  <div>
                    {" "}
                    <Loading />
                  </div>
                ) : <div className="flex flex-col max-w-sm">
                <p className="my-3 font-semibold">Register</p> 
                <p  className="my-5 text-gray-700"> Inter your Data, and become a member</p>
              <form  encType="multipart/form-data"
                className=""
                onSubmit={handleSubmit(
                  async (
                    data 
                  ) => 
                
                  
                    Promise.resolve(
                      dispatch(registerThunk({ ...data }) as unknown as AnyAction)
                    ).then(({ payload }) => {
                      console.log(payload)
                      if(payload.uuid) {
                        
                        setTimeout(() => navigate('/auth/login'), 500)

                      }

                  
                    }).catch(err => { console.log(err);
                    })
                )}
              >

                <div className="mb-5 w-full flex justify-center flex-col items-center">
            
                      <div>
                        <img src={filePreview} alt="" className="w-32 h-32 rounded-full" />
                      </div>
  
              <ImageUploader  children={<input id="dropzone-file" type="file"  {...register("image")} className="hidden" />}  />

                </div>

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

              }
                  

                <div><span>back</span></div>
            </div>
         
 
    )}
  </>
  )
}
