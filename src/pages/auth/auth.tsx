import { useEffect } from 'react'
import Login from './login'
import { useDispatch, useSelector } from 'react-redux';
import { getUserThunk } from '../../redux/auth/auth.thunk';
import { Navigate } from 'react-router-dom';
import { AnyAction } from 'redux';

export default function Auth() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: any) => state.auth.accessToken);
  const refreshToken = useSelector((state: any) => state.auth.refreshToken);

  useEffect(() => {   
    dispatch(getUserThunk({accessToken, refreshToken}) as unknown as AnyAction)
    

  return () => {
    
  }
})

  const user = useSelector((state: any) => state.auth.user);
  const status = useSelector((state: any) => state.auth.status);
     
       
if(user) {
  return <Navigate to="/" />; 
}

  return (
   <div className='w-full bg-slate-50 h-screen'>
    {
      status === "loading" ?? "idle" ?
        <div className='w-full h-full flex justify-center items-center'>
           <h1>LOADING...</h1> 
        </div>
      
      :    <Login />  }
     
   </div>
  )
}
