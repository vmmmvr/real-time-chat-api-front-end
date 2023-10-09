import { AnyAction } from "redux";
import { logoutUserThunk } from "./redux/auth/auth.thunk"
import { useDispatch, useSelector } from "react-redux"
import Navbar from "./pages/components/navbar";
import Home from "./pages/home";
function App() {

  const accessToken = useSelector((state: any) => state.auth.accessToken);
  const refreshToken = useSelector((state: any) => state.auth.refreshToken);
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(logoutUserThunk({accessToken, refreshToken}) as unknown as AnyAction)
  }
  return (
 
 <div  className="bg-slate-50 h-screen">
          <button onClick={() => handleClick()} type="button" className="bg-primary text-white rounded-md px-3 py-1 mx-3"> Logout</button>

      <Home />

 </div>
  )
}

export default App
