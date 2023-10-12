import { useDispatch, useSelector } from "react-redux"
import { logoutUserThunk } from "../../redux/auth/auth.thunk";
import { AnyAction } from "redux";

export default function Navbar() {
  const {accessToken, refreshToken} = useSelector((state: any) => state.auth);


  const dispatch = useDispatch();
  function handleClick() {
    dispatch(logoutUserThunk({accessToken, refreshToken}) as unknown as AnyAction)
  }
const {user} = useSelector((state: any) => state.auth);
  return (
    <div className="flex flex-col sm:flex-row justify-between px-5 py-2 items-center border-b">
        <span className="text-gray-700 cursor-pointer">ChatIO</span>
        <div className="flex flex-row cursor-pointer">
          <img className="w-10 rounded-full" src="/avatar.svg" alt="pfp"/>

          <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-600">  {user.name} </span>
          <span className="text-primary font-normal text-sm">Online</span>

        </div>
        <button onClick={() => handleClick()} type="button" className="bg-primary text-white rounded-md px-3 py-1 mx-3"> Logout</button>

        </div>
      
    </div>
  )
}

