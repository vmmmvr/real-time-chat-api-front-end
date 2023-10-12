import { AnyAction } from "redux";
import { logoutUserThunk } from "./redux/auth/auth.thunk"
import { useDispatch, useSelector } from "react-redux"
import Navbar from "./pages/components/navbar";
import Home from "./pages/home";
function App() {


  return (
 
 <div  className="bg-slate-50 h-screen">

      <Home />

 </div>
  )
}

export default App
