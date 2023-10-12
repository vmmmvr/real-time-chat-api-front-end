import { useEffect } from 'react'
import Login from './login'
import { useDispatch, useSelector } from 'react-redux';
import { getUserThunk } from '../../redux/auth/auth.thunk';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AnyAction } from 'redux';
import Loading from '../components/loading';
import Register from './register';
import ErrorMessage from '../components/error';

export default function Auth() {


  const user = useSelector((state: any) => state.auth.user);
  const status = useSelector((state: any) => state.auth.status);
     
       
if(user) {
  return <Navigate to="/" />; 
}



  return (
   <div className='w-full bg-slate-50 h-screen'>
        <ErrorMessage  />
    {
      status === "loading"  ?
        <div className='w-full h-full flex justify-center items-center'>
           <Loading /> 
        </div>
      
      : 
       ( <Routes>
      <Route path='/login' element={ <Login /> } />
      <Route path='/register' element={   <Register />  } />
    </Routes> )
      
      
      }
     
   </div>
  )
}
