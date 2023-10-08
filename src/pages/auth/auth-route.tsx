 
import {useEffect} from 'react'
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
    const accessToken = useSelector((state: any) => state.auth.accessToken);
    const refreshToken = useSelector((state: any) => state.auth.refreshToken);
  
    
    useEffect(() => {   
    dispatch(getUserThunk({accessToken, refreshToken}) as unknown as AnyAction)
    
      return () => {
        
      }
    })

    
        
    if(!user || user === null) {
          return <Navigate to="/auth" />; 
    }

  return (
  <>
  {
    children
  }
  </>
  )
}
