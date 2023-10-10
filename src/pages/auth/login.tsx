import {useEffect} from "react";
import { useForm } from "react-hook-form";
import { loginThunk,getUserThunk } from "../../redux/auth/auth.thunk";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AnyAction } from "redux";


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
      status === 'loading' ? <div> LOADING...</div> : <form className="md:w-1/4 md:p-0 p-4 w-full flex flex-col" onSubmit={handleSubmit(async (data) => // if(data['email'] !== null && data['password'] !== null) {
      Promise.resolve(dispatch(loginThunk({ ...data })  as unknown as AnyAction)).then(({ payload }) => {
        dispatch(getUserThunk({ ...payload })  as unknown as AnyAction);
     
      }))}>
      
            <div className="flex flex-col mb-5">
              <label className="text-gray-500 mb-1" htmlFor="email">enter your email:</label>
              <input {...register("email", {required: true})} placeholder="Email" type="email" 
              className="ring-1 ring-secondary text-gray-600   rounded-md px-3 py-1 focus:ring-1 focus:ring-secondary outline-0   " />
                <small className="text-red-500">  {errors.email?.type === 'required' && "email is required"} </small>
            
            </div>  
            <div className="flex flex-col mb-5">
              <label className="text-gray-500 mb-1" htmlFor="email">Password :</label>
              <input {...register("password",  {required: true})} placeholder="" type="password" className="ring-1 ring-secondary text-gray-600   rounded-md px-3 py-1 focus:ring-1 focus:ring-secondary outline-0   " />
                <small className="text-red-500">  {errors.password?.type === 'required' && "password is required"} </small>     
            </div>  
          
            <button className="bg-primary px-5 py-2 text-white text-sm rounded-md" type="submit">login</button>
          </form>
     }

    </div>
  )
}
