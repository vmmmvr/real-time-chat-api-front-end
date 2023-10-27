import { BiPencil } from "react-icons/bi"
import { useSelector, useDispatch } from "react-redux"
import { AnyAction } from "redux"
import { logoutUserThunk } from "@/redux"
import { useForm } from "react-hook-form";
import useFilePreview from "@/hooks/useimage";
import ImageUploader from "@/components/image-uplaoder";

export function ProfileComponent({showModal ,setshowModal}) {

    const {user, accessToken, refreshToken} = useSelector((state:any) => state.auth)
    const dispatch = useDispatch()

    return (
      <div className="w-full ">
        <div className="flex  flex-row justify-between items-center  p-3 "> 
          <p className="font-bold text-primary">Profile</p>
          <button onClick={() => dispatch(logoutUserThunk({accessToken, refreshToken}) as unknown as AnyAction)}
           className="bg-primary text-white text-[12px] py-2 px-3 rounded-md">sign out</button>
        </div>
        <div className="flex flex-col justify-center w-full items-center bg-white border border-gray-100 rounded-md py-5">
            <div className="relative ">
                <img src={`http://localhost:1330/uploads/users/${user.profile_image}`} className="w-28 h-28 rounded-full border-primary border" alt="" />
                  <BiPencil onClick={() => setshowModal()} className="  bg-primary absolute  top-0 right-0 text-white p-1 rounded-full cursor-pointer" size={28} />
                
                
            </div>
          <p className="text-primary font-bold text-xl">{user.name}</p>
        <div className="text-gray-400 text-sm my-1 text-center">
          <p >@{user.name}</p>
          <p >{user.email}</p>
        </div>
        </div>
      </div>
    )
  }
  
  export function UpdateProfileImage({dialogCloser}: {dialogCloser: Function}) {
    const {
      watch,
      register
    } = useForm();
    const File = watch(["image"]);
    const image =  File[0];
   const [filePreview] = useFilePreview(image);
  
      function changePictureHandler() {}
    return (
      <div className="h-[300px]  flex flex-row items-center justify-center">
         <form    className="" action="">
                
                  <ImageUploader style="w-full h-24" children={<input id="dropzone-file" type="file"  {...register("image")} className="hidden" />} />
                </form>
      </div>
    )
  }