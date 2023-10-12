 
import {useEffect, useRef, useState} from 'react'
import {  useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { getUserThunk } from '../../redux/auth/auth.thunk';
import { AnyAction } from 'redux';

export default function AuthRoute({
    children,
  }: {
    children?: React.ReactElement;
  }) {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.auth.user);
    const status = useSelector((state: any) => state.auth.status);
    const accessToken = useSelector((state: any) => state.auth.accessToken);
    const refreshToken = useSelector((state: any) => state.auth.refreshToken);
  
    const count = useRef(0);
  

    useEffect(() => {
    if(count.current === 0){
      
     !user && dispatch(getUserThunk({accessToken, refreshToken}) as unknown as AnyAction)
    
    
  }
      return () => {
        count.current = 1;
      }
    }, [])
    
        
    if(!user || user === null) {
        if(status === "loading") {
          return <><h1> LOADING...</h1></>
        }
          return <Navigate to="/auth/login" />; 
    }

  return (
  <>
  {
    children
  }
  </>
  )
}
