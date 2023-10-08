import {useParams} from "react-router-dom";
import {  Routes, Route} from "react-router-dom";
import Channels from './channels';
import Rooms from './rooms';

export default function MainContent() {
    const params = useParams();

   console.log({
    params
   });
   
    
  return (
    <div>
      <Routes>
        <Route path='/rooms/*' element={ <div style={{width: "90vh"}} ><Rooms /></div> } />
        <Route path='/channels/*' element={ <div style={{width: "90vh"}} ><Channels /></div> } />
      </Routes>
     
    </div>
  )
}
