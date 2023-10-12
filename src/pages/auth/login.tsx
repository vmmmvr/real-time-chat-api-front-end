import {useEffect} from "react";
import { useForm } from "react-hook-form";
import { loginThunk,getUserThunk } from "../../redux/auth/auth.thunk";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { AnyAction } from "redux";
import Loading from "../components/loading";
import ErrorMessage from "../components/error";


export default function Login() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const status = useSelector((state: any) => state.auth.status);
  const user = useSelector((state:any) => state.auth.user);
  
  useEffect(() => {
    
     
    return () => {
      
    }
  }, [user])
  
 
  
  if(user) {
    return <Navigate to="/" />; 

  }
  
  
  return (
    <div className="w-full h-full flex justify-center items-center">
     {
      status === 'loading' ? <div> <Loading /> </div> : 
      <div className="md:w-1/3 lg:mx-3 mx-3  px-5 py-7 rounded-lg bg-white shadow-md w-full  flex flex-col">
        <h3 className="text-3xl my-5 text-primary">Sing in & Enjoy <br />  our features </h3>
     <form className="" onSubmit={handleSubmit(async (data) => // if(data['email'] !== null && data['password'] !== null) {
      Promise.resolve(dispatch(loginThunk({ ...data })  as unknown as AnyAction)).then(({ payload }) => {
        dispatch(getUserThunk({ ...payload })  as unknown as AnyAction);
     
      }))}>
      
            <div className="flex flex-col mb-5 ">
              <label className="text-gray-500 mb-1" htmlFor="email">enter your email:</label>
              <input {...register("email", {required: true})} placeholder="Email" type="email" 
              className="ring-1 ring-secondary text-gray-800 font-thin   rounded-md px-3 py-2 focus:ring-1 focus:ring-secondary outline-0   " />
                <small className="text-red-500">  {errors.email?.type === 'required' && "email is required"} </small>
            
            </div>  
            <div className="flex flex-col mb-5">
              <label className="text-gray-500 mb-1" htmlFor="email">Password :</label>
              <input {...register("password",  {required: true})} placeholder="" type="password" 
              className="ring-1 ring-secondary text-gray-800 font-thin  rounded-md px-3 py-2 focus:ring-1 focus:ring-secondary outline-0   " />
                <small className="text-red-500">  {errors.password?.type === 'required' && "password is required"} </small>     
            </div>  
          
            <button className="bg-primary w-full px-5 py-3 text-white  rounded-lg" type="submit">login</button>

            <div className="mt-5">
             <Link to={"/auth/register"}>
             <div className="bg-white text-center cursor-pointer text-primary border border-primary border-spacing-2 px-4 py-3 rounded-lg">Register</div>
             </Link> 
            </div>
          </form>
      </div>
 
     }

    </div>
  )
}
